import { HandleCallbackUseCase } from "./HandleCallbackUseCase";
import { TokenExchangeError }    from "../../domain/errors/TokenExchangeError";
import { TOKEN_STORAGE_KEY }     from "../../domain/entities/Token";
import type { ITokenResponse }         from "../../domain/entities/Token";
import type { OidcProviderRepository } from "../../domain/repositories/OidcProviderRepository";
import type { StorageRepository }      from "../../domain/repositories/StorageRepository";
import type { NavigatorPortRepository } from "../../domain/repositories/NavigatorPortRepository";
import type { HttpClientRepository }   from "../../domain/repositories/HttpClientRepository";

// ── JWT helper ────────────────────────────────────────────────────────────────

function makeJwt(payload: Record<string, unknown> = { sub: "u1" }): string {
    const encode = (data: object) =>
        Buffer.from(JSON.stringify(data))
            .toString("base64")
            .replace(/\+/g, "-")
            .replace(/\//g, "_")
            .replace(/=/g, "");
    return `${encode({ alg: "RS256" })}.${encode(payload)}.sig`;
}

// ── Response helpers ──────────────────────────────────────────────────────────

function makeOkResponse(body: object): Response {
    return { ok: true,  json: jest.fn().mockResolvedValue(body) } as unknown as Response;
}

function makeErrResponse(body: object): Response {
    return { ok: false, json: jest.fn().mockResolvedValue(body) } as unknown as Response;
}

// ── Mock factories ────────────────────────────────────────────────────────────

function makeMockProvider(): jest.Mocked<OidcProviderRepository> {
    return {
        getAuthorizationEndpoint: jest.fn().mockReturnValue("http://kc/auth"),
        getTokenEndpoint:         jest.fn().mockReturnValue("http://kc/token"),
        getUserInfoEndpoint:      jest.fn().mockReturnValue("http://kc/userinfo"),
        getClientId:              jest.fn().mockReturnValue("my-client"),
        getRedirectUri:           jest.fn().mockReturnValue("http://localhost:5173/callback"),
        getScopes:                jest.fn().mockReturnValue(["openid"]),
    };
}

function makeMockStorage(): jest.Mocked<StorageRepository> {
    return { getItem: jest.fn(), setItem: jest.fn(), removeItem: jest.fn(), clear: jest.fn() };
}

function makeMockNavigator(params = ""): jest.Mocked<NavigatorPortRepository> {
    return {
        redirectTo:        jest.fn(),
        getSearchParams:   jest.fn().mockReturnValue(new URLSearchParams(params)),
        clearSearchParams: jest.fn(),
        getPathname:       jest.fn().mockReturnValue("/callback"),
    };
}

function makeMockHttp(): jest.Mocked<HttpClientRepository> {
    return { post: jest.fn() };
}

// ── Shared token fixtures ─────────────────────────────────────────────────────

const validIdToken      = makeJwt({ sub: "user1" });
const futureAccessToken = makeJwt({ sub: "user1", exp: Math.floor(Date.now() / 1000) + 3600 });
const expiredAccessToken = makeJwt({ sub: "user1", exp: Math.floor(Date.now() / 1000) - 3600 });

const VALID_TOKEN_RESPONSE: ITokenResponse = {
    id_token:     validIdToken,
    access_token: futureAccessToken,
    token_type:   "Bearer",
    expires_in:   3600,
    scope:        "openid profile",
};

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("HandleCallbackUseCase", () => {

    afterEach(() => jest.restoreAllMocks());

    // ── URL error parameter ───────────────────────────────────────────────────

    describe("when an error parameter is present in the URL", () => {
        it("throws an error containing the error code", async () => {
            const navigator = makeMockNavigator("error=access_denied&error_description=User+cancelled");
            const useCase = new HandleCallbackUseCase(
                makeMockProvider(), makeMockStorage(), navigator, makeMockHttp()
            );
            await expect(useCase.execute()).rejects.toThrow("access_denied");
        });

        it("includes the error description in the error message", async () => {
            const navigator = makeMockNavigator("error=access_denied&error_description=User+cancelled");
            const useCase = new HandleCallbackUseCase(
                makeMockProvider(), makeMockStorage(), navigator, makeMockHttp()
            );
            await expect(useCase.execute()).rejects.toThrow("User cancelled");
        });
    });

    // ── PKCE / state validation ───────────────────────────────────────────────

    describe("when the state does not match the saved state", () => {
        it("throws a state mismatch error", async () => {
            const navigator = makeMockNavigator("code=abc&state=wrong-state");
            const storage   = makeMockStorage();
            storage.getItem.mockImplementation((k) => k === "oidc_state" ? "expected-state" : null);

            const useCase = new HandleCallbackUseCase(
                makeMockProvider(), storage, navigator, makeMockHttp()
            );
            await expect(useCase.execute()).rejects.toThrow("State mismatch");
        });
    });

    describe("when the code_verifier is missing from storage", () => {
        it("throws an explicit error", async () => {
            const navigator = makeMockNavigator("code=abc&state=s1");
            const storage   = makeMockStorage();
            storage.getItem.mockImplementation((k) => k === "oidc_state" ? "s1" : null);

            const useCase = new HandleCallbackUseCase(
                makeMockProvider(), storage, navigator, makeMockHttp()
            );
            await expect(useCase.execute()).rejects.toThrow("Missing PKCE code verifier");
        });
    });

    // ── exchangeCode — successful exchange ────────────────────────────────────

    describe("exchangeCode — successful code exchange", () => {
        let provider:  jest.Mocked<OidcProviderRepository>;
        let storage:   jest.Mocked<StorageRepository>;
        let navigator: jest.Mocked<NavigatorPortRepository>;
        let http:      jest.Mocked<HttpClientRepository>;

        beforeEach(() => {
            provider  = makeMockProvider();
            storage   = makeMockStorage();
            navigator = makeMockNavigator("code=auth-code&state=s1");
            http      = makeMockHttp();

            storage.getItem.mockImplementation((k) => {
                if (k === "oidc_state")         return "s1";
                if (k === "oidc_code_verifier") return "verifier123";
                return null;
            });

            http.post.mockResolvedValue(makeOkResponse(VALID_TOKEN_RESPONSE));
        });

        it("calls http_client.post on the token endpoint", async () => {
            await new HandleCallbackUseCase(provider, storage, navigator, http).execute();

            expect(http.post).toHaveBeenCalledWith(
                "http://kc/token",
                expect.any(URLSearchParams),
            );
        });

        it("sends grant_type=authorization_code in the request body", async () => {
            await new HandleCallbackUseCase(provider, storage, navigator, http).execute();

            const body = http.post.mock.calls[0][1] as URLSearchParams;
            expect(body.get("grant_type")).toBe("authorization_code");
        });

        it("sends the received code in the request body", async () => {
            await new HandleCallbackUseCase(provider, storage, navigator, http).execute();

            const body = http.post.mock.calls[0][1] as URLSearchParams;
            expect(body.get("code")).toBe("auth-code");
        });

        it("sends the code_verifier from storage in the request body", async () => {
            await new HandleCallbackUseCase(provider, storage, navigator, http).execute();

            const body = http.post.mock.calls[0][1] as URLSearchParams;
            expect(body.get("code_verifier")).toBe("verifier123");
        });

        it("sends redirect_uri and client_id from the provider in the request body", async () => {
            await new HandleCallbackUseCase(provider, storage, navigator, http).execute();

            const body = http.post.mock.calls[0][1] as URLSearchParams;
            expect(body.get("redirect_uri")).toBe("http://localhost:5173/callback");
            expect(body.get("client_id")).toBe("my-client");
        });

        it("stores the token under TOKEN_STORAGE_KEY", async () => {
            await new HandleCallbackUseCase(provider, storage, navigator, http).execute();

            expect(storage.setItem).toHaveBeenCalledWith(
                TOKEN_STORAGE_KEY,
                JSON.stringify(VALID_TOKEN_RESPONSE),
            );
        });

        it("removes oidc_state from storage", async () => {
            await new HandleCallbackUseCase(provider, storage, navigator, http).execute();
            expect(storage.removeItem).toHaveBeenCalledWith("oidc_state");
        });

        it("removes oidc_nonce from storage", async () => {
            await new HandleCallbackUseCase(provider, storage, navigator, http).execute();
            expect(storage.removeItem).toHaveBeenCalledWith("oidc_nonce");
        });

        it("removes oidc_code_verifier from storage", async () => {
            await new HandleCallbackUseCase(provider, storage, navigator, http).execute();
            expect(storage.removeItem).toHaveBeenCalledWith("oidc_code_verifier");
        });

        it("calls clearSearchParams after a successful exchange", async () => {
            await new HandleCallbackUseCase(provider, storage, navigator, http).execute();
            expect(navigator.clearSearchParams).toHaveBeenCalledTimes(1);
        });

        it("returns true", async () => {
            await expect(
                new HandleCallbackUseCase(provider, storage, navigator, http).execute()
            ).resolves.toBe(true);
        });
    });

    // ── exchangeCode — non-ok HTTP response ───────────────────────────────────

    describe("exchangeCode — when the server returns a non-ok response", () => {
        function buildErrSut(errorBody: object) {
            const navigator = makeMockNavigator("code=abc&state=s1");
            const storage   = makeMockStorage();
            storage.getItem.mockImplementation((k) => {
                if (k === "oidc_state")         return "s1";
                if (k === "oidc_code_verifier") return "v";
                return null;
            });
            const http = makeMockHttp();
            http.post.mockResolvedValue(makeErrResponse(errorBody));
            return new HandleCallbackUseCase(makeMockProvider(), storage, navigator, http);
        }

        it("throws an error containing the server error code", async () => {
            const useCase = buildErrSut({ error: "invalid_client", error_description: "Bad credentials" });
            await expect(useCase.execute()).rejects.toThrow("invalid_client");
        });

        it("includes the error description in the error message", async () => {
            const useCase = buildErrSut({ error: "invalid_client", error_description: "Bad credentials" });
            await expect(useCase.execute()).rejects.toThrow("Bad credentials");
        });

        it("still throws when error_description is absent", async () => {
            const useCase = buildErrSut({ error: "unauthorized_client" });
            await expect(useCase.execute()).rejects.toThrow("unauthorized_client");
        });

        it("does not store any token", async () => {
            const storage   = makeMockStorage();
            const navigator = makeMockNavigator("code=abc&state=s1");
            storage.getItem.mockImplementation((k) => k === "oidc_state" ? "s1" : k === "oidc_code_verifier" ? "v" : null);
            const http = makeMockHttp();
            http.post.mockResolvedValue(makeErrResponse({ error: "invalid_grant" }));

            const useCase = new HandleCallbackUseCase(makeMockProvider(), storage, navigator, http);
            await expect(useCase.execute()).rejects.toThrow();

            expect(storage.setItem).not.toHaveBeenCalled();
        });

        it("does not remove PKCE artifacts", async () => {
            const storage   = makeMockStorage();
            const navigator = makeMockNavigator("code=abc&state=s1");
            storage.getItem.mockImplementation((k) => k === "oidc_state" ? "s1" : k === "oidc_code_verifier" ? "v" : null);
            const http = makeMockHttp();
            http.post.mockResolvedValue(makeErrResponse({ error: "invalid_grant" }));

            const useCase = new HandleCallbackUseCase(makeMockProvider(), storage, navigator, http);
            await expect(useCase.execute()).rejects.toThrow();

            expect(storage.removeItem).not.toHaveBeenCalled();
        });
    });

    // ── exchangeCode — missing id_token ───────────────────────────────────────

    describe("exchangeCode — when id_token is missing from the response", () => {
        function buildNoIdTokenSut(body: object) {
            const navigator = makeMockNavigator("code=abc&state=s1");
            const storage   = makeMockStorage();
            storage.getItem.mockImplementation((k) => {
                if (k === "oidc_state")         return "s1";
                if (k === "oidc_code_verifier") return "v";
                return null;
            });
            const http = makeMockHttp();
            http.post.mockResolvedValue(makeOkResponse(body));
            return new HandleCallbackUseCase(makeMockProvider(), storage, navigator, http);
        }

        it("throws a TokenExchangeError", async () => {
            const useCase = buildNoIdTokenSut({ access_token: futureAccessToken });
            await expect(useCase.execute()).rejects.toBeInstanceOf(TokenExchangeError);
        });

        it("the error message states that the ID Token is missing", async () => {
            const useCase = buildNoIdTokenSut({ access_token: futureAccessToken });
            await expect(useCase.execute()).rejects.toThrow("ID Token missing in response.");
        });

        it("does not store any token", async () => {
            const storage   = makeMockStorage();
            const navigator = makeMockNavigator("code=abc&state=s1");
            storage.getItem.mockImplementation((k) => k === "oidc_state" ? "s1" : k === "oidc_code_verifier" ? "v" : null);
            const http = makeMockHttp();
            http.post.mockResolvedValue(makeOkResponse({ access_token: futureAccessToken }));

            const useCase = new HandleCallbackUseCase(makeMockProvider(), storage, navigator, http);
            await expect(useCase.execute()).rejects.toThrow();

            expect(storage.setItem).not.toHaveBeenCalled();
        });
    });

    // ── Session restoration (no code in URL) ──────────────────────────────────

    describe("session restoration (no code in the URL)", () => {
        it("returns true when the stored session is not expired", async () => {
            const navigator = makeMockNavigator("");
            const storage   = makeMockStorage();
            storage.getItem.mockImplementation((k) =>
                k === TOKEN_STORAGE_KEY
                    ? JSON.stringify({ id_token: validIdToken, access_token: futureAccessToken })
                    : null
            );
            const useCase = new HandleCallbackUseCase(
                makeMockProvider(), storage, navigator, makeMockHttp()
            );
            await expect(useCase.execute()).resolves.toBe(true);
        });

        it("returns false when the stored session is expired", async () => {
            const navigator = makeMockNavigator("");
            const storage   = makeMockStorage();
            storage.getItem.mockImplementation((k) =>
                k === TOKEN_STORAGE_KEY
                    ? JSON.stringify({ id_token: validIdToken, access_token: expiredAccessToken })
                    : null
            );
            const useCase = new HandleCallbackUseCase(
                makeMockProvider(), storage, navigator, makeMockHttp()
            );
            await expect(useCase.execute()).resolves.toBe(false);
        });

        it("returns false when neither a token nor a code is present", async () => {
            const navigator = makeMockNavigator("");
            const storage   = makeMockStorage();
            storage.getItem.mockReturnValue(null);
            const useCase = new HandleCallbackUseCase(
                makeMockProvider(), storage, navigator, makeMockHttp()
            );
            await expect(useCase.execute()).resolves.toBe(false);
        });
    });
});
