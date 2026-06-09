import type { StorageRepository } from "../../domain/repositories/StorageRepository";
import { TOKEN_STORAGE_KEY } from "../../domain/entities/Token";

export class LogoutUseCase {
    private readonly storage: StorageRepository
    constructor(storage: StorageRepository) {
        this.storage = storage
    }

    execute(): void {
        this.storage.removeItem(TOKEN_STORAGE_KEY);
        this.storage.removeItem("oidc_state");
        this.storage.removeItem("oidc_nonce");
        this.storage.removeItem("oidc_code_verifier");
    }
}
