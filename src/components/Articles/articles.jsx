import React from "react";
import PropTypes from "prop-types";
import Article from "./Article/article";
const Articles = (props) => {
  const { articles, favouriteClick } = props;

  return (
    <div>
      {articles.map((val, key) => (
        <Article value={val} favouriteClick={favouriteClick} key={key} />
      ))}
      {articles.length === 0 && "There are no articles yet..."}
    </div>
  );
};

Articles.propTypes = {
  articles: PropTypes.array.isRequired,
  favouriteClick: PropTypes.function,
};

export default Articles;
