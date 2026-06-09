export class TokenExchangeError extends Error {
    constructor(message = "Error during token exchange.") {
        super(message);
        this.name = "TokenExchangeError";
    }
}
