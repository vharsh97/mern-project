import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActionArea, CardActions } from "@mui/material";
import CreatedAtDate from "./CreatedAtDate";

const CardComponent = (props) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardContent>{props.children}</CardContent>
        <CardActions>
          <CreatedAtDate date={props.date} />
        </CardActions>
      </CardActionArea>
    </Card>
  );
};

export default CardComponent;
