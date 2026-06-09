import { LoginUseCase } from "./LoginUseCase";
import { PkceService } from "../../domain/services/PkceService";
import type { OidcProviderRepository }   from "../../domain/repositories/OidcProviderRepository";
import type { StorageRepository }        from "../../domain/repositories/StorageRepository";
import type { NavigatorPortRepository }  from "../../domain/repositories/NavigatorPortRepository";

function makeMockProvider(): jest.Mocked<OidcProviderRepository> {
    return {
        getAuthorizationEndpoint: jest.fn().mockReturnValue("http://kc/auth"),
        getTokenEndpoint:         jest.fn().mockReturnValue("http://kc/token"),
        getUserInfoEndpoint:      jest.fn().mockReturnValue("http://kc/userinfo"),
        getClientId:              jest.fn().mockReturnValue("my-client"),
        getRedirectUri:           jest.fn().mockReturnValue("http://localhost:5173/callback"),
        getScopes:                jest.fn().mockReturnValue(["openid", "profile", "email"]),
    };
}

function makeMockStorage(): jest.Mocked<StorageRepository> {
    return { getItem: jest.fn(), setItem: jest.fn(), removeItem: jest.fn(), clear: jest.fn() };
}

function makeMockNavigator(): jest.Mocked<NavigatorPortRepository> {
    return {
        redirectTo:        jest.fn(),
        getSearchParams:   jest.fn().mockReturnValue(new URLSearchParams()),
        clearSearchParams: jest.fn(),
        getPathname:       jest.fn().mockReturnValue("/"),
    };
}

describe("LoginUseCase", () => {
    let provider:  jest.Mocked<OidcProviderRepository>;
    let storage:   jest.Mocked<StorageRepository>;
    let navigator: jest.Mocked<NavigatorPortRepository>;
    let useCase:   LoginUseCase;

    beforeEach(() => {
        jest.spyOn(PkceService.prototype, "generateState").mockReturnValue("fixed-state");
        jest.spyOn(PkceService.prototype, "generateVerifier").mockReturnValue("fixed-verifier");
        jest.spyOn(PkceService.prototype, "generateChallenge").mockResolvedValue("fixed-challenge");

        provider  = makeMockProvider();
        storage   = makeMockStorage();
        navigator = makeMockNavigator();
        useCase   = new LoginUseCase(provider, storage, navigator);
    });

    afterEach(() => jest.restoreAllMocks());

    it("saves the state to storage", async () => {
        await useCase.execute();
        expect(storage.setItem).toHaveBeenCalledWith("oidc_state", "fixed-state");
    });

    it("saves the nonce to storage", async () => {
        await useCase.execute();
        expect(storage.setItem).toHaveBeenCalledWith("oidc_nonce", "fixed-verifier");
    });

    it("saves the code_verifier to storage", async () => {
        await useCase.execute();
        expect(storage.setItem).toHaveBeenCalledWith("oidc_code_verifier", "fixed-verifier");
    });

    it("calls redirectTo with the authorization endpoint as base", async () => {
        await useCase.execute();
        const [url] = (navigator.redirectTo as jest.Mock).mock.calls[0] as [string];
        expect(url.startsWith("http://kc/auth?")).toBe(true);
    });

    it("includes response_type=code", async () => {
        await useCase.execute();
        const [url] = (navigator.redirectTo as jest.Mock).mock.calls[0] as [string];
        expect(new URL(url).searchParams.get("response_type")).toBe("code");
    });

    it("includes client_id", async () => {
        await useCase.execute();
        const [url] = (navigator.redirectTo as jest.Mock).mock.calls[0] as [string];
        expect(new URL(url).searchParams.get("client_id")).toBe("my-client");
    });

    it("includes redirect_uri", async () => {
        await useCase.execute();
        const [url] = (navigator.redirectTo as jest.Mock).mock.calls[0] as [string];
        expect(new URL(url).searchParams.get("redirect_uri")).toBe("http://localhost:5173/callback");
    });

    it("includes code_challenge_method=S256", async () => {
        await useCase.execute();
        const [url] = (navigator.redirectTo as jest.Mock).mock.calls[0] as [string];
        expect(new URL(url).searchParams.get("code_challenge_method")).toBe("S256");
    });

    it("includes the code_challenge", async () => {
        await useCase.execute();
        const [url] = (navigator.redirectTo as jest.Mock).mock.calls[0] as [string];
        expect(new URL(url).searchParams.get("code_challenge")).toBe("fixed-challenge");
    });

    it("includes the state", async () => {
        await useCase.execute();
        const [url] = (navigator.redirectTo as jest.Mock).mock.calls[0] as [string];
        expect(new URL(url).searchParams.get("state")).toBe("fixed-state");
    });

    it("includes the scope", async () => {
        await useCase.execute();
        const [url] = (navigator.redirectTo as jest.Mock).mock.calls[0] as [string];
        const scope = new URL(url).searchParams.get("scope") ?? "";
        expect(scope).toContain("openid");
        expect(scope).toContain("profile");
    });
});
