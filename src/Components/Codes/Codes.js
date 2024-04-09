import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import useAuth from '../../Hooks/useAuth';
import modon from '../../images/Image 1.jpg';
import products from '../../Data/productsData.json';
import '../../App.css';

const Codes = () => {
    const {user, logOut} = useAuth();
    const {displayName, photoURL, email} = user;
    const [likes, setLikes] = useState(() => {
        const storedLikes = localStorage.getItem('likes');
        return storedLikes ? JSON.parse(storedLikes) : {};
    })

    const incrementLike = (productId) => {
        setLikes(prevLikes => {
            // Calculate the new like count
            const newLikes = {
                ...prevLikes,
                [productId]: (prevLikes[productId] || 0) + 1
            };
            
            // Update localStorage with the new like count
            localStorage.setItem('likes', JSON.stringify(newLikes));
            
            // Return the new state
            return newLikes;
        });
    };
    

    // A function to decrement the like count for a product
    const decrementLike = (productId) => {
        setLikes(prevLikes => {
            const currentLikes = prevLikes[productId] || 0;
            const newLikesCount = (currentLikes > 0) ? currentLikes - 1 : 0;
            // Calculate the new like count
            const newLikes = {
                ...prevLikes,
                [productId]: newLikesCount
                
            };
            
            // Update localStorage with the new like count
            localStorage.setItem('likes', JSON.stringify(newLikes));
            
            // Return the new state
            return newLikes;
        });
    };
    return (
        <section className="bg-brand bg-brand-container">
            <Navbar/>
            <div className="container-fluid">
                <h3 style={{color: "#ec5990"}} className="ms-3 pt-5 text-center">Mridul</h3>
                <div className="d-flex my-5">
                    <img style={{borderRadius: "40px"}} src={modon} className="img-fluid " width={120} alt="" />

                    <div className="">
                        <h4 style={{color: "#ec5990"}} className="fs-5 pt-5 ps-3">FRONT END DEVELOPER | MACHINE LEARNING ENGINEER</h4>
                        <h5 className="fs-6 ps-3"><a className="text-primary text-decoration-none" href="https://www.hackerrank.com/profile/nafistahmid4" target="_blank" rel="noreferrer">Hackerrank Profile</a></h5>
                        <h5 className="fs-6 ps-3"><a className="text-primary text-decoration-none" href="https://github.com/NafisTahmid" target="_blank" rel="noreferrer">Github</a></h5>
                        <h5 className="fs-6 ps-3"><a className="text-primary text-decoration-none"  href="https://github.com/NafisTahmid" target="_blank" rel="noreferrer">Linked In</a></h5>
                    </div>
                </div>

                {/* Projects section */}
                <h3 style={{color: "#ec5990"}} className="my-2 mb-3">Few Projects</h3>
                <div className="row products-container justify-content-center align-items-center">
                    {
                        products.map(product => {
                            return(
                                <div key={product.id} className="cart-deck mb-5 col-lg-3 col-md-5 col-sm-8 mx-3">
                                    <h5 style={{color: "#ec5990"}} className="text-center py-5">{product.name}</h5>
                                    <div className="mb-5" style={{color: "#bf1650"}}>
                                        <hr />
                                    </div>
                                    <div className="">

                                        <ul>
                                            <li style={{color: "#ec5990"}}>{product.point1}</li>
                                            <li style={{color: "#ec5990"}}>{product.point2}</li>
                                            <li style={{color: "#ec5990"}}>{product.point3}</li>
                                        </ul>

                                    </div>
                                    <span className="text-center ps-4"><a className="text-primary text-decoration-underline" href={product.link} target="_blank" rel="noreferrer">Project Link</a></span>
                                    <div>
                                        <hr />
                                    </div>

                                    <div className="justify-content-center align-items-center my-2">

                                        <div className="">
                                            <h6 className="fs-6 text-center text-primary">Total likes: {likes[product.id] || 0}</h6>
                                        </div>
                                       
                                        <div className="d-flex justify-content-center align-items-center">
                                            <button onClick={() => incrementLike(product.id)} className="btn btn-primary mx-1">Like</button>
                                            <button onClick={() => decrementLike(product.id)} className="btn btn-danger mx-1">Dislike</button>
                                        </div>
                                        
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
               
            </div>
        
        </section>
    );
};

export default Codes;