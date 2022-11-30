import React from 'react';
import { useParams } from 'react-router';
import NewPost from '../NewPost/newPost';

const RemovePage = () => {
    const {slug} = useParams();
    return (  <div>
        <NewPost slug = {slug} />
    </div>);
}
 
export default RemovePage;