import React from 'react';
import { BrowserRouter, Navigate } from "react-router-dom";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home/home";
import NavBar from "./components/NavBar/navBar";
import SignUp from "./pages/SignUp/signUp";
import SignIn from './pages/SignIn/signIn';
import Settings from "./pages/Settings/settings";
import NewPost from './pages/NewPost/newPost';
import Profile from './pages/Profile/profile';
import ArticlePage from './pages/ArticlePage/articlePage';
import UserProfile from './pages/UserProfile/userProfile';
import RemovePage from './pages/RemovePage/removePage';
import {useContext} from 'react';
import { Context } from "./context/context";

function App() {
  const {token} = useContext(Context);
  return (
    <BrowserRouter>
      <div>
        <NavBar />
        {token ? 
          <Routes>
             <Route path="/home" element={<Home/>} />
             <Route path = "/settings" element = {<Settings />} />
             <Route path = "/new-post" element = {<NewPost />} />
             <Route path = "/new-post/:slug" element = {<RemovePage />} />
             <Route path = "/profile" element = {<Profile />} />
             <Route path="/article/:slug" element = {<ArticlePage />} />
             <Route path="/user/:username" element = {<UserProfile />} />
             <Route path="*" element={<Navigate to="/home" replace />}  />

          </Routes> 
          : 
            <Routes>
             <Route path="/home" element={<Home/>} />
             <Route path = "/sign-up" element={ <SignUp />} />
             <Route path = "/sign-in" element={ <SignIn  />} />
             <Route path="/article/:slug" element = {<ArticlePage />} />
             <Route path="/user/:username" element = {<UserProfile />} />
             <Route path="*" element={<Navigate to="/home" replace />}  />
          </Routes>}
      
      </div>
    </BrowserRouter>
  );
}

export default App;
