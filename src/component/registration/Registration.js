import React, { useContext, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import validation from '../../lib/validation';
import './registration.css';
import { FirebaseContext } from '../../context/FirebaseProvider';
import Navbar from '../navbar/Navbar';

const Registration = () => {

    const [registrationData, setRegistrationData] = useState({});
    const [registrationError, setRegistrationError] = useState({});
    const { emailValidation, passwordValidation } = validation();
    const { registration, googleSignIn } = useContext(FirebaseContext);
    const navigate = useNavigate();
    const location = useLocation();

    const handleInput = (e) => {
        const field = e.target.name;
        const value = e.target.value;
        const newRegistrationData = { ...registrationData };
        newRegistrationData[field] = value;
        setRegistrationData(newRegistrationData);
    }

    const handleRegistrationInput = (e) => {
        e.preventDefault();
        setRegistrationError({})

        if (emailValidation(registrationData.email)) {
            if (passwordValidation(registrationData.password)) {
                if (registrationData.password === registrationData.confirmPassword) {
                    registration(registrationData, navigate, location);
                    setRegistrationError({});
                    e.target.reset();
                }
                else {
                    setRegistrationError({
                        ...registrationError,
                        passwordMatchError: "Password And Confirm Password Not Match",
                    });
                }
            }
            else {
                setRegistrationError({
                    ...registrationError,
                    passwordError: "please Provide A Valid Password",
                });
            }
        }
        else {
            setRegistrationError({
                ...registrationError,
                emailError: "please Provide A Valid Email Address",
            });
        }
    }

    return (
        <>
            <Navbar />
            <section id="registration-page">
                <div className="registration-page-container">
                    <div className="registration-page-title">

                        <h6>Create An Acount</h6>
                    </div>
                    <form id="registration-form" onSubmit={handleRegistrationInput}>
                        <div className="registration-form-design">
                            <div className="single-registration-input-area">
                                <label htmlFor="name">Your Name</label>
                                <input type="text" placeholder="Enter Your Name" id="name" name="name" onInput={handleInput} required />
                            </div>
                            <div className="single-registration-input-area">
                                <label htmlFor="email">Your Email</label>
                                <input type="email" placeholder='Enter Your Email Address' name="email" id="email" onInput={handleInput} required />
                                {
                                    registrationError.emailError &&
                                    <small>{registrationError.emailError}</small>
                                }
                            </div>
                        </div>
                        <div className="registration-form-design">
                            <div className="single-registration-input-area">
                                <label htmlFor="mobileNumber">your Mobile Number</label>
                                <input type="number" placeholder="Enter your Mobile Number" name="mobileNumber" id="mobileNumber" onInput={handleInput} required />
                            </div>
                            <div className="single-registration-input-area">
                                <label htmlFor="city">Your City</label>
                                <input type="text" placeholder="Enter Your City Name" name="city" id="city" onInput={handleInput} />
                            </div>
                        </div>
                        <div className="registration-form-design">
                            <div className="single-registration-input-area">
                                <label htmlFor="Passowrd">Your Pasword</label>
                                <input type="password" placeholder="Enter Your Password" name="password" id="Passowrd" onInput={handleInput} required />
                                {
                                    registrationError.passwordError &&
                                    <small>{registrationError.passwordError}</small>
                                }
                            </div>
                            <div className="single-registration-input-area">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input type="password" placeholder="Confirm Your Password" name="confirmPassword" id="confirmPassword" onInput={handleInput} />
                                {
                                    registrationError.passwordMatchError &&
                                    <small>{registrationError.passwordMatchError}</small>
                                }
                            </div>
                        </div>
                        <div className="registration-form-design">
                            <input type="submit" className='btn btn-outline-primary px-4' value="Sign Up" id="registration-btn" />
                        </div>
                    </form>
                    <div className="other-registration-options-section">

                        <div className="other-registration-options">
                            <div onClick={() => googleSignIn(navigate, location)}>  <button className='btn btn-outline-dark'>
                                <img src="images/google.png" alt="Google" /> <span>Sign in with google</span>
                            </button>
                            </div>

                        </div>
                    </div>
                    <div className="registration-to-login">
                        <small>Already Have An Acount<NavLink to="/login">Log In?</NavLink></small>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Registration;