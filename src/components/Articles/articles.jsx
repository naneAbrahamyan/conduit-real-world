import React, { Component } from 'react';
import Article from './Article/article';
import { useEffect } from 'react';
const Articles = (props) => {
    const {articles, favouriteClick} = props
  
    useEffect(()=>{

    }, [articles, props])
    return ( 
        <div>
          
            {articles.map((val, key )=> (
                <Article value = {val}  favouriteClick = {favouriteClick} key = {key}/>
                ))}
            {articles.length == 0 && 'There are no articles yet...'}
        </div>
        
            );
}
 
export default Articles;