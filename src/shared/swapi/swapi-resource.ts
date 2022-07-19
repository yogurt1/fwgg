import { SwapiError } from "./swapi-error"

function assertIsRecord(value: unknown): asserts value is Record<string, unknown> {
    if (typeof value !== "object" || value === null) {
        throw new SwapiError(0, value);
    }
}

export interface SwapiPageResult<T> {
    next: string | null;
    results: T[];
}

export class SwapiResource<T> {
    constructor(private readonly _resource: string, private readonly _baseUrl: string) {}

    async getOne(id: string, signal?: AbortSignal): Promise<T> {
        const url = new URL(`${this._resource}/${id}`, this._baseUrl);
        const result = await this._request(url, { signal });
        return result as T;
    }

    async search(keyword: string, page: number, signal?: AbortSignal): Promise<SwapiPageResult<T>> {
        const url = new URL(this._resource, this._baseUrl);
        
        url.searchParams.set("search", keyword);
        url.searchParams.set("page", `${page}`);

        const result = await this._request(url, { signal });
        
        assertIsRecord(result);

        return result as unknown as SwapiPageResult<T>;
    }

    private async _request(url: URL, init?: RequestInit): Promise<unknown> {
        const request = new Request(url, init);
        const response = await fetch(request);

        request.headers.set("Accept", "application/json");

        const result = await response.json();

        if (!response.ok) throw new SwapiError(response.status, result);

        return result;
    }
}