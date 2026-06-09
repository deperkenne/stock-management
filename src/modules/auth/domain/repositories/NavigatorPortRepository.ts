export interface NavigatorPortRepository {
    redirectTo(url: string): void;
    getSearchParams(): URLSearchParams;
    clearSearchParams(): void;
    getPathname(): string;
}
