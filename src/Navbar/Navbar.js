import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Navbar/Navbar.css';

const NavBar = () => {

    let navigate = useNavigate();
    const [token, setToken] = useState();
    const [navBar, setNavBar] = useState(1);
    function handleLogout() {
        setNavBar(0);
        navigate('/login', setToken(token));
    }
    if(navBar === 1){
        return (
            <div>
                <ul id="menu-list">
                    <li><Link to="/">Home</Link></li>
                    <li onClick={handleLogout}>Logout</li>
                </ul>
                <hr />
            </div>
        );
    }
};

export default NavBar;