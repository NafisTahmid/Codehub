import React from 'react';
import Navbar from '../Navbar/Navbar';
import '../../App.css';
import './Home.css';
import googleImage from '../../images/google.png';
import facebookImage from '../../images/facebook.png';
import githubImage from '../../images/github.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from "react-hook-form"
import useAuth from '../../Hooks/useAuth';
import CryptoJS from 'crypto-js';

const Home = () => {
    const {register,handleSubmit,watch,formState: { errors },} = useForm()
      const onSubmit = (data) => {
         // Encrypt the password before sending it
         const encryptedPassword = CryptoJS.SHA256(data.password).toString();

        login(data.email, encryptedPassword)
        localStorage.setItem('userLoginCredentials', JSON.stringify({email: data.email, password: encryptedPassword}));
    };

      const location = useLocation();
      const navigate = useNavigate();

      let from = location?.state?.from?.pathname || "/codes"; 
      const {user, error, login, signInWithGoogle, signInWithGithub} = useAuth();

      user.email && navigate(from, {replace:true});

    return (
        <div className="bg-brand bg-brand-container">
            <Navbar/>
            <h1  style={{color: "#ec5990"}} className="fs-4 text-center mt-5">Mridul's Code Book</h1>

            <div className="container">
                <div className="col-md-6 col-sm-8 mx-auto d-block">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                            <label style={{color: "#ec5990"}} htmlFor="email" className="form-label">Email address</label>
                            <input style={{backgroundColor:"#0f111b", color:"#ec5990"}} type="email" className="form-control p-2" id="email" aria-describedby="email" {...register("email", { required: true })}/>
                            {errors.email && <span style={{color: "#bf1650"}}>Email is required</span>}
                        </div>
                        <div className="mb-3">
                            <label style={{color: "#ec5990"}} htmlFor="password" className="form-label">Password</label>
                            <input style={{backgroundColor:"#0f111b", color:"#ec5990"}} type="password" className="form-control p-2" id="password"  {...register("password", { required: true })}/>
                            {errors.email && <span style={{color: "#bf1650"}}>Password is required</span>}
                        </div>
                    
                        <input className="button-pink" type="submit" value="Sign In"/>
                        <div style={{color: "#ec5990"}} id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </form>

                    <div className="my-4">
                        <p tyle={{color: "#ec5990"}}>Don't have an account? <Link to="/register" className="text-primary text-decoration-underline">Register as a new user!</Link></p>
                    </div>
                </div>

                <div className="d-flex justify-content-center align-items-center mt-4">
                    <div style={{color: "#ec5990"}} className="col-sm-2">
                        <hr/>
                    </div>
                    <p style={{color: "#ec5990"}} className="pt-3 px-2">Or login with</p>
                    <div style={{color: "#ec5990"}} className="col-sm-2">
                        <hr />
                    </div>
                </div>

                <div className="d-flex justify-content-center align-items-center">
                      
                        <button onClick={signInWithGoogle}  style={{backgroundColor:"#0e101c", border: "none", outline: "none"}} className="d-flex justify-content-center align-items-center mx-2">
                            <img src={googleImage} className="img-fluid mx-1" width={43} alt="" />
                            <p className="pt-4" style={{color: "#ec5990"}}>Google</p>
                        </button>
               

                        <button style={{backgroundColor:"#0e101c", border: "none", outline: "none"}} className="d-flex justify-content-center align-items-center mx-2 mt-2">
                            <img src={facebookImage} className="img-fluid mx-2" width={32} alt="" />
                            <p className="pt-3" style={{color: "#ec5990"}}>Facebook</p>
                        </button>

                        <button onClick={signInWithGithub} style={{backgroundColor:"#0e101c", border: "none", outline: "none"}} className="d-flex justify-content-center align-items-center mx-2">
                            <img src={githubImage} className="img-fluid mx-1" width={43} alt="" />
                            <p className="pt-4" style={{color: "#ec5990"}}>Github</p>
                        </button>
                </div>
            </div>
            
        </div>
    );
};

export default Home;