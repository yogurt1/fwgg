import { memo, type ReactNode } from "react";
import { Box, Typography, Link } from "@mui/material";
import { type PeopleItem } from "./types";

function capitalize(value: string): string {
    if (value === "n/a") return value;

    return `${value.charAt(0).toUpperCase()}${value.substring(1)}`;
}

function selectLinks(value: unknown[]): string[] {
    return value.filter((item): item is string => typeof item === "string");
}

function formatIsoDate(value: string): string {
    const date = new Date(value);

    return date.toLocaleString();
}

const Property = ({ name, value }: { name: ReactNode; value: ReactNode }) => {
    const nameEl = (
        <Typography component="span" sx={{ fontWeight: "bold" }}>
            {name}:
        </Typography>
    );
    return (
        <Typography noWrap>
            {nameEl} {value}
        </Typography>
    );
};

const Links = ({ name, links }: { name: ReactNode; links: string[] }) => {
    const hasLinks = links.length > 0;

    return (
        <Box>
            <Typography sx={{ fontWeight: "bold" }}>
                {name}:{" "}
                {!hasLinks && (
                    <Typography component="span" sx={{ fontWeight: "initial" }}>
                        {"n/a"}
                    </Typography>
                )}
            </Typography>

            {hasLinks && (
                <ul>
                    {links.map(link => (
                        <li key={link} style={{ marginBlockStart: 0 }}>
                            <Link href={link}>{link}</Link>
                        </li>
                    ))}
                </ul>
            )}
        </Box>
    );
};

export interface PeopleItemDetailsViewProps {
    peopleItem: PeopleItem;
}

export const PeopleItemDetailsView = memo<PeopleItemDetailsViewProps>(({ peopleItem }) => {
    return (
        <Box>
            <Typography gutterBottom variant="h4">
                {peopleItem.name}
            </Typography>
            <Property name="Birth year" value={peopleItem.birth_year} />
            <Property name="Gender" value={capitalize(peopleItem.gender)} />
            <Property name="Height" value={`${peopleItem.height}cm`} />
            <Property name="Eye color" value={capitalize(peopleItem.eye_color)} />
            <Property name="Mass" value={`${peopleItem.mass}kg`} />
            <Property name="Created at" value={formatIsoDate(peopleItem.created)} />
            <Property name="Edited at" value={formatIsoDate(peopleItem.edited)} />
            <Links name="Vehicles" links={selectLinks(peopleItem.vehicles)} />
            <Links name="Films" links={selectLinks(peopleItem.films)} />
            <Links name="Starships" links={selectLinks(peopleItem.starships)} />
        </Box>
    );
});
