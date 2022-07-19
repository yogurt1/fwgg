import { SwapiResourceFactory } from "./swapi-resource-factory";
import { PeopleResourceDto } from "./types";

const SWAPI_BASE_URL = "https://swapi.dev/api/";

const resourceFactory = new SwapiResourceFactory(SWAPI_BASE_URL);

export const peopleResource = resourceFactory.build<PeopleResourceDto>("people");

export * from "./types";
export { SwapiError } from "./swapi-error";
export { SwapiResource } from "./swapi-resource";
