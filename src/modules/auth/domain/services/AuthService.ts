// AuthService has been replaced by the use-case architecture.
//
// Orchestration logic  → src/auth/application/use-cases/
//   LoginUseCase.ts        — builds the OIDC authorization request and redirects
//   HandleCallbackUseCase.ts — validates callback, exchanges code, stores tokens
//   LogoutUseCase.ts        — clears all session data
//
// Domain types         → src/auth/domain/entities/Token.ts  (ITokenResponse, ITokenPayload, Token)
// PKCE crypto          → src/auth/domain/services/PkceService.ts
// Browser abstraction  → src/auth/domain/ports/NavigatorPort.ts
// Composition root     → src/auth/di/authContainer.ts

export type { ITokenResponse, ITokenPayload } from "../entities/Token";
