import { useEffect, useRef, useState } from "react";
import { Box, CircularProgress, Input, Stack, TextField } from "@mui/material";
import { observer } from "mobx-react-lite";
import { PeopleStore, PeopleGridView, getPeopleIdFromUrl } from "../entities/people";
import { useSearchParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroller";

class PeoplePageViewModel {
    private _ctrl = new AbortController();

    constructor(private readonly _peopleStore: PeopleStore) {}

    abort(): void {
        this._ctrl.abort();
        this._ctrl = new AbortController();
    }

    async keywordChange(keyword: string): Promise<void> {
        this.abort();

        const { signal } = this._ctrl;

        await this._peopleStore.search(keyword, signal);

        // load next pages until scrollbar become visible
        while (!signal.aborted && this._peopleStore.getHasNextPage() && !this._isViewportScrollable()) {
            await this._peopleStore.loadNextPage();
        }
    }

    loadMore(): void {
        this.abort();
        this._peopleStore.loadNextPage(this._ctrl.signal);
    }

    private _isViewportScrollable(): boolean {
        return document.body.scrollHeight > window.innerHeight;
    }
}

export const PeoplePage = observer(() => {
    const [peopleStore] = useState(() => new PeopleStore());
    const [peopleVm] = useState(() => new PeoplePageViewModel(peopleStore));

    const [searchParams, setSearchParams] = useSearchParams();
    const keyword = searchParams.get("keyword") ?? "";

    useEffect(() => {
        peopleVm.keywordChange(keyword);
    }, [keyword]);

    useEffect(() => {
        return () => peopleVm.abort();
    }, []);

    return (
        <Box sx={{ p: 2 }}>
            <TextField
                sx={{ mb: 2 }}
                variant="outlined"
                label="Search people"
                value={keyword}
                onChange={event => {
                    const keyword = event.target.value;
                    setSearchParams({ keyword }, { replace: true });
                }}
                InputProps={{
                    endAdornment: peopleStore.getPending() && (
                        <CircularProgress size="1em" variant="indeterminate" color="primary" />
                    ),
                }}
            />

            <InfiniteScroll
                pageStart={1}
                hasMore={peopleStore.getHasNextPage()}
                initialLoad={false}
                loadMore={() => peopleVm.loadMore()}
            >
                <PeopleGridView
                    people={peopleStore.getPeople()}
                    getPeopleItemLink={item => {
                        const id = getPeopleIdFromUrl(item.url);
                        return id ? `/${id}` : null;
                    }}
                />
            </InfiniteScroll>
        </Box>
    );
});
