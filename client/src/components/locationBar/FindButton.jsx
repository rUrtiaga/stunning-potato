import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";

function FindButton(params) {
  return (
    <IconButton color="primary" {...params} aria-label="Find">
      Find
      <SearchIcon />
    </IconButton>
  );
}

export default FindButton;
