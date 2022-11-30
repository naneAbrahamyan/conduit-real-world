import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router';
import { getArticle, postComments } from '../../api';
import './articlePage.css'
import { Link } from 'react-router-dom';
import { Chip } from '@mui/material';
import { getComments, removeComment, removeArticle } from '../../api/index';
import Comments from '../../components/Comments/comments';
import { Context } from '../../context/context';
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';


const ArticlePage = () => {
  const navigate = useNavigate();
  const [article, setArticle] = useState([]);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');

  const {token} = useContext(Context);
  const val = token ? jwt_decode(token).username : "";

  const {slug} = useParams();
  const a = async() => {
   const a = await getArticle(slug);
   setArticle(a.data.article)
  }

  const commentsFunc = async() => {
    const com = await getComments(slug);
    setComments(com.data.comments);

  }

  let date1 = new Date(article.createdAt)+" ";
  date1= date1.slice(0,16);

  async function handleArticleRemoval(){
       await removeArticle(slug);
       navigate('/home')
  }

 const handleFormSubmit = async(e) => {
       e.preventDefault();
       await postComments(slug, comment);
       commentsFunc();
       setComment('');
  }

  const handleButtonRemoval = async(value) => {
      await removeComment(slug, value);
      commentsFunc();
  }
  useEffect(()=> {
    a();
    commentsFunc();
  }, [])
    return ( 
    <div>
    <div className='article-page'>
      <div className="article-title">
         {article.title}
         <div className='flex-2' style={{padding: '20px 0 0 0'}}>
          <div className='round-image'>
              <img src="https://api.realworld.io/images/demo-avatar.png"  alt = "no img"/>
          </div>

          <div className='article-page-avatar'>
            <Link to= {`/user/${article?.author?.username}`} style={{textDecoration: 'none'}}>   <h4 className='none' style={{color:'white'}}>   {article?.author?.username} </h4>  </Link>
             <p className='none'> {date1} </p>
          </div>
          {val === article?.author?.username&& <button className='button-art remove' onClick={handleArticleRemoval}> Remove Article </button>}
          {val === article?.author?.username&& <Link  to={`/new-post/${slug}`} className='button-art remove'> Edit Article </Link>}
       </div>
      </div>   
    </div>
      <div>
        <div style = {{margin: '10px'}}>
           {article.title}
        </div>
        {article?.tagList?.map(value => (
            <Chip label={value} style = {{margin: '3px'}} />
        ))}
      </div>
     <div className='comments'>
        <div className='comments-b'>
          <div className='comments margin border'>
            <p className={`${token && "hide"}`}> 
              <Link to={`/sign-in`} style={{textDecoration: 'none', color: "var(--green"}}> Sign-In </Link> or <Link to="/sign-up"  style={{textDecoration: 'none', color: "var(--green"}}> Sign-Up </Link> for writing a comment
            </p>
            <form onSubmit={handleFormSubmit} className={`${!token && "hide"}`}>
                  <input
                    type="text"
                    name="comment"
                    label="Comment"
                    value={comment}
                    onChange={e =>  setComment(e.target.value)}
                    required
                    placeholder='Add your comment...'
                />

                <input type="submit" value = "Post Comment" style = {{float:'right', padding: '14px 3px'}} />
                    
            </form>
          </div>
        
          {comments?.map(value => (
            <div className='comments margin'> 
            <Comments value = {value} username = {val} removeComment = {handleButtonRemoval}/>
            </div>
          ))}
          
        </div>
     </div>
     
    </div>
 
    
    );
}
 
export default ArticlePage;