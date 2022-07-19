import { makeObservable, observable, runInAction } from "mobx";
import { isAbortError } from "../../shared/isAbortError";
import { peopleResource } from "../../shared/swapi";
import { type PeopleItem } from "./types";

export class PeopleStore {
    private _currentKeyword = "";
    private _currentPage = 0;

    _people: PeopleItem[] = [];
    _pending = false;
    _failed = false;
    _hasNextPage = false;

    constructor() {
        makeObservable(this, {
            _people: observable.ref,
            _pending: observable,
            _failed: observable,
            _hasNextPage: observable,
        });
    }

    getPending(): boolean {
        return this._pending;
    }

    getFailed(): boolean {
        return this._failed;
    }

    getHasNextPage(): boolean {
        return this._hasNextPage;
    }

    getPeople(): PeopleItem[] {
        return this._people;
    }

    async search(keyword: string, signal?: AbortSignal): Promise<void> {
        return await this._search(keyword, 1, signal);
    }

    async loadNextPage(signal?: AbortSignal): Promise<void> {
        return await this._search(this._currentKeyword, this._currentPage + 1, signal);
    }

    private async _search(keyword: string, page: number, signal?: AbortSignal): Promise<void> {
        try {
            runInAction(() => {
                this._failed = false;
                this._pending = true;

                if (keyword !== this._currentKeyword) {
                    this._people = [];
                    this._currentKeyword = keyword;
                }
            });

            const searchResult = await peopleResource.search(keyword, page, signal);

            runInAction(() => {
                this._currentPage = page;
                this._pending = false;
                
                if (searchResult.results.length > 0) {
                    this._hasNextPage = searchResult.next !== null;
                    this._people = this._people.concat(searchResult.results);
                }
            });
        } catch (error) {
            if (isAbortError(error)) return;

            runInAction(() => {            
                this._pending = false;
                this._failed = true;
            });

            throw error;
        }
    }
}
