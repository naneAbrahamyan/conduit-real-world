import React, { useContext, useState } from 'react';
import { Context } from '../../context/context';
import {Link} from 'react-router-dom';
import './navBar.css'
import jwt_decode from "jwt-decode";

const NavBar = () => {
    const {token} = useContext(Context)
    const value = token ? jwt_decode(token).username : "";
   
    return ( 
        <nav className='navigation'>
          <div  className='logo'>
            <Link to = "/home">
              Conduit
            </Link>
          </div>
          {token ? (
            <div>
                <ul>
                    <li>
                            <Link to = "/home"> Home </Link>
                        </li>

                        <li>
                            <Link to = "/new-post"> New Post </Link>
                        </li>
                    
                        <li>
                            <Link to="/settings"> Settings </Link>
                        </li>

                        <li>
                            <Link to="/profile"> {value} </Link>
                        </li>
                    </ul>
            </div>
        ): 
        (   
            <div>
                <ul>
                <li>
                        <Link to = "/home"> Home </Link>
                    </li>

                    <li>
                        <Link to = "/sign-in">  Sign in</Link>
                    </li>
                
                    <li>
                        <Link to="/sign-up"> Sign Up</Link>
                    </li>
                </ul>
        </div>
       )}

        </nav>
     );
}
 
export default NavBar;