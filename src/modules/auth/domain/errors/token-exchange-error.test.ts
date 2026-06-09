import { TokenExchangeError } from "./TokenExchangeError";

describe("TokenExchangeError", () => {
    it("uses the default message when none is provided", () => {
        const err = new TokenExchangeError();
        expect(err.message).toBe("Error during token exchange.");
    });

    it("uses a custom message when provided", () => {
        const err = new TokenExchangeError("ID Token missing in response.");
        expect(err.message).toBe("ID Token missing in response.");
    });

    it("has name === 'TokenExchangeError'", () => {
        const err = new TokenExchangeError();
        expect(err.name).toBe("TokenExchangeError");
    });

    it("is an instance of Error", () => {
        expect(new TokenExchangeError()).toBeInstanceOf(Error);
    });

    it("is an instance of TokenExchangeError", () => {
        expect(new TokenExchangeError()).toBeInstanceOf(TokenExchangeError);
    });
});
