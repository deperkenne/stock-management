import type { HttpClientRepository } from "../../domain/repositories/HttpClientRepository";
import type { IContactMessageProps } from "../../domain/entities/ContactMessage";

interface ContactApiResponse {
    success: boolean;
    message?: string;
}

export class ContactMessageSender {
    private readonly httpClient: HttpClientRepository;

    constructor(httpClient: HttpClientRepository) {
        this.httpClient = httpClient;
    }

    async execute(message: IContactMessageProps): Promise<void> {
        const response = await this.httpClient.post<ContactApiResponse>(
            "http://localhost:8080/api/notification",
            message
        );

        if (!response.success) {
            throw new Error(response.message ?? "Failed to send contact message.");
     }
    }
}