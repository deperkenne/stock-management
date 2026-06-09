import type { OidcProviderRepository } from "../../domain/repositories/OidcProviderRepository";
import type { StorageRepository } from "../../domain/repositories/StorageRepository";
import type { NavigatorPortRepository } from "../../domain/repositories/NavigatorPortRepository";
import type { HttpClientRepository } from "../../domain/repositories/HttpClientRepository";
import { TokenExchangeError } from "../../domain/errors/TokenExchangeError";
import { Token, TOKEN_STORAGE_KEY, type ITokenResponse } from "../../domain/entities/Token";


export class HandleCallbackUseCase {
       private readonly provider:  OidcProviderRepository;
       private readonly storage:   StorageRepository;
       private readonly navigator: NavigatorPortRepository;
       private readonly http_client: HttpClientRepository;

    constructor(
        provider:  OidcProviderRepository,
        storage:   StorageRepository,
        navigator: NavigatorPortRepository,
        http_client: HttpClientRepository
    ) {

        this.provider = provider,
        this.storage  = storage,
        this.navigator = navigator,
        this.http_client = http_client
    }
    

    private getItemFromStorage(key: string): string | null {
        return this.storage.getItem(key);
    }

    
    async execute(): Promise<boolean> {
        const params = this.navigator.getSearchParams(); //mock
        const code   = params.get("code");
        const state  = params.get("state");
        const err    = params.get("error");

        if (err) {
            throw new Error(`${err}: ${params.get("error_description") ?? ""}`);
        }

        if (code && state) {
            const savedState   = this.getItemFromStorage("oidc_state"); //mock
            const codeVerifier = this.getItemFromStorage("oidc_code_verifier");//mock

            if (state !== savedState) {
                throw new Error("State mismatch — possible CSRF attack.");
            }

            if (!codeVerifier) {
                throw new Error("Missing PKCE code verifier.");
            }

            await this.exchangeCode(code, codeVerifier);
            return true;
        }

        // Restore existing session
        const saved = this.storage.getItem(TOKEN_STORAGE_KEY);
        if (saved) {
            const token = Token.fromStorage(saved);
            return !token.isExpired();
        }

        return false;
    }

    private async exchangeCode(code: string, codeVerifier: string): Promise<void> {
        const token_endpoint = this.provider.getTokenEndpoint()

        const body = this.buildTokenRequestBody(code,codeVerifier)

        const response = await this.http_client.post(token_endpoint,body)

        if (!response.ok) {
            const e = await response.json() as { error: string; error_description?: string };
            throw new Error(`${e.error}: ${e.error_description ?? ""}`);
        }

        const tokenResponse = await response.json() as ITokenResponse;
        // business validation muss be in separate class
        if (!tokenResponse.id_token) {
            throw new TokenExchangeError("ID Token missing in response.");
        }

        // Clear PKCE + state artifacts
        this.clearPkceArtifacts()
        // Store tokens under one consistent key, no extra stringify
        this.storage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(tokenResponse));

        this.navigator.clearSearchParams();
    }


    private clearPkceArtifacts(): void {
        this.storage.removeItem("oidc_state");
        this.storage.removeItem("oidc_nonce");
        this.storage.removeItem("oidc_code_verifier");
    }

    private buildTokenRequestBody( code: string, codeVerifier: string): URLSearchParams {
        return new URLSearchParams({
            grant_type:    "authorization_code",
            code,
            redirect_uri:  this.provider.getRedirectUri(),
            client_id:     this.provider.getClientId(),
            code_verifier: codeVerifier,
        });
    }
}
