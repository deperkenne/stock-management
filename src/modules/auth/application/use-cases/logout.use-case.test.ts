import { LogoutUseCase } from "./LogoutUseCase";
import { TOKEN_STORAGE_KEY } from "../../domain/entities/Token";
import type { StorageRepository } from "../../domain/repositories/StorageRepository";

function makeMockStorage(): jest.Mocked<StorageRepository> {
    return {
        getItem:    jest.fn(),
        setItem:    jest.fn(),
        removeItem: jest.fn(),
        clear:      jest.fn(),
    };
}

describe("LogoutUseCase", () => {
    let storage:  jest.Mocked<StorageRepository>;
    let useCase:  LogoutUseCase;

    beforeEach(() => {
        storage = makeMockStorage();
        useCase = new LogoutUseCase(storage);
    });

    it("removes the token storage key", () => {
        useCase.execute();
        expect(storage.removeItem).toHaveBeenCalledWith(TOKEN_STORAGE_KEY);
    });

    it("removes oidc_state", () => {
        useCase.execute();
        expect(storage.removeItem).toHaveBeenCalledWith("oidc_state");
    });

    it("removes oidc_nonce", () => {
        useCase.execute();
        expect(storage.removeItem).toHaveBeenCalledWith("oidc_nonce");
    });

    it("removes oidc_code_verifier", () => {
        useCase.execute();
        expect(storage.removeItem).toHaveBeenCalledWith("oidc_code_verifier");
    });

    it("calls removeItem exactly 4 times", () => {
        useCase.execute();
        expect(storage.removeItem).toHaveBeenCalledTimes(4);
    });
});
