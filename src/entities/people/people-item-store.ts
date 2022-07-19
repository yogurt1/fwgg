import { makeObservable, observable, reaction, runInAction } from "mobx";
import { isAbortError } from "../../shared/isAbortError";
import { peopleResource, SwapiError } from "../../shared/swapi";
import { type PeopleItem } from "./types";

export class PeopleItemStore {
    _peopleItem: PeopleItem | null = null;
    _pending = false;
    _failed = false;
    _notFound = false;

    constructor() {
        makeObservable(this, {
            _peopleItem: observable.ref,
            _pending: observable,
            _failed: observable,
            _notFound: observable,
        });
    }

    isNotFound(): boolean {
        return this._notFound;
    }
    
    isPending(): boolean {
        return this._pending;   
    }

    isFailed(): boolean {
        return this._failed;
    }

    getPeopleItem(): PeopleItem | null {
        return this._peopleItem;
    }

    clear(): void {
        this._peopleItem = null;
    }

    async loadItem(id: string, signal?: AbortSignal): Promise<void> {
        try {
            runInAction(() => {
                this._pending = true;
                this._failed = false;
                this._notFound = false;
                this._peopleItem = null;
            });

            const peopleItem = await peopleResource.getOne(id, signal);

            runInAction(() => {
                this._pending = false;
                this._peopleItem = peopleItem;
            })
        } catch (error) {
            if (isAbortError(error)) return;

            runInAction(() => {
                this._pending = false;
                this._failed = true;
                this._notFound = SwapiError.isSwapiError(error) && error.isNotFound();
            })
        }
    }
}