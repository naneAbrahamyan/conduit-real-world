import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import { getArticle, postComments } from "../../api";
import "./articlePage.css";
import { Link } from "react-router-dom";
import { Chip } from "@mui/material";
import {
  getComments,
  removeComment,
  removeArticle,
  useApiWrapper,
} from "../../api/index";
import Comments from "../../components/Comments/comments";
import { Context } from "../../context/context";
import { useNavigate } from "react-router-dom";
import { DateFormatter } from "../../utils/dataFormatter";

const ArticlePage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [comment, setComment] = useState("");
  const { userName } = useContext(Context);

  const [getArticles, data] = useApiWrapper(getArticle);
  const [allComements, value] = useApiWrapper(getComments);

  const userArticle = async () => {
    await getArticles(slug);
  };

  const commentsFunc = async () => {
    await allComements(slug);
  };
  async function handleArticleRemoval() {
    await removeArticle(slug);
    navigate("/home");
  }
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await postComments(slug, comment);
    commentsFunc();
    setComment("");
  };

  const handleButtonRemoval = async (value) => {
    await removeComment(slug, value);
    commentsFunc();
  };
  useEffect(() => {
    userArticle();
    commentsFunc();
  }, []);
  return (
    <div>
      <div className="article-page">
        <div className="article-title">
          {data && data.article.title}
          <div className="flex-2" style={{ padding: "20px 0 0 0" }}>
            <div className="round-image">
              <img
                src="https://api.realworld.io/images/demo-avatar.png"
                alt="no img"
              />
            </div>

            <div className="article-page-avatar">
              <Link
                to={`/user/${data?.article?.author?.username}`}
                style={{ textDecoration: "none" }}
              >
                {" "}
                <h4 className="none" style={{ color: "white" }}>
                  {" "}
                  {data?.article?.author?.username}{" "}
                </h4>{" "}
              </Link>
              <p className="none">
                {" "}
                {data && DateFormatter(data.article.createdAt)}{" "}
              </p>
            </div>
            {userName === data?.article?.author?.username && (
              <button
                className="button-art remove"
                onClick={handleArticleRemoval}
              >
                {" "}
                Remove Article{" "}
              </button>
            )}
            {userName === data?.article?.author?.username && (
              <Link to={`/new-post/${slug}`} className="button-art remove">
                {" "}
                Edit Article{" "}
              </Link>
            )}
          </div>
        </div>
      </div>
      <div>
        <div style={{ margin: "10px" }}>{data?.article.title}</div>
        {data?.article?.tagList?.map((value, index) => (
          <Chip label={value} key={index} style={{ margin: "3px" }} />
        ))}
      </div>
      <div className="comments">
        <div className="comments-b">
          <div className="comments margin border">
            <p className={`${userName && "hide"}`}>
              <Link
                to={`/sign-in`}
                style={{ textDecoration: "none", color: "var(--green" }}
              >
                {" "}
                Sign-In{" "}
              </Link>{" "}
              or{" "}
              <Link
                to="/sign-up"
                style={{ textDecoration: "none", color: "var(--green" }}
              >
                {" "}
                Sign-Up{" "}
              </Link>{" "}
              for writing a comment
            </p>
            <form
              onSubmit={handleFormSubmit}
              className={`${!userName && "hide"}`}
            >
              <input
                type="text"
                name="comment"
                label="Comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
                placeholder="Add your comment..."
              />

              <input
                type="submit"
                value="Post Comment"
                style={{ float: "right", padding: "14px 3px" }}
              />
            </form>
          </div>

          {value &&
            value.comments?.map((value, index) => (
              <div className="comments margin" key={index}>
                <Comments
                  value={value}
                  username={userName}
                  removeComment={handleButtonRemoval}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
