import React, { useState , useEffect, useContext} from 'react';
import { Context } from '../../context/context';
import { useNavigate } from 'react-router';
import { getUser, updateSettings } from '../../api';
import {updateToken} from '../../utils/localStorage'
import './settings.css'
const Settings = () => {
    const navigate = useNavigate()
    const {setToken} = useContext(Context)
    const [values, setValues] = useState("");
    const a = async() =>{ 
        const val = await getUser();
        setValues({...val.data.user});
    };
    const handleInputValue = (e) => {
        const {name, value} = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };
    const handleFormSubmit = async(e) => {
        e.preventDefault();
        updateSettings(values);
      }
    function handleLogout(){
        updateToken("");
        setToken("");
        navigate('/home');
    }
    useEffect(()=>{
        a();
    }, [])

    return ( 
        
    <div className='general-form'>
     <form onSubmit={handleFormSubmit} >
            <div className='center-div'>
                <div className='text-elements-style'>
                    <h2> Your Settings </h2>
                </div>
                        
        </div>
            <input
                type="text"
                name="image"
                label="Image"
                value={values.image}
                onChange={handleInputValue}
            />

            <input
                type="text"
                name="username"
                label="Username"
                value={values.username}
                onChange={handleInputValue}
            />
            <input
                type="text"
                name="bio"
                label="Bio"
                value={values.bio}
                onChange={handleInputValue}
            />
             <input
                type="text"
                name="email"
                label="Email"
                value={values.email}
                onChange={handleInputValue}
            />
            <input
                name="password"
                value={values.password}
                onChange={handleInputValue}
                type="password"
                label="Password"
                placeholder='Your New Password...'    
            />

        <input type="submit" value = "Update Settings" style = {{float:'right', width: '120px'}} />

      </form>
      <button className='settings-button' onClick={handleLogout}> Log Out </button>
    </div> );
}
 
export default Settings;