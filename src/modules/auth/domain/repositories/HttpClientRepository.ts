export interface HttpClientRepository{
    post(url: string, body: URLSearchParams): Promise<Response>;
}