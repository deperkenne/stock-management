import type { StorageRepository } from "../../domain/repositories/StorageRepository";

export class SessionStorageRepository implements StorageRepository{

    getItem(key: string): string | null{
        return sessionStorage.getItem(key)
    }

    setItem(key: string, value: string): void{
        sessionStorage.setItem(key,value)
    }

    removeItem(key: string): void{
        sessionStorage.removeItem(key)
    }

    clear (): void{
        sessionStorage.clear()
    }

}