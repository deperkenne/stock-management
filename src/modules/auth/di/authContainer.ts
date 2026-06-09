import { OidcProviderFactory } from "../factories/OidcProviderFactory";
import { StorageFactory } from "../factories/StorageFactory";
import { BrowserNavigator } from "../infrastructure/adapters/BrowserNavigator";
import { LoginUseCase } from "../application/use-cases/LoginUseCase";
import { HandleCallbackUseCase } from "../application/use-cases/HandleCallbackUseCase";
import { LogoutUseCase } from "../application/use-cases/LogoutUseCase";
import { HttpClientFactory } from "../factories/HttpClientFactory";

const provider  = OidcProviderFactory.create("keycloak");
const storage   = StorageFactory.create("session");
const http_client = HttpClientFactory.create("fetch")
const navigator = new BrowserNavigator();

export const loginUseCase          = new LoginUseCase(provider, storage, navigator);
export const handleCallbackUseCase = new HandleCallbackUseCase(provider, storage, navigator,http_client);
export const logoutUseCase         = new LogoutUseCase(storage);
