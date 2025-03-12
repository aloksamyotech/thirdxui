import React from "react";
import { IconButton } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

const FilterToggle = ({ showFilter, setShowFilter }) => {
  return (
    <IconButton onClick={() => setShowFilter(!showFilter)} sx={{ position: "absolute", top: 4, right: 10 }}>
      <FilterListIcon sx={{ fontSize: 30, color: showFilter ? "blue" : "gray" }} />
    </IconButton>
  );
};

export default FilterToggle;
