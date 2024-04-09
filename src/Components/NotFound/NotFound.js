import React from 'react';
import Navbar from '../Navbar/Navbar';

const NotFound = () => {
    return (
        <div className="bg-brand bg-brand-container">
            <Navbar/>
            <h1  style={{color: "#ec5990"}}className="fs-4 text-center mt-5">404 NOT FOUND</h1>
        </div>
    );
};

export default NotFound;