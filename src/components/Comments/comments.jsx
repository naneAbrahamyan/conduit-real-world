import React from "react";
import "./comments.css";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
const Comments = ({ value, username, removeComment }) => {
  const token = username;
  const get = token == value.author.username ? true : false;
  let date1 = new Date(value.createdAt) + " ";
  date1 = date1.slice(0, 16);
  return (
    <div className="comment-box">
      {value.body}
      <div
        className={`${!get ? "flex-2" : "flex-3"} comment-box-bottom center`}
      >
        <div className="flex-2 center">
          <div className="round-image" style={{ marginTop: "2px" }}>
            <img
              src="https://api.realworld.io/images/demo-avatar.png"
              alt="no img"
            />
          </div>
          <Link
            to={`/user/${value.author.username}`}
            style={{
              color: "var(--green)",
              marginRight: "4px",
              textDecoration: "none",
            }}
            className="none"
          >
            {" "}
            {value.author.username}{" "}
          </Link>
        </div>
        <div>
          {" "}
          <p className="none"> {date1} </p>{" "}
        </div>
        <div>
          <button
            className={`${!get ? "hide" : ""}`}
            onClick={() => removeComment(value.id)}
          >
            {" "}
            Remove{" "}
          </button>
        </div>
      </div>
    </div>
  );
};
Comments.propTypes = {
  value: PropTypes.object,
  username: PropTypes.string,
  removeComment: PropTypes.function,
};
export default Comments;
