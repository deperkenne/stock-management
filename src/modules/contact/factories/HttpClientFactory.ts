import { SessionStorageRepository } from "../../auth/infrastructure/repositories/SessionStorageRepository";
import type { HttpClientRepository } from "../domain/repositories/HttpClientRepository";
import { FetchHttpClientRepository } from "../infrastructure/repositories/fetchHttpClientRepo";
type HttpFactory = () => HttpClientRepository;

const storage = new SessionStorageRepository()

// we make this to respect open close principe
const registry = new Map<string, HttpFactory>([
    ["fetch", () => new FetchHttpClientRepository(storage)],
]);

export class HttpClientFactory {

    static register(type: string, factory: HttpFactory): void {
        registry.set(type, factory);
    }

    static create(type: string): HttpClientRepository {
        const factory = registry.get(type);
        if (!factory) throw new Error(`HttpClient not supported: "${type}"`);
        return factory();
    }
}