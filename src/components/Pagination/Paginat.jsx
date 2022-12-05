import React from "react";
import Pagination from "@mui/material/Pagination";
import { PropTypes } from "prop-types";

const Paginat = ({ articleCount, handleClick }) => {
  const numberOfPagination = Math.ceil(articleCount / 9);
  return (
    <Pagination
      count={numberOfPagination}
      variant="outlined"
      shape="rounded"
      color="success"
      style={{ color: "green", margin: "20px" }}
      onChange={handleClick}
    />
  );
};

Paginat.propTypes = {
  articleCount: PropTypes.number,
  handleClick: PropTypes.function,
};

export default Paginat;
