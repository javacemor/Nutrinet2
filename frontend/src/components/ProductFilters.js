import React, { useState } from 'react';
import { useCookies } from 'react-cookie';

function ProductFilters() {
    const [token, setToken] = useCookies(['loggedIn']);

    const [toggleBar1Logic, setToggleBar1Logic] = useState(false);
    const [toggleBar2Logic, setToggleBar2Logic] = useState(false);
    const [toggleBar3Logic, setToggleBar3Logic] = useState(false);

    const [preferredSupermarket, setPreferredSupermarket] = useState('');
    const [supermarketFrequency, setSupermarketFrequency] = useState(false);
    const [maxIngredientPerFood, setMaxIngredientPerFood] = useState(false);
    const [specificIngredientNeeded, setSpecificIngredientNeeded] = useState(false);
    const [productAddictive, setProductAddictive] = useState(false);
    const [nova0, setNova0] = useState(false);
    const [nova1, setNova1] = useState(false);
    const [nova2, setNova2] = useState(false);
    const [nova3, setNova3] = useState(false);
    const [nova4, setNova4] = useState(false);
    const [nutriscoreA, setNutriscoreA] = useState(false);
    const [nutriscoreB, setNutriscoreB] = useState(false);
    const [nutriscoreC, setNutriscoreC] = useState(false);
    const [saturatedFood, setSaturatedFood] = useState(false);
    const [transFatFood, setTransFatFood] = useState(false);
    const [lowSugar, setLowSugar] = useState(false);
    const [lowSalt, setLowSalt] = useState(false);
    const [highFiber, setHighFiber] = useState(false);
    const [lowCarb, setLowCarb] = useState(false);
    const [highCarb, setHighCarb] = useState(false);
    const [preferredBrand, setPreferredBrand] = useState(false);
    const [boycottBrand, setBoycottBrand] = useState(false);
    const [preferredOrigin, setPreferredOrigin] = useState(false);
    const [boycottOrigin, setboycottOrigin] = useState(false);
    const [noPacking, setNoPacking] = useState(false);

    const handleSubmit = (e) =>{
        e.preventDefault();

        fetch(`api/products/my_product_filters/${token['loggedIn']}`, {
            'method': 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                preferredSupermarket,
        supermarketFrequency,
        maxIngredientPerFood,
        specificIngredientNeeded,
        productAddictive,
        nova0,
        nova1,
        nova2,
        nova3,
        nova4,
        nutriscoreA,
        nutriscoreB,
        nutriscoreC,
        saturatedFood,
        transFatFood,
        lowSugar,
        lowSalt, 
        highFiber,
        lowCarb,
        highCarb,
        preferredBrand,
        boycottBrand,
        preferredOrigin,
        boycottOrigin,
        noPacking,
            })
        })
        .then(response => response.json())
        .then(response => console.log(response))
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
                                         <input type="text" name=""  className="filter-input" onChange={(e) => setPreferredSupermarket(e.target.value)} />
                                     </div>
                                     <div className="icon">
                                        <div className="tooltip"> How frequently do you go for grocery shopping?</div>
                                         <label><i className="fas fa-info-circle"></i> Semaines</label>
                                         <input type="number" name="" className="filter-input" onChange={(e) => setSupermarketFrequency(e.target.value)} />
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
                                         <input type="number" name=""  className="filter-input" onChange={(e) => setMaxIngredientPerFood(e.target.value)} />
                                     </div>
                                     <div className="icon">
                                        <div className="tooltip"> Name any specific ingredient you want</div>
                                         <label><i className="fas fa-info-circle"></i> No produits avec cette ingrediente - separar x coma</label>
                                         <input type="text" name="" className="filter-input" onChange={(e) => setSpecificIngredientNeeded(e.target.value)}/>
                                     </div>
                                     <div className="icon">
                                        <div className="tooltip"> No produits avec ces additives</div>
                                         <label><i className="fas fa-info-circle"></i> No produits avec ces additives - separar x coma poner lista, o q otros</label>
                                         <input type="text" name="" className="filter-input" onChange={(e) => setProductAddictive(e.target.value)} />
                                     </div>
                                     <div className="icon ">
                                        <div className="tooltip"> Nova - What level of processed food? (NOVA 1-4) </div>
                                         <label><i className="fas fa-info-circle"></i> NOVA 0</label>
                                         <input type="checkbox" name="" onChange={(e) => setNova0(e.target.value)} />
                                     </div>
                                     <div className="icon mt-2">
                                        <div className="tooltip"> Nova - What level of processed food? (NOVA 1-4)</div>
                                         <label><i className="fas fa-info-circle"></i> NOVA 1</label>
                                         <input type="checkbox" name="" onChange={(e) => setNova1(e.target.value)} />
                                     </div>
                                     <div className="icon mt-2">
                                        <div className="tooltip"> Nova - What level of processed food? (NOVA 1-4)</div>
                                         <label><i className="fas fa-info-circle"></i> NOVA 2</label>
                                         <input type="checkbox" name="" onChange={(e) => setNova2(e.target.value)} />
                                     </div>
                                     <div className="icon mt-2">
                                        <div className="tooltip"> Nova - What level of processed food? (NOVA 1-4)</div>
                                         <label><i className="fas fa-info-circle"></i> NOVA 3</label>
                                         <input type="checkbox" name="" onChange={(e) => setNova3(e.target.value)} />
                                     </div>
                                     <div className="icon mt-2">
                                        <div className="tooltip"> Nova - What level of processed food? (NOVA 1-4) </div>
                                         <label><i className="fas fa-info-circle"></i> NOVA 4</label>
                                         <input type="checkbox" name="" onChange={(e) => setNova4(e.target.value)} />
                                     </div>
                                     <div className="icon mt-2">
                                        <div className="tooltip"> Nutritional Score... </div>
                                         <label><i className="fas fa-info-circle"></i> Nutriscore A</label>
                                         <input type="checkbox" name="" onChange={(e) => setNutriscoreA(e.target.value)}/>
                                     </div>
                                     <div className="icon mt-2">
                                        <div className="tooltip"> Nutritional Score...</div>
                                         <label><i className="fas fa-info-circle"></i> Nutriscore B</label>
                                         <input type="checkbox" name="" onChange={(e) => setNutriscoreB(e.target.value)} />
                                     </div>
                                     <div className="icon mt-2">
                                        <div className="tooltip"> Nutritional Score</div>
                                         <label><i className="fas fa-info-circle"></i> Nutriscore C</label>
                                         <input type="checkbox" name="" onChange={(e) => setNutriscoreC(e.target.value)} />
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
                                     <input type="text" name="" className="filter-input" onChange={(e) => setPreferredBrand(e.target.value)} />
                                 </div>
                                 <div className="icon">
                                    <div className="tooltip">Which brands do you want to boycott?</div>
                                     <label><i className="fas fa-info-circle"></i> Boycott brand</label>
                                     <input type="text" name="" className="filter-input" onChange={(e) => setBoycottBrand(e.target.value)} />
                                 </div>
                                 <div className="icon">
                                    <div className="tooltip">Which country do you prefer?</div>
                                     <label><i className="fas fa-info-circle"></i> Preferred origin</label>
                                     <input type="text" name="" className="filter-input" onChange={(e) => setPreferredOrigin(e.target.value)} />
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
