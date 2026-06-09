import type { OidcProviderRepository } from "../../domain/repositories/OidcProviderRepository";
import type { StorageRepository } from "../../domain/repositories/StorageRepository";
import type { NavigatorPortRepository } from "../../domain/repositories/NavigatorPortRepository";
import { PkceService } from "../../domain/services/PkceService";

export class LoginUseCase {
    private readonly provider:   OidcProviderRepository;
    private readonly storage:    StorageRepository;
    private readonly navigator:  NavigatorPortRepository;
    private readonly pkce = new PkceService()

    constructor(
        provider:   OidcProviderRepository,
        storage:    StorageRepository,
        navigator:  NavigatorPortRepository,
    ) {
        this.provider = provider,
        this.storage = storage,
        this.navigator = navigator

    }

    async execute(): Promise<void> {
        const state         = this.pkce.generateState();
        const nonce         = this.pkce.generateVerifier();
        const codeVerifier  = this.pkce.generateVerifier();
        const codeChallenge = await this.pkce.generateChallenge(codeVerifier);

        this.storage.setItem("oidc_state",         state);
        this.storage.setItem("oidc_nonce",         nonce);
        this.storage.setItem("oidc_code_verifier", codeVerifier);

        const params = this.buildAuthEndpointParams(state,nonce,codeChallenge)

        this.navigator.redirectTo(
            `${this.provider.getAuthorizationEndpoint()}?${params}`
        );
    }

    private buildAuthEndpointParams( state:string, nonce:string,codeChallenge:string): URLSearchParams {
        return new URLSearchParams({
            scope:                 this.provider.getScopes().join(" "),
            response_type:         "code",
            client_id:             this.provider.getClientId(),
            redirect_uri:          this.provider.getRedirectUri(),
            state,
            nonce,
            code_challenge:        codeChallenge,
            code_challenge_method: "S256",
        });
    }

}
