import type { HttpClientRepository } from "../../domain/repositories/HttpClientRepository";
import { HttpError } from "../../../../shared/errors/HttpError";
import type { StorageRepository } from "../../../auth/domain/repositories/StorageRepository";
import { TOKEN_STORAGE_KEY, Token } from "../../../auth/domain/entities/Token";

export class FetchHttpClientRepository implements HttpClientRepository {

    private storage : StorageRepository

    constructor(storage: StorageRepository){
          this.storage = storage
    }

    async post<TResponse>(url: string, body: unknown): Promise<TResponse> {
        const accessToken = this.resolveAccessToken();

        let response: Response;
        try {
            response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...(accessToken && { "Authorization": `Bearer ${accessToken}` }),
                },
                body: JSON.stringify(body),
            });
        } catch (e) {
            throw new HttpError(0, e instanceof Error ? e.message : "Network error: server unreachable");
        }

        if (!response.ok) {
            throw new HttpError(response.status, response.statusText);
        }

        return response.json() as Promise<TResponse>;
    }


    private resolveAccessToken(): string | undefined {
        const raw = this.storage.getItem(TOKEN_STORAGE_KEY);

        if (!raw) {
            throw new HttpError(401, "No session found. Please sign in.");
        }

        let token: Token;
        try {
            token = Token.fromStorage(raw);
        } catch {
            throw new HttpError(401, "Corrupted session. Please sign in again.");
        }

        let expired: boolean;
        try {
            expired = token.isExpired();
            console.log("expired token",expired)
        } catch {
            throw new HttpError(401, "Invalid token format. Please sign in again.");
        }

        if (expired) {
            throw new HttpError(401, "Session expired. Please sign in again.");
        }

        return token.accessToken;
    }
}