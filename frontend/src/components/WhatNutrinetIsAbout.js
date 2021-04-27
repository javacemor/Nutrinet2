import React from 'react'

function WhatNutrinetIsAbout() {
    return (
        <>
            <div className="what-nutrinet mt-5 mb-3 text-center container">
                <h1>Ce que nous faisons</h1>
            </div>

            <section className="what-we-can-do-for-you container">
                <div className="mb-3">
                    Notre service consiste à faciliter l'experience quotidien de faire l'achat dans le supermarché.
                    L´objectif final pour ce projet est de réduire l'ignorance et le manque de culture existant 
                    en matière de nutrition. Tout le monde doit avoir accés á une alimentation équilibrée et de forme gratuite.
                </div>
                <div className="our-strength grid mb-5" data-aos="fade-down">
                    <img src="images/diet.svg" alt="" />
                    <p>
                        Tout le monde
                        doit avoir accès à une alimentation équilibrée et de forme gratuite.
                    </p>
                </div>
                <div className="our-strength grid mb-5" data-aos="zoom-in">
                    <img src="images/barbecue.svg" alt="" />
                    <p>
                        Dans notre société actuelle, nous sommes de plus en plus conscients des bénéfices
                        d’une bonne alimentation
                    </p>
                </div>
                <div className="our-strength grid mb-5" data-aos="fade-up">
                    <img src="images/statistics.svg" alt="" />
                    <p>
                        Nous utilisons le système de calcul recommandé par l’organisation mondial de la santé pour
                        vous offrir une information précise et adaptée à vos goûts et besoins alimentaires.
                    </p>
                </div>
            </section>  
        </>
    )
}

export default WhatNutrinetIsAbout;
