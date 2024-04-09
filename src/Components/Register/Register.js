import React from 'react';
import Navbar from '../Navbar/Navbar';
import { useForm } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';

const Register = () => {
    const {register,handleSubmit,watch,formState: { errors },} = useForm()
    const onSubmit = (data) => {
        // Encrypt the password before sending it
        const encryptedPassword = CryptoJS.SHA256(data.password).toString();
        registerUser(data.name, data.image, data.email, encryptedPassword);
        localStorage.setItem('userCredentials', JSON.stringify({name:data.name, email: data.email, image: data.image, password: encryptedPassword}));
    };

    const {registerUser,user,  error} = useAuth();
    let navigate = useNavigate();
    let location = useLocation();

    let from = location?.state?.from?.pathname || "/codes"; 

    user.email && navigate(from , {replace: true}); 
    return (
        <div className="bg-brand bg-brand-container">
            <Navbar/>
            <h1 style={{color: "#ec5990"}}  className="fs-4 text-center mt-5">Register</h1>
            <div className="container mt-5">
                <div className="col-md-6 col-md-8 mx-auto d-block">
                    
                    <form onSubmit={handleSubmit(onSubmit)}>

                            <div className="mb-3">
                                <label style={{color: "#ec5990"}} htmlFor="email" className="form-label">Name</label>
                                <input style={{backgroundColor:"#0f111b", color:"#ec5990"}} type="text" className="form-control p-2" id="name" aria-describedby="name" {...register("name", { required: true })}/>
                                {errors.email && <span style={{color: "#bf1650"}}>Name is required</span>}
                            </div>

                            <div className="mb-3">
                                <label style={{color: "#ec5990"}} htmlFor="image" className="form-label">Profile picture URL</label>
                                <input style={{backgroundColor:"#0f111b", color:"#ec5990"}} type="text" className="form-control p-2" id="image" aria-describedby="image" {...register("image", { required: true })}/>
                                {errors.email && <span style={{color: "#bf1650"}}>Image is required</span>}
                            </div>


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
                        
                            <input className="button-pink" type="submit" value="Register"/>
                            <div style={{color: "#ec5990"}} id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>

                            <div className="my-4">
                                <p tyle={{color: "#ec5990"}}>Already have an account? <Link to="/" className="text-primary text-decoration-underline">Login to your account!</Link></p>
                            </div>
                        </form>
                </div>
            </div>
            
        </div>
    );
};

export default Register;