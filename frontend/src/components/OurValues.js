import React from 'react';
import {Link} from 'react-router-dom';

function OurValues() {
    return (
        <>
            <section className="our-values-section text-center">
                <h2 className="md"><i className="fas fa-heart"></i>   Nos Valeurs</h2>
                
                <div className="our-values grid">
                    <p className="value card" data-aos="fade-down">
                        <span className="lead">
                            Tout le monde a les droits d'être conseillé d'une forme gratuite sur une alimentation équilibrée 
                        </span>              
                    </p>
                    <p className="value card" data-aos="zoom-in">
                        <span className="lead">
                            Tout le monde a les droits d'être conseillé d'une forme gratuite sur une alimentation équilibrée                 
                        </span>
                    </p>
                    <p className="value card" data-aos="zoom-in">
                        <span className="lead">
                            Nous informons. Nous n'imposons pas nos idées et nos préférences sur les produits.                
                        </span>
                    </p>
                    <p className="value card" data-aos="fade-down">
                        <span className="lead">
                            Notre intention n'est pas de vous obséder mais de vous informer. La vie doit aussi être appréciée.
                        </span>                
                    </p>
                </div>
            </section>
            <section className="about-end text-center md">
                <Link to="/register">Commencez maintenant</Link>
            </section>
        </>
    )
}

export default OurValues
