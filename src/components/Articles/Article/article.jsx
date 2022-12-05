import React, { useContext } from "react";
import FavoriteBorderSharpIcon from "@mui/icons-material/FavoriteBorderSharp";
import "./article.css";
import Chip from "@mui/material/Chip";
import { Context } from "../../../context/context";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Article = ({ value, favouriteClick }) => {
  const { token } = useContext(Context);
  const article = value;
  const clicked = article.favorited;

  let date1 = new Date(article.createdAt) + " ";
  date1 = date1.slice(0, 16);

  return (
    <div className="container">
      <div className="flex-1">
        <div className="flex-2">
          <div className="round-image">
            <img
              src="https://api.realworld.io/images/demo-avatar.png"
              alt="no img"
            />
          </div>

          <div>
            <h4 className="none"> {article.author.username} </h4>
            <p className="none"> {date1} </p>
          </div>
        </div>
        <div>
          <button
            className={`favorite-button ${
              token && clicked && "favorite-button-clicked"
            } `}
            onClick={() => favouriteClick(article.slug, clicked)}
          >
            <div className="flex-1">
              <FavoriteBorderSharpIcon
                style={{ color: `${!clicked ? "green" : "white"}` }}
              />
              <div style={{ marginTop: "3px" }}> {article.favoritesCount} </div>
            </div>
          </button>
        </div>
      </div>
      <Link to={`/article/${article.slug}`} style={{ textDecoration: "none" }}>
        <div>
          <h4 className="none" style={{ color: "black" }}>
            {" "}
            {article.title.slice(0, 500)}
          </h4>
          <p> {article.description.slice(0, 200)} </p>
        </div>

        <div className="flex-1 small-font">
          <div>
            <p> Read More ... </p>
          </div>
          <div>
            {article.tagList.map((tag, index) => (
              <Chip key={index} label={tag} />
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
};

Article.propTypes = {
  value: PropTypes.array.isRequired,
  favouriteClick: PropTypes.function,
};

export default Article;
