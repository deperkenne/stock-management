import { ContactMessageSender } from "../application/use-cases/ContactMessageSender";
import { HttpClientFactory } from "../factories/HttpClientFactory";


const http_client = HttpClientFactory.create("fetch");
export const contactMessageSender = new ContactMessageSender(http_client);