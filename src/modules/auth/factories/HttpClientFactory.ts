import type { HttpClientRepository } from "../domain/repositories/HttpClientRepository";
import { FetchHttpClient } from "../infrastructure/repositories/FetchHttpClient";


type HttpFactory = () => HttpClientRepository;

// we make this to respect open close principe
const registry = new Map<string, HttpFactory>([
    ["fetch", () => new FetchHttpClient()],
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