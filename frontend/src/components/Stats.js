import React from 'react'

function Stats() {
    return (
        <>
          <section className="stats">
            <div className="">
                <div className="grid grid-3 text-center my-5">
                    <div data-aos="zoom-in">
                        <i className="fas fa-layer-group fa-4x"></i>

                        <h3>9,349,405</h3>
                        <p className="text-secondary">
                            des produits
                        </p>
                    </div>

                    <div data-aos="zoom-in">
                        <i className="fas fa-shopping-basket fa-4x"></i>

                        <h3>987</h3>
                        <p className="text-secondary">
                            supermarches
                        </p>
                    </div>

                    <div data-aos="zoom-in">
                        <i className="fas fa-users fa-4x"></i>

                        <h3>343,265</h3>
                        <p className="text-secondary">
                            utilisateurs satisfaits
                        </p>
                    </div>
                </div>
            </div>
            </section>  
        </>
    )
}

export default Stats
