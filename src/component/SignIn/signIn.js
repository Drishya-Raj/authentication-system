import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import {auth, provider} from '../../firebase';
import Button from "../button";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import google from '../../assests/images/google.png';
import linkedin from '../../assests/images/linkedIn.png';
import { Alert } from "../../Modal/alert";
import Navbar from "../navbar";
import {useLinkedIn} from 'react-linkedin-login-oauth2';


const SignIn = () => {
    const [value, setValue] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [error, setError] = useState()
    const navigate = useNavigate();

    const handleClick = () =>{
        
        signInWithPopup(auth,provider).then((data)=>{
            value && setValue(data.user.email);
            localStorage.setItem('email',data.user.email)
            navigate('/home');
        }).catch((error) => {
            // Handle sign-in errors
            console.error('Sign-In error:', error.message);
            
        });
    }
    const signInClick = (e)=>{
        e.preventDefault();
        if(email === '' || password === ''){
            setError("email and password cannot be empty");
            setShowAlert(true);
        }
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    setValue(userCredential.user.email);
                    localStorage.setItem('email', userCredential.user.email);
                    navigate('/home');
                })
                .catch((error) => {
                    // Handle sign-in errors
                    console.error('Sign-in error:', error.message);
                    
              });
        };
            
    useEffect(()=>{
        setValue(localStorage.getItem('email'))
    },[])
   
        const { linkedInLogin } = useLinkedIn({
          clientId: '86vhj2q7ukf83q',
          redirectUri: `${window.location.origin}/linkedin`, 
          
          onSuccess: (code) => {
            console.log(code);
            console.log("Redirect URI:", `${window.location.origin}/linkedin`);
          },
          onError: (error) => {
            console.log(error);
            console.log("Redirect URI:", `${window.location.origin}/linkedin`);
          },
        });
   
    return (
        <>
            <Navbar />
            <div className="signIn">
            {showAlert && <Alert message={{ title: 'Error : ', text:error}} />}
            <h1>Sign In</h1>
                <div className="third-party">
                <div className="img-container">
                        <img src={google} alt="google" />
                        </div>
                    <p onClick={handleClick}>Continue with Google</p>
                </div>
                <div className="third-party">
                    <div className="img-container">
                        <img src={linkedin} alt="linkedin" />
                        </div>
                    <p onClick={linkedInLogin}>Continue with LinkedIn</p>
                </div>
                <h3>OR</h3>
                <input type="email" placeholder="Enter email Id" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                <input type="password" placeholder="Enter Password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
                <Button buttonText="Sign In" onClick={signInClick} className='signInbutton' />
                <h3>Not have an account yet ? 
                <Link to="/signUp"> Sign Up </Link> here
                </h3>
            </div>
        </>
    )
}
export default SignIn;