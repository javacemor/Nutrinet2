import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Footer from '../Footer';
import Navbar from '../Navbar';


function WelcomeScreen() {
    let err = false;
    let history = useHistory();
    const [showFirstForm, setShowFirstForm] = useState(true)
    const [showSecondForm, setShowSecondForm] = useState(false)
    const [showThirdForm, setShowThirdForm] = useState(false)

    const [prenom, setPrenom] = useState('')
    const [gender, setGender] = useState('Femme')
    const [famille, setFamille] = useState('')
    const [dob, setDob] = useState('')
    const [exercise, setExercise] = useState('')
    const [height, setHeight] = useState('')
    const [weigth, setWeigth] = useState('')

    const [token, setToken] = useCookies(['loggedIn']);

    useEffect(() => {
        if (!token['loggedIn']){
            history.push('/register')
        }
    })

    const handleFirstNext = () =>{
        if (!prenom){
            alert('Please enter a first name');
            err = true;
        }
        if (!famille){
            alert('Please enter a last name');
            err = true;
        }

        if (err){
            return false;
        }

        setShowFirstForm(false)
        setShowSecondForm(true)
    }
    const handleFirstPrevious = () =>{
        setShowFirstForm(true)
        setShowSecondForm(false)
    }

    const handleSeondNext = () =>{
        if (!gender){
            alert('Please pick a valid gender');
            err = true;
        }
        if (!dob){
            alert('Please pick a Date Of Birth');
            err = true;
        }
        if (!exercise){
            alert('Please pick your exercise routine');
            err = true;
        }

        if (err){
            return false;
        }

        setShowFirstForm(false)
        setShowSecondForm(false)
        setShowThirdForm(true)
    }
    const handleSecondPrevious = () =>{
        setShowFirstForm(false)
        setShowSecondForm(true)
        setShowThirdForm(false)
    }

    const handleFormSubmit = (e) =>{
        if (!height){
            alert('Please enter your height');
            err = true;
        }
        if (!weigth){
            alert('Please enter a weight');
            err = true;
        }
        if (err){
            return false;
        }
        e.preventDefault();

        fetch(`api/users/profile_details/${token['loggedIn']}`, {
            'method': 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token:token['loggedIn'], 
                poids: weigth,
                taille:height,
                date_de_naissance: dob,
                genre: gender,
                activite: exercise,
                prenom:prenom,
                famille:famille
            })
        })
        .then(response => response.json())
        .then(response => console.log(response))
        .then(response => history.push('/dashboard'))
        .catch(error => alert(error))
    }

    return (
        <>
          <Navbar />

          <section className="welcome-body">
        <div className="welcome-container">
            <header>Mon formulaire de profil</header>
            <div className="progress-bar">
                <div className="step">
                    <p className={'active'}>Nom</p>
                    <div className={`bullet ${showSecondForm && 'active'} ${showThirdForm && 'active'}`}>
                        <span>1</span>
                    </div>
                    <div className={`check fas fa-check ${showSecondForm && 'active'} ${showThirdForm && 'active'}`}></div>
                </div>
                <div className="step">
                    <p className={`${showSecondForm && 'active'} ${showThirdForm && 'active'}`}>Info</p>
                    <div className={`bullet ${showThirdForm && 'active'}`}>
                        <span>2</span>
                    </div>
                    <div className={`check fas fa-check ${showThirdForm && 'active'}`}></div>
                </div>
                <div className="step">
                    <p className={showThirdForm && 'active'}>Submit</p>
                    <div className="bullet">
                        <span>3</span>
                    </div>
                    <div className="check fas fa-check"></div>
                </div>
            </div>
            <div className="form-outer">
                <form action="#" onSubmit={handleFormSubmit}>
                    {
                        showFirstForm && 
                        <div className="page slidepage">
                            <div className="field">
                                <div className="label">Prénom</div>
                                <input type="text" value={prenom} onChange={(e) => setPrenom(e.target.value)}/>
                            </div>
                            <div className="field">
                                <div className="label">Nom de famille</div>
                                <input type="text" value={famille} onChange={(e) => setFamille(e.target.value)}/>
                            </div>
                            {/* <div className="field">
                                <div className="label">Adresse e-mail</div>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div> */}
                            <div className="field nextBtn">
                                <button onClick={handleFirstNext}>Next</button>
                            </div>
                        </div>
                    }
    
                    {
                        showSecondForm && 
                        <div className="page">
                            <div className="title">renseignements personnels:</div>
                            <div className="field">
                                <div className="label">Le sexe</div>
                                <select name="" id="" value={gender} onChange={(e) => setGender(e.target.value)}>
                                    <option value="Homme">mâle</option>
                                    <option value="Femme">Femelle</option>
                                    <option value="Femme">select</option>
                                </select>
                            </div>
                            <div className="field">
                                <div className="label">Date de naissance</div>
                                <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
                            </div>
                            <div className="field">
                                <div className="label">niveau d'exercice</div>
                                <select className="form-control" value={exercise} onChange={(e) => setExercise(e.target.value)}>
                                    <option value="None">None</option>
                                    <option value="1 à 3 jours par semaine">1 à 3 jours par semaine</option>
                                    <option value="3 à 5 jours par semaine">3 à 5 jours par semaine</option>
                                    <option value="6 à 7 jours par semaine">6 à 7 jours par semaine</option>
                                    <option value="Deux fois par jour">Deux fois par jour</option>
                                </select>
                            </div>
                            <div className="field btns">
                                <button className="prev-1 prev" onClick={handleFirstPrevious}>Previous</button>
                                <button className="next-1 next" onClick={handleSeondNext}>Next</button>
                            </div>
                        </div>
                    }

                    {
                        showThirdForm && 
                        <div className="page">
                            <div className="title">renseignements personnels:</div>
                            <div className="field">
                                <div className="label">Poids</div>
                                <input type="number" value={weigth} onChange={(e) => setWeigth(e.target.value)} />
                            </div>
                            <div className="field">
                                <div className="label">Height</div>
                                <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} />
                            </div>
                            <div className="field btns">
                                <button className="prev-2 prev" onClick={handleSecondPrevious}>Previous</button>
                                <button className="submit" type='submit'>Submit</button>
                            </div>
                        </div>
                    }
                </form>
            </div>
        </div>
    </section>


          <Footer />  
        </>
    )
}

export default WelcomeScreen
