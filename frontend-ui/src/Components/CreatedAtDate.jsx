import React from "react";
import moment from "moment";
import { Typography } from "@mui/material";

const CreatedAtDate = ({ date }) => {
  if (!date) {
    return null;
  }
  
  const timeAgo = moment(date).fromNow();
  return (
    <Typography variant="caption" display="block" gutterBottom align="left">
      <em>{timeAgo}</em>
    </Typography>
  );
};

export default CreatedAtDate;
