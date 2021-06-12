import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

function ProductFilters() {
    const [token, setToken] = useCookies(['loggedIn']);

    const [toggleBar1Logic, setToggleBar1Logic] = useState(false);
    const [toggleBar2Logic, setToggleBar2Logic] = useState(false);
    const [toggleBar3Logic, setToggleBar3Logic] = useState(false);

    const [Supermarket, setPreferredSupermarket] = useState('');
    const [weekgro, setSupermarketFrequency] = useState(1);
    const [maxnringredients, setMaxIngredientPerFood] = useState(100);
    const [ingredient, setSpecificIngredientNeeded] = useState('');
    const [maxnradditives, setProductAddictive] = useState(100);
    const [nova_group, setNovaGroup] = useState(0);
    const [nutriscore_grade, setNutriscoreGrade] = useState('a');
    const [NOsatfats, setSaturatedFood] = useState(false);
    const [NOtransfats, setTransFatFood] = useState(false);
    const [lowsugar, setLowSugar] = useState(false);
    const [lowsalt, setLowSalt] = useState(false);
    const [highfiber, setHighFiber] = useState(false);
    const [lowcarbo, setLowCarb] = useState(false);
    const [highcarbo, setHighCarb] = useState(false);
    const [brand, setPreferredBrand] = useState('');
    const [NObrand, setBoycottBrand] = useState('');
    const [origin, setPreferredOrigin] = useState('');
    const [NOorigin, setboycottOrigin] = useState('');
    const [NOpackaging, setNoPacking] = useState('');

    useEffect(() => {
        fetch(`api/products/my_product_filters/${token['loggedIn']}`)
            .then(res => {
                if(!res.ok){
                    throw Error('could not fetch data from the endpoint');
                }
                return res.json();
            })
            .then(data => {
                setPreferredSupermarket(data.personFilter.Supermarket);
                setSupermarketFrequency(data.personFilter.weekgro);
                setNovaGroup(data.personFilter.nova_group);
                setNutriscoreGrade(data.personFilter.nutriscore_grade);
                setPreferredBrand(data.personFilter.brand);
            })
            .catch(err =>{
                if (err.name === 'AbortError'){
                    console.log('fetch aborted');
                }else{
                    console.log('an error occured')
                }
            });
        }, [])

    const handleSubmit = (e) =>{
        e.preventDefault();

        fetch(`api/products/my_product_filters/${token['loggedIn']}`, {
            'method': 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                weekgro,
                maxnringredients,
                Supermarket,
                maxnradditives,
                nova_group,
                nutriscore_grade,
                NOsatfats,
                NOtransfats,
                lowsugar,
                lowsalt,
                highfiber,
                lowcarbo,
                highcarbo,
                brand,
                NObrand,
                origin,
                NOorigin,
                NOpackaging,
            })
        })
        .then(response => response.json())
        .then(response => window.location.reload())
        .catch(error => console.log(error))
    }

    const toggleBar1 = () =>{
        setToggleBar1Logic(!toggleBar1Logic);
    }
    const toggleBar2 = () =>{
        setToggleBar2Logic(!toggleBar2Logic);
    }
    const toggleBar3 = () =>{
        setToggleBar3Logic(!toggleBar3Logic);
    }

    return (
        <>
          <div className="filters-section">
                    <form onSubmit={handleSubmit}>
                    <h2> <i className="fas fa-filter"></i> Filters</h2>
                    <section className="accordion-section">
                     <div className="dashboard-accordion">
                         <div className={`content-box ${toggleBar1Logic && "active"}`}>
                             <div className="accordion-label" onClick={toggleBar1}><i className="fas fa-shopping-basket"></i> Supermarche</div>
                             <div className="accordion-content">
                                 <div>
                                     <div className="icon">
                                        <div className="tooltip"> Name of preferred supermarket...</div>
                                         <label><i className="fas fa-info-circle"></i> Supermarket-poner lista, o q todos</label>
                                         <input type="text" name="" value={Supermarket}  className="filter-input" onChange={(e) => setPreferredSupermarket(e.target.value)} />
                                     </div>
                                     <div className="icon">
                                        <div className="tooltip"> How frequently do you go for grocery shopping?</div>
                                         <label><i className="fas fa-info-circle"></i> Semaines</label>
                                         <input type="number" name="" value={weekgro} className="filter-input" onChange={(e) => setSupermarketFrequency(e.target.value)} />
                                     </div>
                                 </div>
                             </div>
                         </div>
                         <div className={`content-box ${toggleBar2Logic && "active"}`}>
                             <div className="accordion-label" onClick={toggleBar2}><i className="fas fa-utensils"></i> Proceed food</div>
                             <div className="accordion-content">
                                 <div>
                                     <div className="icon">
                                        <div className="tooltip"> What is the maximum amount of ingredients you want per food item?</div>
                                         <label><i className="fas fa-info-circle"></i> Max Nr Ingredients</label>
                                         <input type="number" name="" value={maxnringredients}  className="filter-input" onChange={(e) => setMaxIngredientPerFood(e.target.value)} />
                                     </div>
                                     <div className="icon">
                                        <div className="tooltip"> Name any specific ingredient you want</div>
                                         <label><i className="fas fa-info-circle"></i> No produits avec cette ingrediente - separar x coma</label>
                                         <input type="text" name="" className="filter-input" onChange={(e) => setSpecificIngredientNeeded(e.target.value)}/>
                                     </div>
                                     <div className="icon">
                                        <div className="tooltip"> No produits avec ces additives</div>
                                         <label><i className="fas fa-info-circle"></i> No produits avec ces additives - separar x coma poner lista, o q otros</label>
                                         <input type="number" name="" value={maxnradditives} className="filter-input" onChange={(e) => setProductAddictive(e.target.value)} />
                                     </div>
                                     <div className="icon ">
                                        <div className="tooltip"> Nova - What level of processed food? (NOVA 1-4) </div>
                                         <label><i className="fas fa-info-circle"></i> NOVA Group (1-4)</label>
                                         <input type="number" name="" value={nova_group} onChange={(e) => setNovaGroup(e.target.value)} />
                                     </div>
                                     <div className="icon mt-2">
                                        <div className="tooltip"> Nutritional Score (a-e) </div>
                                         <label><i className="fas fa-info-circle"></i> Nutriscore (a-e)</label>
                                         <input type="text" name="" value={nutriscore_grade} onChange={(e) => setNutriscoreGrade(e.target.value)}/>
                                     </div>
                                     <div className="icon mt-2">
                                        <div className="tooltip"> Do you want fatty foods?</div>
                                         <label><i className="fas fa-info-circle"></i> No sat fats </label>
                                         <input type="checkbox" name="" onChange={(e) => setSaturatedFood(e.target.value)}/>
                                     </div>
                                     <div className="icon mt-2">
                                        <div className="tooltip"> Do you want low trans fat foods?</div>
                                         <label><i className="fas fa-info-circle"></i> No trans fats</label>
                                         <input type="checkbox" name="" onChange={(e) => setTransFatFood(e.target.value)} />
                                     </div>
                                     <div className="icon mt-2">
                                        <div className="tooltip"> Do you want foods that are low in sugar?</div>
                                         <label><i className="fas fa-info-circle"></i> Low sugar</label>
                                         <input type="checkbox" name="" onChange={(e) => setLowSugar(e.target.value)} />
                                     </div>
                                     <div className="icon mt-2">
                                        <div className="tooltip"> Do you want low salt foods? </div>
                                         <label><i className="fas fa-info-circle"></i> Low salt</label>
                                         <input type="checkbox" name="" onChange={(e) => setLowSalt(e.target.value)} />
                                     </div>
                                     <div className="icon mt-2">
                                        <div className="tooltip"> Do you want foods with High Fiber?</div>
                                         <label><i className="fas fa-info-circle"></i> High fiber</label>
                                         <input type="checkbox" name="" onChange={(e) => setHighFiber(e.target.value)} />
                                     </div>
                                     <div className="icon mt-2">
                                        <div className="tooltip"> Do you want foods with Low Carbohydrate? </div>
                                         <label><i className="fas fa-info-circle"></i> Low carbo </label>
                                         <input type="checkbox" name="" onChange={(e) => setLowCarb(e.target.value)} />
                                     </div>
                                     <div className="icon mt-2">
                                        <div className="tooltip"> Do you want foods with High Carbohydrate? </div>
                                         <label><i className="fas fa-info-circle"></i> High carbo </label>
                                         <input type="checkbox" name="" onChange={(e) => setHighCarb(e.target.value)} />
                                     </div>
                                 </div>
                             </div>
                         </div>
                         <div className={`content-box ${toggleBar3Logic && "active"}`}>
                             <div className="accordion-label" onClick={toggleBar3}><i className="fas fa-times-circle"></i> Boicott</div>
                             <div className="accordion-content">
                                 <div className="icon">
                                    <div className="tooltip"> What are your preferred brands?</div>
                                     <label><i className="fas fa-info-circle"></i> Preferred brand</label>
                                     <input type="text" name="" value={brand} className="filter-input" onChange={(e) => setPreferredBrand(e.target.value)} />
                                 </div>
                                 <div className="icon">
                                    <div className="tooltip">Which brands do you want to boycott?</div>
                                     <label><i className="fas fa-info-circle"></i> Boycott brand</label>
                                     <input type="text" name="" className="filter-input" onChange={(e) => setBoycottBrand(e.target.value)} />
                                 </div>
                                 <div className="icon">
                                    <div className="tooltip">Which country do you prefer?</div>
                                     <label><i className="fas fa-info-circle"></i> Preferred origin</label>
                                     <input type="text" name="" value={origin} className="filter-input" onChange={(e) => setPreferredOrigin(e.target.value)} />
                                 </div>
                                
                                <div className="icon">
                                   <div className="tooltip"> Which countries do you want to boycott? </div>
                                    <label><i className="fas fa-info-circle"></i> Boycott origin</label>
                                    <input type="text" name="" className="filter-input" onChange={(e) => setboycottOrigin(e.target.value)} />
                                </div>
                        
                                
                                <div className="icon">
                                   <div className="tooltip"> No packing... </div>
                                    <label><i className="fas fa-info-circle"></i> No packing - A ELEGIR plastico...</label>
                                    <input type="text" name="" className="filter-input" onChange={(e) => setNoPacking(e.target.value)} />
                                </div>
                             </div>
                         </div>
                     </div>
                    </section>
                     <div className="m-2">
                         <button className="btn" style={{color: '#fff'}} type='submit'>
                            <i className="fas fa-save"></i> Save changes
                         </button>
                     </div>
                </form>
                </div>  
        </>
    )
}

export default ProductFilters
