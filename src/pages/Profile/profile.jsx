import React from "react";
import PropTypes from "prop-types";
import { useState, useContext } from "react";
import {
  favouriteArticle,
  getProfile,
  getUserArticles,
  unfavouriteArticle,
} from "../../api";
import { Link } from "react-router-dom";
import Articles from "../../components/Articles/articles";
import { useEffect } from "react";
import { Context } from "../../context/context";
import {
  getFavoritedArticles,
  followUser,
  unfollowUser,
} from "../../api/index";
import "./profile.css";

const Profile = ({ username }) => {
  const [articles, setArticles] = useState([]);
  let { userName } = useContext(Context);
  const [user, setUser] = useState([]);
  const [following, setFollowing] = useState("");
  const [button, setButton] = useState(1);

  const current = username || userName;
  const getPerson = async (value) => {
    const articles = await getUserArticles(value);
    setArticles(articles.data.articles);
    const u = await getProfile(value);
    setUser(u.data.profile);
    setFollowing(u.data.profile.following);
  };

  const getLiked = async (value) => {
    const articles = await getFavoritedArticles(value);
    setArticles(articles.data.articles);
  };

  const [clicked, setClciked] = useState(1);
  function handleButtonClick(value) {
    setButton(value);
    if (value === 1) {
      setClciked(true);
      getPerson(current);
    } else {
      setClciked(false);
      getLiked(current);
    }
  }

  async function handleFavouriteClick(value, clicked) {
    if (clicked) {
      await unfavouriteArticle(value);
    } else {
      await favouriteArticle(value);
    }
    button === 1 ? getPerson(current) : getLiked(current);
  }

  async function handleFollow() {
    following
      ? await unfollowUser(user.username)
      : await followUser(user.username);
    const u = await getProfile(username);
    setUser(u.data.profile);
    setFollowing(u.data.profile.following);
  }
  console.log(user);
  useEffect(() => {
    getPerson(current);
  }, []);
  return (
    <div>
      <div className="profile-top">
        <div>
          <div className="round-image">
            <img
              src="https://api.realworld.io/images/demo-avatar.png"
              alt="no img"
            />
          </div>
          <h4 className="none"> {current} </h4>
          <p className="none"> {user?.bio}</p>
          <div className="profile-top-button">
            {username && username != userName ? (
              <button className="profile-button" onClick={handleFollow}>
                {" "}
                {!following ? "Follow" : "Unfollow"} {username}
              </button>
            ) : (
              <Link to="/settings" className="profile-button">
                {" "}
                Edit Setting{" "}
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="flex-2">
        <button
          className={`button ${clicked && "button1"}`}
          onClick={() => handleButtonClick(1)}
        >
          {" "}
          My Articles{" "}
        </button>
        <button
          className={`button ${!clicked && "button1"}`}
          onClick={() => handleButtonClick(2)}
        >
          {" "}
          Favorited Articles{" "}
        </button>
      </div>
      <div>
        <Articles articles={articles} favouriteClick={handleFavouriteClick} />
      </div>
    </div>
  );
};

Profile.propTypes = {
  username: PropTypes.string,
};

export default Profile;
