import type { StorageRepository } from "../domain/repositories/StorageRepository";
import  { SessionStorageRepository } from "../infrastructure/repositories/SessionStorageRepository";


type StorageFactoryFn = () => StorageRepository;

const registry = new Map<string, StorageFactoryFn>([
    ["session", () => new SessionStorageRepository()],
]);

export class StorageFactory {

    static register(type: string, factory: StorageFactoryFn): void {
        registry.set(type, factory);
    }

    static create(type: string): StorageRepository {
        const factory = registry.get(type);
        if (!factory) throw new Error(`Storage type not supported: "${type}"`);
        return factory();
    }
}


// 

// mock: StorageRepoMock, mock map 
// given : create un map <string,StorageRepoMock>
// given : create StorageFactory = new StorageFactory()

// SUT  register ("session",  new SessionStorageRepository() )

// SUT create("storage") return error
// SUT create ("ssesion") return new session()

// then isObjectEqual(storageFactory.get("session"), new SessionStorage())
// then  map.containt_key("session"),true

// helper methode to set factory 


