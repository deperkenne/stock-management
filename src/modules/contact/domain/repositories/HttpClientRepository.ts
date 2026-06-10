export interface HttpClientRepository {
    post<TResponse>(url: string, body: unknown): Promise<TResponse>;
}