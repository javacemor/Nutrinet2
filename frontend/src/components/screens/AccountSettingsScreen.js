import { useCookies } from 'react-cookie';
import React, { useState, useEffect } from 'react';

import DashboardTemplates from './DashboardTemplates';

function AccountSettingsScreen() {
	const [prenom, setPrenom] = useState('')
    const [gender, setGender] = useState('select')
    const [famille, setFamille] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [dob, setDob] = useState('')
    const [exercise, setExercise] = useState('')
    const [height, setHeight] = useState('')
    const [weigth, setWeigth] = useState('')

    const [token, setToken] = useCookies(['loggedIn']);

	useEffect(() => {
		fetch(`api/users/account_settings/${token['loggedIn']}`)
            .then(response => response.json())
            .then(data => {
				setPrenom(data.user.first_name)
				setFamille(data.user.last_name)
				setUsername(data.user.username)
				setEmail(data.user.email)
				setGender(data.data.genre)
				setDob(data.data.date_de_naissance)
				setExercise(data.data.activite)
				setHeight(data.data.taille)
				setWeigth(data.data.poids)
			})
            .catch(error => console.log(error))
	}, [])
	
	const handleUpdateInfo = (e) =>{
		e.preventDefault();
		fetch(`api/users/account_settings/${token['loggedIn']}`, {
            'method': 'PUT',
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
                famille:famille,
				email:email,
				username:username
            })
        })
        .then(response => response.json())
        .then(response => {
			alert('Updated Successfully');
			window.location.reload()
		})
        .catch(error => console.log(error))
	}
    return (
        <>
            <DashboardTemplates section='account_settings' />
            <div className='main-content'>
                <main className="main-sidebar">
                <div className="cooks-reg-body">		
		<div className="reg-container">
			<div className="reg-title">Edit Account Settings</div>
			<form className="cooks-reg_form">
				<div className="user-details">
					<div className="input-box">
						<span className="details">Username</span>
						<input type="text" name="" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
					</div>
					<div className="input-box">
						<span className="details">Email Address</span>
						<input type="text" name="" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
					</div>
					<div className="input-box">
						<span className="details">Prénom</span>
						<input type="text" name="" placeholder="Prénom" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
					</div>
					<div className="input-box">
						<span className="details">Nom de famille</span>
						<input type="text" name="" placeholder="Nom de famille" value={famille} onChange={(e) => setFamille(e.target.value)} />
					</div>
					<div className="input-box">
						<span className="details">Poids</span>
						<input type="text" name="" placeholder="Poids" value={weigth} onChange={(e) => setWeigth(e.target.value)} />
					</div>	
					<div className="input-box">
						<span className="details">Height</span>
						<input type="text" name="" placeholder="Height" value={height} onChange={(e) => setHeight(e.target.value)} />
					</div>
					<div className="input-box">
						<span className="details">Date de naissance</span>
						<input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
					</div>
					<div className="input-box">
						<span className="details">niveau d'exercice</span>
						<select className="form-control" value={exercise} onChange={(e) => setExercise(e.target.value)}>
							<option value="None">None</option>
							<option value="1 à 3 jours par semaine">1 à 3 jours par semaine</option>
							<option value="3 à 5 jours par semaine">3 à 5 jours par semaine</option>
							<option value="6 à 7 jours par semaine">6 à 7 jours par semaine</option>
							<option value="Deux fois par jour">Deux fois par jour</option>
						</select>
					</div>
					<div className="input-box">
						<span className="details">Gender</span>
						<select name="" id="" value={gender} onChange={(e) => setGender(e.target.value)}>
							<option value="Homme">mâle</option>
							<option value="Femme">Femelle</option>
							{/* <option value="Femme">select</option> */}
						</select>
					</div>
				</div>

				<div className="button" onClick={handleUpdateInfo}>
					<input type="submit" value="Update Info" />
				</div>
			</form>
		</div>
	</div>
                </main>
            </div>
        </>
    )
}

export default AccountSettingsScreen;
