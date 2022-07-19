import { useEffect, useState, type FC } from "react";
import { Box, CircularProgress } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { PeopleItemDetailsView, PeopleItemStore } from "../entities/people";

export const PeopleDetailsPage: FC = observer(() => {
    const { id } = useParams<{ id: string }>();
    const [peopleItemStore] = useState(() => new PeopleItemStore());

    useEffect(() => {
        const ctrl = new AbortController();

        if (id) {
            peopleItemStore.loadItem(id, ctrl.signal);
        } else {
            peopleItemStore.clear();
        }

        return () => {
            ctrl.abort();
        };
    }, [id]);

    const peopleItem = peopleItemStore.getPeopleItem();

    return (
        <Box sx={{ p: 2 }}>
            {peopleItem
                ? <PeopleItemDetailsView peopleItem={peopleItem} />
                : <CircularProgress size="3rem" variant="indeterminate" />
            }
        </Box>
    );
});
