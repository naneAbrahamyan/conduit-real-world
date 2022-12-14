import React, { useState } from "react";
import { useEffect } from "react";
import { getTags } from "../../api";
import Chip from "@mui/material/Chip";
import "./popularTags.css";
import PropTypes from "prop-types";

const PopularTags = ({ tagClick }) => {
  const [tags, setTags] = useState([]);
  const getTag = async () => {
    const values = await getTags();
    setTags(values.data.tags);
  };

  useEffect(() => {
    getTag();
  }, []);

  return (
    <div className="popular-tags-box">
      <h4> Popular Tags </h4>
      {tags.map((tag, index) => (
        <Chip
          label={tag}
          key={index}
          style={{ margin: "2px" }}
          onClick={() => tagClick(tag)}
        />
      ))}
    </div>
  );
};

PopularTags.propTypes = {
  tagClick: PropTypes.function,
};

export default PopularTags;
