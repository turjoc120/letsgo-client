import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FirebaseContext } from '../../context/FirebaseProvider';
import validation from '../../lib/validation';
import Navbar from '../navbar/Navbar';
import './loginForm.css';


const LoginForm = () => {

    const [loginData, setLoginData] = useState({})
    const [loginError, setLoginError] = useState({});
    const { emailValidation, passwordValidation } = validation();
    const { login, googleSignIn } = useContext(FirebaseContext);
    const navigate = useNavigate()
    const location = useLocation();

    const handleInput = (e) => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData);
    }

    const handleLoginForm = (e) => {
        e.preventDefault();
        setLoginError({});
        if (emailValidation(loginData.email)) {
            if (passwordValidation(loginData.password)) {
                login(loginData, navigate, location);
                e.target.reset();
            }
            else {
                setLoginError({
                    ...loginError,
                    passwordError: "Please Provide a valid Password",
                });
                return;
            }
        }
        else {
            setLoginError({
                ...loginError,
                emailError: "Please Provide a valid E-mail Address",
            });
            return;
        }
    }

    return (
        <>
            <Navbar />
            <section id="login-page">
                <div className="container-fluid">
                    <div className="login-page-container">
                        <div className="login-page-image">
                            <img src="images/login.png" alt="Login Thumbnail" />
                        </div>
                        <div className="login-form-section">
                            <div className="login-form-title">

                                <h3>Login To Continue</h3>
                                <form onSubmit={handleLoginForm}>
                                    <div className="login-form-design">
                                        <label htmlFor="email">Your Email</label>
                                        <input type="email" placeholder="Enter Your Email Address" id="email" name="email" onInput={handleInput} required />
                                        {
                                            loginError.emailError &&
                                            <small>{loginError.emailError}</small>
                                        }
                                    </div>
                                    <div className="login-form-design">
                                        <label htmlFor="password">Your Password</label>
                                        <input type="password" placeholder="Enter your password" id="password" name="password" onInput={handleInput} required />
                                        {
                                            loginError.passwordError &&
                                            <small>{loginError.passwordError}</small>
                                        }
                                    </div>
                                    <div className="login-form-submit-btn-and-other">
                                        <input type="submit" className='btn btn-outline-primary px-3 ' value="Login" />
                                        <small>Forget Password ?</small>
                                    </div>
                                    <div className="other-login-option-section">

                                        <div className="other-login-options">
                                            <div onClick={() => googleSignIn(navigate, location)}>
                                                <button className='btn btn-outline-dark'>
                                                    <img src="images/google.png" alt="Google" /> <span>Sign in with google</span>
                                                </button>
                                            </div>

                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default LoginForm;