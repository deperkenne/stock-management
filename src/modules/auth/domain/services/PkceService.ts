export class PkceService {

    generateVerifier(): string {
        const array = new Uint8Array(32);
        crypto.getRandomValues(array);
        return this.base64UrlEncode(array);
    }

    generateState(): string {
        const array = new Uint8Array(16);
        crypto.getRandomValues(array);
        return this.base64UrlEncode(array);
    }

    async generateChallenge(verifier: string): Promise<string> {
        const data   = new TextEncoder().encode(verifier);
        const digest = await crypto.subtle.digest("SHA-256", data);
        return this.base64UrlEncode(new Uint8Array(digest));
    }

    private base64UrlEncode(bytes: Uint8Array): string {
        return btoa(String.fromCharCode(...bytes))
            .replace(/\+/g, "-")
            .replace(/\//g, "_")
            .replace(/=/g,  "");
    }
}
