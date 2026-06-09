import type { OidcProviderRepository } from "../domain/repositories/OidcProviderRepository";
import { KeycloakAuthRepository } from "../infrastructure/repositories/KeycloakAuthRepository";

type ProviderFactory = () => OidcProviderRepository;

const registry = new Map<string, ProviderFactory>([
    ["keycloak", () => new KeycloakAuthRepository()],
]);

export class OidcProviderFactory {

    static register(type: string, factory: ProviderFactory): void {
        registry.set(type, factory);
    }

    static create(type: string): OidcProviderRepository {
        const factory = registry.get(type);
        if (!factory) throw new Error(`OIDC provider not supported: "${type}"`);
        return factory();
    }
}
