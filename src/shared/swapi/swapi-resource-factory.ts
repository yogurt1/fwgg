import { SwapiResource } from "./swapi-resource";

export class SwapiResourceFactory {
    constructor(private readonly _baseUrl: string) {}

    build<T>(resource: string): SwapiResource<T> {
        return new SwapiResource(resource, this._baseUrl);
    }
}