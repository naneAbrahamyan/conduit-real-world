import React, { Component } from 'react';
import { useState, useContext } from 'react';
import { favouriteArticle, getProfile, getUserArticles, unfavouriteArticle } from '../../api';
import {Link} from 'react-router-dom'
import Articles from '../../components/Articles/articles';
import { useEffect } from 'react';
import { Context } from '../../context/context';
import jwt_decode from "jwt-decode";
import { getFavoritedArticles, followUser, unfollowUser } from '../../api/index';
import './profile.css'

const Profile = (props) => {
    const [articles, setArticles] = useState([])
    let token = useContext(Context);
    const [user, setUser] = useState([])
    const [following, setFollowing] = useState('')
    const username = props.username ? props.username : jwt_decode(token.token).username;
    if(token.token){
        token = jwt_decode(token.token).username
    }
    const a = async(value) => {
        const articles = await getUserArticles(value);
        setArticles(articles.data.articles);
        const u = await getProfile(username);
        setUser(u.data.profile);
        setFollowing(u.data.profile.following);
    }


    const b = async(value) => {
        const articles = await getFavoritedArticles(value);
        setArticles(articles.data.articles);

    }

    const [clicked, setClciked] = useState(true);
    function handleButtonClick(value){
       if(value === 1 ){
            setClciked(true)
            a(username);

       }  else{
            setClciked(false)
            b(username);

       };
    }


    async function handleFavouriteClick(value, clicked){
        if(clicked){
            await unfavouriteArticle(value);
        }
        else{
            await  favouriteArticle(value)
        }
        a(username);
     
    }

    async function handleFollow(){
        following ?  await unfollowUser(user.username) : await followUser(user.username);
        const u = await getProfile(username);
        setUser(u.data.profile);
        setFollowing(u.data.profile.following)
    }
    useEffect( ()=> {
         a(username)
    }, [])
    return ( 
        <div>
            <div className='profile-top'>
                <div>
                <div className='round-image'>
                   <img src="https://api.realworld.io/images/demo-avatar.png"  alt = "no img"/>
                </div>
                <h4 className='none'> {username} </h4>
                <p className='none'> {user?.bio}</p>
                <div className='profile-top-button'>
                    {(props?.username && props?.username != token )? ( <button className='profile-button' onClick = {handleFollow}> {!following ? "Follow" : "Unfollow"}  {username }</button>) : <Link to="/settings" className='profile-button'> Edit Setting </Link>}
                   
                </div>
                </div>
            
            </div>
          <div className='flex-2'>
            <button className={`button ${clicked && "button1" }`} onClick = {() => handleButtonClick(1)}> My Articles </button>
            <button className={`button ${!clicked &&  "button1"}`} onClick = {() => handleButtonClick(2)}> Favorited Articles </button>
          </div>
        <div>
           <Articles articles = {articles} favouriteClick = {handleFavouriteClick}/>

        </div>
        </div>
     );
}
 
export default Profile;