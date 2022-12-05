import React, { useState, useEffect } from "react";
import { createArticle, editArticle, getArticle } from "../../api";
import { useNavigate } from "react-router-dom";

import "./newPost.css";
import { PropTypes } from "prop-types";
const NewPost = ({ slug }) => {
  const navigate = useNavigate();
  const [values, setValues] = useState("");

  const handleInputValue = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (slug) {
      const data = await editArticle(slug, { ...values });
      navigate(`/article/${data.data.article.slug}`);
    } else {
      createArticle({ ...values, tagList: values.tagList.split(" ") });
      setValues({});
    }
  };
  const article = async () => {
    let article = await getArticle(slug);
    article = article.data.article;
    setValues({
      title: article.title,
      body: article.body,
      description: article.description,
      tagList: article.tagList.join(" "),
    });
  };

  useEffect(() => {
    if (slug) {
      article();
    }
  }, []);

  return (
    <div className="general-form change">
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="title"
          label="Title"
          value={values.title}
          onChange={handleInputValue}
          placeholder="Article Title"
          required
        />

        <input
          type="text"
          name="body"
          label="Body"
          value={values.body}
          onChange={handleInputValue}
          placeholder="What's the article about?"
          required
        />

        <input
          type="text"
          name="description"
          label="Description"
          value={values.description}
          onChange={handleInputValue}
          placeholder="Write your article (in markdown)"
          style={{ height: "110px", resize: "none" }}
        />
        <input
          type="text"
          name="tagList"
          label="TagList"
          value={values.tagList}
          onChange={handleInputValue}
          placeholder="Enter tags"
        />

        <input
          type="submit"
          value={`${slug ? "Edit Article" : "Post"}`}
          style={{ float: "right", width: "120px" }}
        />
      </form>
    </div>
  );
};
NewPost.propTypes = {
  slug: PropTypes.string,
};

export default NewPost;
