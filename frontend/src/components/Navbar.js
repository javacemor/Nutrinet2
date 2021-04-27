import React, { useState, useEffect} from 'react';
import { useCookies } from 'react-cookie';
import {Link, useHistory} from 'react-router-dom';

function Navbar() {
    const [token, setToken, removeToken] = useCookies(['loggedIn']);
    const [hamburgerMode, setHamburgerMode] = useState(false);
    const [LoggedIn, setLoggedIn] = useState(false);

    let history = useHistory();
    useEffect(() => {
        if (token['loggedIn']){
            setLoggedIn(true);
        }else{
            setLoggedIn(false);
        }
    }, [token]);
    return (
        <>
            <section className="before-nav p-1">
                <h1>The Nutrinet</h1>
            </section>

            <header>
                <nav>
                    <div className="hamburger" onClick={() => setHamburgerMode(!hamburgerMode)}>
                        <div className="line"></div>
                        <div className="line"></div>
                        <div className="line"></div>
                    </div>
                    <ul className={`nav-links ${hamburgerMode ? 'open' : null}`}>
                        <li className="nav-item active" data-aos='#'><Link to="/"> <i className="fa fa-home fa-1x"></i> </Link></li>
                        <li className="nav-item" data-aos='#'><Link to="#"> Blog </Link></li>
                        <li className="nav-item" data-aos='#'><Link to="/contact"> Contact </Link></li>
                        <li className="nav-item" data-aos='#'><Link to="/about"> About </Link></li>
                        {
                            LoggedIn &&  <li className="nav-item" data-aos='#'><Link to="/dashboard"> Dashboard </Link></li>
                        }
                        {
                            LoggedIn ? <li className="nav-item" data-aos='#' onClick={() => removeToken('loggedIn')}><Link to="#"> Logout </Link></li> : <li className="nav-item" data-aos='#'><Link to="/register"> Login </Link></li> 
                        }
                        {
                            !LoggedIn && <li className="nav-item" data-aos='#'><Link to="/register"> S'enregistrer </Link></li>
                        }
                    </ul>
                </nav>
            </header>
        </>
    )
}

export default Navbar
