import React, { useState, useEffect, useContext } from 'react';
import Articles from '../../components/Articles/articles';
import { favouriteArticle, getArticles, unfavouriteArticle, filterByTag, getFollowedArticles } from '../../api/index';
import PopularTags from '../../components/PopularTags/popularTags';
import Paginat from '../../components/Pagination/Paginat';
import { Context } from '../../context/context';
const Home = () => {
    const [clicked, setClicked] = useState(1);
    const [articles, setArticles] = useState([])
    const [tag, setTag] = useState("");
    const [articleCount, setArticleCount] = useState(0);
    const [offset, setOffset] = useState(0);
    const {token} = useContext(Context)

    const a = async() => {
        const articles = await getArticles(9, offset);
        setArticles(articles.data.articles);
        setArticleCount(articles.data.articlesCount);
    }
    const b = async(tag) => {
        const a = await filterByTag(tag, 9 , offset);
        setArticles(a.data.articles);
        setArticleCount(articles.data.articlesCount);
    }

    const c = async() => {
        const articles = await getFollowedArticles(offset);
        setArticles(articles.data.articles);
        setArticleCount(articles.data.articlesCount);
    }
    

    async function handleFavouriteClick(value, clicked){
        if(clicked){
            await unfavouriteArticle(value);
        }
        else{
            await favouriteArticle(value)
        }
        
       tag ? b(tag) : a();
    }

    async function handleTagClick(value){
        const a = async() => {
            const a = await filterByTag(value);
            setArticles(a.data.articles);
        }
        a()
        setTag(value);
    }

    function handleButtonClick(value){
        setTag(false);
        if(value == 1){
            setClicked(1);
            setOffset(1);
            a();
        }
        else if(value == 2){
            setClicked(2);
            setOffset(1);
            c();
        }
      
    }

    function handlePaginationClick(e, page){
          setOffset((page-1)*9);
          clicked == 1 ? a() : c();
    }

    useEffect(() => {
        a();
    }, [])
    return ( 
    <div >
        <div className='flex-2'>
            <button className={`button ${clicked==1 && !tag ? "button1" : ""}`} onClick = {() => handleButtonClick(1)}> Global Feed </button>
            {token && <button className={`button ${clicked==2 && !tag ? "button1" : ""}`} onClick = {() => handleButtonClick(2)}> Your Feed </button> }
            <button className ={`${tag ? "button button1" : 'hide'}`}>  {tag}  </button>
          </div>

        <div className = "box flex-1" >
          <div className = 'grow box'>
             <Articles articles = {articles} favouriteClick = {handleFavouriteClick}/>
             <div className= {`${tag && 'hide'}`}> 
                <Paginat articleCount = {articleCount} handleClick = {handlePaginationClick}/>
             </div>
           
          </div>
       
            <div>
              <PopularTags tagClick = {handleTagClick} />
            </div>
        </div>
    </div> );
}
 
export default Home;