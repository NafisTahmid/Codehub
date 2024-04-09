import userEvent from '@testing-library/user-event';
import React from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';

const Navbar = () => {
  const {user} = useAuth();
    return (
        <nav style={{backgroundColor: '#0e101c'}} className="navbar bg-dark navbar-expand-lg bg-body-tertiary customize-navbar sticky-top" data-bs-theme="dark">
        <div className="container-fluid">
            <a  style={{color: "#ec5990"}} className="navbar-brand" href="/">M's CodeHub</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">

              <div className="navbar-nav ms-auto text-center">

                  {
                    !user.email && <NavLink style={{color: "#ec5990"}} className="nav-link px-3" to="/" href="/">Home</NavLink>
                  }

                  {
                    user.email &&  <NavLink style={{color: "#ec5990"}} className="nav-link px-3" to="/profile" href="/">Profile</NavLink>
                  }
                  {
                    user.email &&   <NavLink style={{color: "#ec5990"}} className="nav-link px-3" to="/codes" href="/">Codes</NavLink>
                  }
                  
              </div>
              
            </div>
        </div>
      </nav>
    );
};

export default Navbar;