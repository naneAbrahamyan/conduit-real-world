import React from 'react';
import { useParams } from 'react-router';
import Profile from '../Profile/profile';
 const UserProfile = () => {
    const {username} = useParams();
    return ( 
    <div>
        <Profile username={username} />
    </div> );
 }
  
 export default UserProfile;