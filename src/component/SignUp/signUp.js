import React, { useState } from "react";
import Button from "../button";
import { Link } from "react-router-dom";
import {auth} from '../../firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Alert } from "../../Modal/alert";
import Navbar from "../navbar";

const SignUp = () => {

const [email, setEmail] = useState();
const [password, setPassword] = useState('');
const [showAlert, setShowAlert] = useState(false);
const [error, setError] = useState();

const signUpClick = (e) => {
    e.preventDefault();
    if( email === '' || password === ''){
      setError("email and password cannot be empty");
    }
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // User signed up successfully
            const user = userCredential.user;
            console.log("User signed up:", user.email);
            localStorage.setItem('email', user.email);
        })
        .catch((error) => {
            // Handle sign-up errors
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Sign-up error:', error.message);
            if (errorCode === "auth/email-already-in-use") {
                setError("Email is already in use. Please use a different email.");
                setShowAlert(!showAlert);
                
            } else if (errorCode === "auth/network-request-failed") {
                setError("Network error. Please check your internet connection.");
                setShowAlert(!showAlert);
            } else {
                setError(errorMessage);
                setShowAlert(!showAlert);
            }
        });
};
    return (
     <>
        <Navbar />
        <div className="signUp">
           {showAlert && <Alert message={{ title: 'Error : ',text:error }} />}
        <h1>Sign Up here !</h1>
           <input type="email" placeholder="Enter email Id" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                <input type="password" placeholder="Enter Password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                <Button buttonText="Sign In" onClick={signUpClick} className='signInbutton' />
                <h3>Already have an account ? 
                <Link to="/"> Sign In </Link> here
                </h3>
        </div>
     </>
    )
}
export default SignUp;