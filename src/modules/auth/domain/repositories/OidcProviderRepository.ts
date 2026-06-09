export interface OidcProviderRepository {

    getAuthorizationEndpoint(): string;

    getTokenEndpoint(): string;

    getUserInfoEndpoint(): string;

    getClientId(): string;

    getRedirectUri(): string;

    getScopes(): string[];
}