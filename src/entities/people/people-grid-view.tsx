import { Grid } from "@mui/material";
import { type FC } from "react";
import { type PeopleItem } from "./types";
import { PeopleGridCardView } from "./people-grid-card-view";
import { getPeopleIdFromUrl } from "./get-people-id-from-url";

export interface PeopleGridViewProps {
    people: PeopleItem[];

    getPeopleItemLink: (item: PeopleItem, index: number) => string | null;
}

export const PeopleGridView: FC<PeopleGridViewProps> = ({ people, getPeopleItemLink }) => {
    return (
        <Grid container spacing={2}>
            {people.map((item, index) => (
                <Grid key={index} item sx={{ width: 300 }}>
                    <PeopleGridCardView peopleItem={item} href={getPeopleItemLink(item, index)} />
                </Grid>
            ))}
        </Grid>
    );
};
