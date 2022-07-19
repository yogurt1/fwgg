import { memo } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { type PeopleItem } from "./types";

export interface PeopleCardProps {
    href: string | null;
    peopleItem: PeopleItem;
}

export const PeopleGridCardView = memo(({ peopleItem, href }: PeopleCardProps) => {
    return (
        <Card>
            <CardContent>
                <Typography variant="h5" gutterBottom>{peopleItem.name}</Typography>
            </CardContent>
            <CardActions>
                <Button disabled={!href} component={RouterLink} size="small" to={href || {}}>Go to details</Button>
            </CardActions>
        </Card>
    );
});
