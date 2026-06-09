import type { NavigatorPortRepository } from "../../domain/repositories/NavigatorPortRepository";

export class BrowserNavigator implements NavigatorPortRepository {

    redirectTo(url: string): void {
        window.location.href = url;
    }

    getSearchParams(): URLSearchParams {
        return new URLSearchParams(window.location.search);
    }

    clearSearchParams(): void {
        window.history.replaceState({}, "", window.location.pathname);
    }

    getPathname(): string {
        return window.location.pathname;
    }
}
