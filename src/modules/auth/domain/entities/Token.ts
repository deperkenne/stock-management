export interface ITokenPayload {
    sub?:   string;
    exp?:   number;
    iat?:   number;
    email?: string;
    role?:  string;
    nonce?: string;
}

export interface ITokenResponse {
    id_token:      string;
    access_token?: string;
    token_type?:   string;
    expires_in?:   number;
    scope?:        string;
}

export const TOKEN_STORAGE_KEY = "oidc_tokens";

export class Token {
    private readonly raw: ITokenResponse
    constructor( raw: ITokenResponse) {
        this.raw = raw
    }

    get accessToken(): string | undefined { return this.raw.access_token; }
    get idToken():     string             { return this.raw.id_token;     }

    isExpired(): boolean {
        if (!this.raw.access_token) return true;
        const payload = Token.decode(this.raw.access_token);//mock
        if (!payload?.exp) return true;
        return Date.now() / 1000 > payload.exp - 30;
    }

    static decode(token: string): ITokenPayload {
        const parts = token.split(".");
        
        if (parts.length < 2) {
            throw new Error("Invalid JWT format (expected x.y.z).");
        }

        if (!this.isBase64Url(parts[0]) || !this.isBase64Url(parts[1])) {
            throw new Error("Invalid JWT encoding.");
        }

        const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
        const json   = decodeURIComponent(
            atob(base64)
                .split("")
                .map(c => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
                .join("")
        );
        return JSON.parse(json) as ITokenPayload;
    }

    static fromStorage(json: string): Token {
        return new Token(JSON.parse(json) as ITokenResponse);
    }

    toJSON(): string {
        return JSON.stringify(this.raw);
    }
 
    static  isBase64Url(str: string): boolean {
       return /^[A-Za-z0-9_-]+$/.test(str);
    }

    
}
