import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import Footer from '../Footer'
import Navbar from '../Navbar'

import { useCookies } from 'react-cookie';

function RegisterScreen() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [registrationUsername, setRegistrationUsername] = useState('');
    const [registrationEmail, setRegistrationEmail] = useState('');
    const [registrationPassword, setRegistrationPassword] = useState('');
    const [registrationPasswordConfirm, setRegistrationPasswordConfirm] = useState('');
    const [regsiterView, setRegisterView] = useState(false);
    const [token, setToken] = useCookies(['loggedIn']);
    const [tokenReg, setTokenReg] = useCookies(['loggedIn']);

    let history = useHistory();

    useEffect(() => {
        if (token['loggedIn']){
            history.push('/dashboard')
        }
    }, [token])

    const handleLogin = (e) =>{
        e.preventDefault();

        fetch('api/users/auth', {
            'method': 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, password})
        })
        .then(response => response.json())
        .then(response => {
            if (!response['token']){
                alert('Incorrect credentials provided')
                return false;
            }
            setToken('loggedIn', response.token)
            history.push('/dashboard')
        })
        .catch(error => alert(error))
    }
    
    const handleRegisterUser = (e) =>{
        e.preventDefault();
        if (registrationPasswordConfirm !== registrationPassword){
            alert('Password Fields do not match');
            return false;
        }
        fetch('api/users/', {
            'method': 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email:registrationEmail, password:registrationPassword, username: registrationUsername})
        })
        .then(response => response.json())
        .then(response => {
            let ID = response['id'];
            if (!ID){
                console.log(response);
                // alert(response['username'][0]);
            }else{
                fetch('api/users/auth', {
                    'method': 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({username:registrationUsername, password:registrationPassword})
                })
                .then(response => response.json())
                .then(response => setTokenReg('loggedIn', response.token))
                .then(response => history.push('/welcome'))
                .catch(error => alert(error))
            }
        })
        .catch(error => alert(error))
    }
    return (
        <>
            <Navbar />
            <section className="registeration-body">
                <div className={`container-register ${regsiterView && 'right-panel-active'}`} id="container">
                    <div className="form-container sign-up-container">
                        <form onSubmit={handleRegisterUser}>
                            <h1>Create An Account</h1>
                            {/* <div className="social-container">
                                <a href="#" className="social-register"><i className="fab fa-facebook-f"></i></a>
                                <a href="#" className="socila-register"><i className="fab fa-google-plus-g"></i></a>
                                <a href="#" className="socila-register"><i className="fab fa-linkedin-in"></i></a>
                            </div>
                            <span>or use your email for registration</span> */}
                            <input type="text" placeholder="Username" value={registrationUsername} onChange={(e) => {setRegistrationUsername(e.target.value)}} />
                            <input type="email" placeholder="Email" value={registrationEmail} onChange={(e) => {setRegistrationEmail(e.target.value)}} />
                            <input type="password" placeholder="Password" value={registrationPassword} onChange={(e) => {setRegistrationPassword(e.target.value)}} />
                            <input type="password" placeholder="Confirm Password" value={registrationPasswordConfirm} onChange={(e) => {setRegistrationPasswordConfirm(e.target.value)}} />
                            <button className="reg-btn" type='submit'>Sign Up</button>
                        </form>
                    </div>
                    <div className="form-container sign-in-container">
                        <form>
                            <h1>Sign in</h1>
                            {/* <div className="social-container">
                                <a href="#" className="social-register"><i className="fab fa-facebook-f"></i></a>
                                <a href="#" className="socila-register"><i className="fab fa-google-plus-g"></i></a>
                                <a href="#" className="socila-register"><i className="fab fa-linkedin-in"></i></a>
                            </div>
                            <span>or use your account</span> */}
                            <input type="text" placeholder="Username" value={username} onChange={(e) => {setUsername(e.target.value)}} />
                            <input type="password" placeholder="Password" value={password} onChange={(e) => {setPassword(e.target.value)}} />
                            <a href="#" className="forgot-password"> Mot de passe oublie?</a>
                            <button className="reg-btn" onClick={handleLogin}>Sign In</button>
                        </form>
                    </div>
                    <div className="overlay-container">
                        <div className="overlay-register">
                            <div className="overlay-panel overlay-left">
                                <h1>Nous saluons le retour!</h1>
                                <p className="m-3">
                                    connectez-vous pour continuer a obtenir des informations precieuses sur vos
                                    routines alimentaires
                                </p>
                                <button id="signIn" className="reg-btn ghost" onClick={() => setRegisterView(false)}>Log In</button>
                            </div>
                            <div className="overlay-panel overlay-right">
                                <h1 className="md">The Nutrinet.</h1>
                                <p className="lead my-2">inscrivez-vous pour commencer avec The Nutrinet</p>
                                <button className="reg-btn ghost" id="signUp" onClick={() => setRegisterView(true)}> Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>  

            <Footer />
        </>
    )
}

export default RegisterScreen
