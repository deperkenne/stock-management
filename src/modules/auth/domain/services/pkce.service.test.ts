import { createHash } from "crypto";
import { PkceService } from "./PkceService";

const BASE64URL_RE = /^[A-Za-z0-9\-_]+$/;

describe("PkceService", () => {
    let pkce: PkceService;

    beforeEach(() => {
        pkce = new PkceService();
    });

    describe("generateVerifier()", () => {
        it("returns a non-empty string", () => {
            expect(typeof pkce.generateVerifier()).toBe("string");
            expect(pkce.generateVerifier().length).toBeGreaterThan(0);
        });

        it("only contains URL-safe base64 characters", () => {
            expect(pkce.generateVerifier()).toMatch(BASE64URL_RE);
        });

        it("encodes 32 random bytes (length >= 43 chars)", () => {
            expect(pkce.generateVerifier().length).toBeGreaterThanOrEqual(43);
        });

        it("returns a different value on each call", () => {
            expect(pkce.generateVerifier()).not.toBe(pkce.generateVerifier());
        });
    });

    describe("generateState()", () => {
        it("returns a non-empty string", () => {
            expect(typeof pkce.generateState()).toBe("string");
            expect(pkce.generateState().length).toBeGreaterThan(0);
        });

        it("only contains URL-safe base64 characters", () => {
            expect(pkce.generateState()).toMatch(BASE64URL_RE);
        });

        it("returns a different value on each call", () => {
            expect(pkce.generateState()).not.toBe(pkce.generateState());
        });
    });

    describe("generateChallenge(verifier)", () => {
        it("returns a non-empty string", async () => {
            const challenge = await pkce.generateChallenge("test-verifier");
            expect(typeof challenge).toBe("string");
            expect(challenge.length).toBeGreaterThan(0);
        });

        it("only contains URL-safe base64 characters", async () => {
            const challenge = await pkce.generateChallenge("test-verifier");
            expect(challenge).toMatch(BASE64URL_RE);
        });

        it("is deterministic for the same verifier", async () => {
            const a = await pkce.generateChallenge("same-input");
            const b = await pkce.generateChallenge("same-input");
            expect(a).toBe(b);
        });

        it("produces different output for different verifiers", async () => {
            const a = await pkce.generateChallenge("verifier-A");
            const b = await pkce.generateChallenge("verifier-B");
            expect(a).not.toBe(b);
        });

        it("matches manual S256 (SHA-256 base64url) computation", async () => {
            const verifier  = "my-test-verifier-string";
            const challenge = await pkce.generateChallenge(verifier);
            const expected  = createHash("sha256")
                .update(verifier, "utf8")
                .digest("base64url");
            expect(challenge).toBe(expected);
        });
    });
});
