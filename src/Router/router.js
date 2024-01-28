import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from '../component/SignIn/signIn';
import SignUp from '../component/SignUp/signUp';
import Home from '../HomePage/homePage';
import { LinkedInCallback } from 'react-linkedin-login-oauth2';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SignIn />} />
                <Route path="signUp" element={<SignUp />} />
                <Route path="home" element={<Home />} />
                <Route exact path='/linkedin' component={<LinkedInCallback />} />
            </Routes>
        </BrowserRouter>
    )
}
export default Router;