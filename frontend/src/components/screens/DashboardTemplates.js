import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import { useCookies } from 'react-cookie';

import Navbar from '../Navbar'

function DashboardTemplates({section}) {
    const [token, setToken, removeToken] = useCookies(['loggedIn']);
    const [username, setUsername] = useState('');

    const handleLogout = () =>{
        removeToken('loggedIn');
    }
    fetch(`api/users/get_username/${token['loggedIn']}`)
        .then(res => {
            if(!res.ok){
                throw Error('could not fetch data from the endpoint');
            }
            return res.json();
        })
        .then(data => {
            console.log('consoling...', data);
            setUsername(data);
        })
        .catch(err =>{
            if (err.name === 'AbortError'){
                console.log('fetch aborted');
            }else{
                console.log(err);
            }
        });

    let history = useHistory();
    useEffect(() => {
        if (!token['loggedIn']){
            history.push('/register')
        }
    });

    return (
        <>
            <input type="checkbox" id="nav-toggle" />
            <div className="sidebar">
                <div className="sidebar-brand">
                    <h2>
                        <span>The Nutrinet</span>
                    </h2>
                </div>

                <div className="sidebar-menu">
                    <ul>
                        <li className="nav-item">
                            <Link to="/dashboard" className={section === 'dashboard' && "active-sidebar"}>
                                <span className="fas fa-tachometer-alt"></span>
                                <span>Dashboard</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/products" className={section === 'products' && "active-sidebar"}>
                                <span className="fas fa-eye"></span>
                                <span>View All Products</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/account_settings" className={section === 'account_settings' && "active-sidebar"}>
                                <span className="fas fa-user-cog"></span>
                                <span>Account Settings</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="#" onClick={handleLogout}>
                                <span className="fas fa-sign-out-alt"></span>
                                <span>Log out</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="main-content">
                <header className="sidebar-header">
                    <h2>
                        <label for="nav-toggle">
                            <span className="fas fa-bars"></span>
                        </label>

                        <Link to="/" className="ml-2">
                            <span className="fas fa-home"></span>
                            <span>Home</span>
                        </Link>
                    </h2>
                    <div className="search-wrapper">
                        <span className="fas fa-search"></span>
                        <input type="search" name="search" placeholder="search products..." />
                    </div>
                    <div className="user-wrapper">
                        {/* <img src="./assets/images/user1.png" width="40px" height="40px" alt="" /> */}
                        <div>
                            <h4>Welcome, {username}</h4>
                        </div>
                    </div>
                </header>
            </div>
        </>
    )
}

export default DashboardTemplates;
