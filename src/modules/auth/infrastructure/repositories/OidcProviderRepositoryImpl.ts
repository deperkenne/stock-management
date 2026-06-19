import type { OidcProviderRepository } from "../../domain/repositories/OidcProviderRepository";

const BASE_URL = import.meta.env.VITE_KEYCLOAK_URL  as string;
const REALM    = import.meta.env.VITE_KEYCLOAK_REALM as string;
const CLIENT   = import.meta.env.VITE_KEYCLOAK_CLIENT_ID as string;
const BASE       = `${BASE_URL}/realms/${REALM}/protocol/openid-connect`;
const PROXY_BASE = `/keycloak/realms/${REALM}/protocol/openid-connect`;

export class OidcProviderRepositoryImpl implements OidcProviderRepository {
    getAuthorizationEndpoint(): string { return `${BASE}/auth`;         }
    getTokenEndpoint():         string { return `${PROXY_BASE}/token`;  }
    getUserInfoEndpoint():      string { return `${BASE}/userinfo`;     }
    getClientId():              string { return CLIENT;              }
    getRedirectUri():           string { return `${window.location.origin}/callback`; }
    getScopes():               string[] { return ["openid", "profile", "email"];       }
}
