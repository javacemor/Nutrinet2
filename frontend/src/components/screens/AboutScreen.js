import React from 'react'
import Footer from '../Footer'
import Navbar from '../Navbar'
import OurValues from '../OurValues'
import Stats from '../Stats'

function AboutScreen() {
    return (
        <>
            <Navbar />
            <section className="showcase">
                <div className="container grid">
                    <div className="showcase-text">
                        <h1>The Nutrinet. </h1>
                        <p>
                            <p> Notre service consiste à faciliter l'experience quotidien de faire l'achat dans le supermarché.</p> 
                            <p>L´objectif final pour ce projet est de réduire l'ignorance et le manque de culture existant en matière de nutrition.</p> 
                            <p>Tout le monde doit avoir accés á une alimentation équilibrée et de forme gratuite.</p>
                        </p>
                    </div>

                    <div className="showcase-form card">
                        <h2>Commencez a suivre votre nutrition</h2>
                        <form>
                            <div className="form-control">
                                <input type="text" name="name" required />
                                <span>votre nom</span>
                            </div>

                            <div className="form-control">
                                <input type="text" name="email" required />
                                <span>votre adresse email</span>
                            </div>
                            
                            <div className="form-control">
                                <input type="password" name="password" required />
                                <span>mot de passe</span>
                            </div>

                            <input type="submit" value="Commencez maintenant" className="btn btn-primary" />
                        </form>
                    </div>
                </div>
            </section>

            <Stats />
            <OurValues />
            <Footer />
        </>
    )
}

export default AboutScreen;
