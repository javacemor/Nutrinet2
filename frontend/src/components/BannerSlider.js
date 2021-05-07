import {Link} from 'react-router-dom';
import React from 'react';
import bgImage from '../images/bg1.jpg';

function BannerSlider() {
    return (
        <>
            <section>
                <div className="banner">
                    <div className="slider">
                        <img src={bgImage} id="slideImg" alt=""/>
                    </div>
                    <div className="overlay">
                        <div className="content flex">
                            <h2>
                                Faites vos courses avec conscience
                            </h2>
                            <p>
                                Bien manger n'a jamais e`te` aussi simple
                            </p>
            
                            <div className="banner-buttons mt-2">
                                <Link to="/register" className="header-btn"><i className="fas fa-user-plus"></i> S'enregistrer</Link>
                                <Link to="#" onclick="togglePlay();" className="header-btn"> <i className="fas fa-eye"></i> Voir Demo </Link>
                            </div>
                        </div>
                    </div>

                    {/* <div className={`${trailerClass ? 'trailer' : null}`}>
                        <video className="video" src="./assets/images/vid.mp4" controls={true}></video>
                        <img src="./assets/images/close.png" className="close-bgvideo" onclick={togglePlay} alt="" />
                    </div> */}
                </div>
            </section>
        </>
    )
}

export default BannerSlider
