import { Token, TOKEN_STORAGE_KEY } from "./Token";
import type { ITokenResponse } from "./Token";

function makeJwt(payload: Record<string, unknown>): string {
    const encode = (data: object) =>
        Buffer.from(JSON.stringify(data))
            .toString("base64")
            .replace(/\+/g, "-")
            .replace(/\//g, "_")
            .replace(/=/g, "");
    return `${encode({ alg: "RS256" })}.${encode(payload)}.fakesig`;
}

function futureExp(offsetSeconds = 3600): number {
    return Math.floor(Date.now() / 1000) + offsetSeconds;
}

function pastExp(offsetSeconds = 3600): number {
    return Math.floor(Date.now() / 1000) - offsetSeconds;
}

const BASE_RESPONSE: ITokenResponse = {
    id_token:     makeJwt({ sub: "user1" }),
    access_token: makeJwt({ sub: "user1", exp: futureExp() }),
    token_type:   "Bearer",
    expires_in:   3600,
    scope:        "openid profile",
};

describe("Token.decode()", () => {
    it("décodes a valid JWT payload", () => {
        const payload = { sub: "abc", email: "a@b.com", exp: 9999 };
        const result  = Token.decode(makeJwt(payload));
        expect(result.sub).toBe("abc");
        expect(result.email).toBe("a@b.com");
        expect(result.exp).toBe(9999);
    });



    it("handles base64url characters (- and _)", () => {
        const payload = { sub: "x".repeat(64) };
        const jwt     = makeJwt(payload);
        expect(() => Token.decode(jwt)).not.toThrow();
        expect(Token.decode(jwt).sub).toBe("x".repeat(64));
    });

    it("accepts a 2-part JWT (no signature)", () => {
        const encode = (data: object) =>
            Buffer.from(JSON.stringify(data)).toString("base64url");
        const jwt = `${encode({ alg: "RS256" })}.${encode({ sub: "u" })}`;
        expect(() => Token.decode(jwt)).not.toThrow();
        expect(Token.decode(jwt).sub).toBe("u");
    });

    it("throws for a 1-part token (no dot)", () => {
        expect(() => Token.decode("notajwt")).toThrow("Invalid JWT format");
    });

    it("throws for invalid base64", () => {
        expect(() => Token.decode("notajwt")).toThrow("Invalid JWT base64 encoding");
    });



    it("decodes unicode characters in payload", () => {
        const payload = { name: "André Müller" };
        const result  = Token.decode(makeJwt(payload));
        expect((result as Record<string, unknown>).name).toBe("André Müller");
    });
});

describe("Token getters", () => {
    it("returns the id_token", () => {
        const token = new Token(BASE_RESPONSE);
        expect(token.idToken).toBe(BASE_RESPONSE.id_token);
    });

    it("returns the access_token when present", () => {
        const token = new Token(BASE_RESPONSE);
        expect(token.accessToken).toBe(BASE_RESPONSE.access_token);
    });

    it("returns undefined for accessToken when absent", () => {
        const token = new Token({ id_token: BASE_RESPONSE.id_token });
        expect(token.accessToken).toBeUndefined();
    });
});

describe("Token.isExpired()", () => {
    it("returns true when there is no access_token", () => {
        const token = new Token({ id_token: "id.t.ok" });
        expect(token.isExpired()).toBe(true);
    });

    it("returns true when exp is in the past", () => {
        const token = new Token({
            ...BASE_RESPONSE,
            access_token: makeJwt({ sub: "u", exp: pastExp() }),
        });
        expect(token.isExpired()).toBe(true);
    });

    it("returns true when exp is within the 30-second buffer", () => {
        const token = new Token({
            ...BASE_RESPONSE,
            access_token: makeJwt({ sub: "u", exp: futureExp(15) }),
        });
        expect(token.isExpired()).toBe(true);
    });

    it("returns false when exp is far in the future", () => {
        const token = new Token({
            ...BASE_RESPONSE,
            access_token: makeJwt({ sub: "u", exp: futureExp(3600) }),
        });
        expect(token.isExpired()).toBe(false);
    });

    it("returns true when payload has no exp field", () => {
        const token = new Token({
            ...BASE_RESPONSE,
            access_token: makeJwt({ sub: "u" }),
        });
        expect(token.isExpired()).toBe(true);
    });
});

describe("Token.fromStorage()", () => {
    it("creates a Token from a valid JSON string", () => {
        const json  = JSON.stringify(BASE_RESPONSE);
        const token = Token.fromStorage(json);
        expect(token).toBeInstanceOf(Token);
        expect(token.idToken).toBe(BASE_RESPONSE.id_token);
    });

    it("throws SyntaxError for invalid JSON", () => {
        expect(() => Token.fromStorage("not-json")).toThrow(SyntaxError);
    });
});

describe("Token.toJSON()", () => {
    it("serializes back to the original response JSON", () => {
        const token  = new Token(BASE_RESPONSE);
        const parsed = JSON.parse(token.toJSON()) as ITokenResponse;
        expect(parsed.id_token).toBe(BASE_RESPONSE.id_token);
        expect(parsed.access_token).toBe(BASE_RESPONSE.access_token);
    });
});

describe("TOKEN_STORAGE_KEY", () => {
    it("is a non-empty string constant", () => {
        expect(typeof TOKEN_STORAGE_KEY).toBe("string");
        expect(TOKEN_STORAGE_KEY.length).toBeGreaterThan(0);
    });
});
