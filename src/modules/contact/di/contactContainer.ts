import { ContactMessageSender } from "../application/use-cases/ContactMessageSender";
import { FetchHttpClientRepository } from "../infrastructure/repositories/fetchHttpClientRepo";
import { StorageFactory } from "../../auth/factories/StorageFactory";

const storage     = StorageFactory.create("session");
const http_client = new FetchHttpClientRepository(storage);

export const contactMessageSender = new ContactMessageSender(http_client);