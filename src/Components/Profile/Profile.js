import React from 'react';
import useAuth from '../../Hooks/useAuth';
import Navbar from '../Navbar/Navbar';

const Profile = () => {
    const {user, logOut} = useAuth();
    const {displayName, name, photoURL, image, email} = user;
    const userDetails = JSON.parse(localStorage.getItem('userCredentials')) ? JSON.parse(localStorage.getItem('userCredentials')) : JSON.parse(localStorage.getItem('userLoginCredentials'));
    return (
        <div className="bg-brand bg-brand-container">
            <Navbar/>
            <h1 style={{color: "#ec5990"}}  className="fs-4 text-center my-5">Profile</h1>
            <div className="container mt-5">

                <h2 style={{color: "#ec5990"}} className="fs-6" >User's information</h2>
                <h3 style={{color: "#ec5990"}} className="fs-6">Name: {displayName}</h3>
                <h3 style={{color: "#ec5990"}} className="fs-6">Email: {email}</h3>
                <img style={{borderRadius: "50px"}} src={photoURL} className="img-fluid" width={130} alt="" />
                <br />

                <button onClick={logOut} className="btn btn-danger my-3">Log Out</button>
            </div>
        </div>
    );
};

export default Profile;