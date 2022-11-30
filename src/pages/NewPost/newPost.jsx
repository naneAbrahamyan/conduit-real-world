import React, { useState, useEffect } from 'react';
import { createArticle, editArticle, getArticle } from '../../api';
import FormHelperText from "@mui/material/FormHelperText";
import { useNavigate } from 'react-router-dom';

import './newPost.css'
const NewPost = (props) => {
        const [errorMessage, setErrorMessage] = useState("");
        const navigate = useNavigate();
        const [values, setValues] = useState("");
       
        const handleInputValue = (e) => {
            const {name, value} = e.target;
            setValues({
                ...values,
                [name]: value,
            });
        };
        const handleFormSubmit = async(e) => {
            e.preventDefault();
            if(props.slug){
               const data =  await editArticle(props.slug, {...values})
               navigate(`/article/${data.data.article.slug}`)
            }
            else{
                createArticle({...values, tagList: (values.tagList).split(" ")});
                setValues({})
            }
           
          }
        const article = async () => {
            let article = await getArticle(props.slug);
            article = article.data.article
            setValues({title : article.title, body: article.body, description: article.description, tagList: article.tagList.join(' ')});

        }
    
        useEffect(()=>{
            if(props.slug){
                article();
            }
            
        }, [])
    
        return ( 
            
        <div className='general-form change'>
         <form onSubmit={handleFormSubmit} >
         <FormHelperText error={true}>{errorMessage || " "}</FormHelperText>

             
                <input
                    type="text"
                    name="title"
                    label="Title"
                    value={values.title}
                    onChange={handleInputValue}
                    placeholder = "Article Title"
                    required
                />
    
                <input
                    type="text"
                    name="body"
                    label = "Body"
                    value={values.body}
                    onChange={handleInputValue}
                    placeholder = "What's the article about?"
                    required
                />


                <input
                    type="text"
                    name="description"
                    label="Description"
                    value={values.description}
                    onChange={handleInputValue}
                    placeholder = "Write your article (in markdown)"
                    style={{height: '110px', resize: 'none'}}

                />
                 <input
                    type="text"
                    name="tagList"
                    label="TagList"
                    value={values.tagList}
                    onChange={handleInputValue}
                    placeholder = "Enter tags"

                />
               
    
            <input type="submit" value = {`${props.slug ? "Edit Article" : "Post" }`} style = {{float:'right', width: '120px'}} />
    
    
            </form>
        </div> );
     
}
 
export default NewPost;