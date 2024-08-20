import React, { useState } from 'react';
import './Login.css';
import assets from '../../assets/assets';
import { signup,login,resetPass  } from '../../config/firebase';

const Login = () => {
    const [currState, setCurrState] = useState("Sign Up");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            if (currState === "Sign Up") {
                await signup(userName, email, password);
                setError(""); // Clear any previous errors
                // You may redirect or show a success message
            }
            else{
              login(email,password)
            }
        } catch (error) {
            console.error("Sign up failed: ", error.message);
            setError(error.message); // Set the error message to display to the user
        }
    };

    return (
        <div className='login'>
            <img src={assets.logo_big} alt='' className='logo' />
            <form onSubmit={onSubmitHandler} className='login-form'>
                <h2>{currState}</h2>
                {error && <p className='error'>{error}</p>}
                {currState === "Sign Up" &&
                    <input
                        onChange={(e) => setUserName(e.target.value)}
                        value={userName}
                        type='text'
                        placeholder='Username'
                        className='form-input'
                        required
                    />
                }
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type='email'
                    placeholder='Email address'
                    className='form-input'
                    required
                />
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type='password'
                    placeholder='Password'
                    className='form-input'
                    required
                />
                <button type='submit'>
                    {currState === "Sign Up" ? "Create account" : "Login now"}
                </button>
                <div className='login-term'>
                    <input type='checkbox' />
                    <p>Agree to the terms of use & privacy policy.</p>
                </div>
                <div className='login-forget'>
                    {currState === "Sign Up"
                        ? <p className='login-toggle'>
                            Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span>
                        </p>
                        : <p className='login-toggle'>
                            Create an account? <span onClick={() => setCurrState("Sign Up")}>Click here</span>
                        </p>
                    }
                    {currState=== "Login"?  <p className='login-toggle'>
                        Forgot Password? <span onClick={() => resetPass(email)}>reset here</span>
                    </p>:null}
                </div>
            </form>
        </div>
    );
};

export default Login;
