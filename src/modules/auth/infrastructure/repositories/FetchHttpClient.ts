import type { HttpClientRepository } from "../../domain/repositories/HttpClientRepository";

export class FetchHttpClient implements HttpClientRepository {
    post(url: string, body: URLSearchParams): Promise<Response> {
        return fetch(url, {
            method:  "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body,
        });
    }
}