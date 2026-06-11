import type { HttpClientRepository } from "../../domain/repositories/HttpClientRepository";

export class FetchHttpClientRepository implements HttpClientRepository {

    async post<TResponse>(
        url: string,
        body: unknown
    ): Promise<TResponse> {

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            throw new Error(
                `HTTP Error ${response.status}`
            );
        }

        return await response.json() as TResponse;
    }
}