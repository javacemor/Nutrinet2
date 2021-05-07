import React, {useState, useEffect} from 'react';
import { useCookies } from 'react-cookie';

import DashboardTemplates from './DashboardTemplates';
import ShoppingList from '../ShoppingList';
import ProductFilters from '../ProductFilters';
import FilteredProducts from '../FilteredProducts';

import {Link} from 'react-router-dom';
import MacroNutrientChart from '../MacroNutrientChart';
import MicroNutrientChart from '../MicroNutrientChart';
import useFetch from '../../useFetch';
import Loading from '../Loading';


function Dashboard() {
    const [displaySection, setDisplaySection] = useState('shopping-list');
    const [nutrientChart, setNutrientChart] = useState('macro');

    const [myProducts, setMyProducts] = useState('');
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState('');

    const [token, setToken] = useCookies(['loggedIn']);
    const [nutrientDetails, setNutrientDetails] = useState({details:'details'});
    const [weeks, setWeeks] = useState(1);

    useEffect(() => {
        const abortCont = new AbortController();

        fetch(`api/products/my_products/${token['loggedIn']}`, { signal: abortCont.signal })
            .then(res => {
                if(!res.ok){
                    throw Error('could not fetch data from the endpoint');
                }
                return res.json();
            })
            .then(data => {
                setMyProducts(data);
                setLoading(false);
                setErr(null);
            })
            .catch(err =>{
                if (err.name === 'AbortError'){
                    console.log('fetch aborted');
                }else{
                    setErr(err.message);
                    setLoading(false);
                }
            });
        return () => abortCont.abort();

    }, [token]);

    // ADD PRODUCT TO USER'S GROCERY'S LIST
    const addProduct = (product_id) => {
        fetch(`api/products/my_products/${token['loggedIn']}`, {
            'method': 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({product_id})
        })
        // .then(response => response.json())
        .then(() => {
            fetch(`api/products/my_products/${token['loggedIn']}`)
            .then(res => {
                if(!res.ok){
                    throw Error('could not fetch data from the endpoint');
                }
                return res.json();
            })
            .then(data => {
                setMyProducts(data);
                setLoading(false);
                setErr(null);
            })
            .catch(err =>{
                if (err.name === 'AbortError'){
                    console.log('fetch aborted');
                }else{
                    setErr(err.message);
                    setLoading(false);
                }
            });
        })
        .catch(error => console.log(error))
    }

    // REMOVE/DELETE PRODUCT FROM USER'S GROCERY'S LIST
    const deleteProduct = (product_id) =>{
        fetch(`api/products/my_products/${token['loggedIn']}`, {
            'method': 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({product_id}),
        })
        // .then(response => response.json())
        .then(() => {
            fetch(`api/products/my_products/${token['loggedIn']}`)
            .then(res => {
                if(!res.ok){
                    throw Error('could not fetch data from the endpoint');
                }
                return res.json();
            })
            .then(data => {
                setMyProducts(data);
                setLoading(false);
                setErr(null);
            })
            .catch(err =>{
                if (err.name === 'AbortError'){
                    console.log('fetch aborted');
                }else{
                    setErr(err.message);
                    setLoading(false);
                }
            });
        })
        .catch(error => console.log(error))
    }

    // INCREMENT or DECREMENT THE UNIT/QUANTITY OF A PARTICULAR PRODUCT
    const ProductUnitChange = (product_id, action, weeks=0) => {
        fetch(`api/products/my_products/${token['loggedIn']}`, {
            'method': 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({product_id, action, weeks}),
        })
        // .then(response => response.json())
        .then(() => {
            fetch(`api/products/my_products/${token['loggedIn']}`)
            .then(res => {
                if(!res.ok){
                    throw Error('could not fetch data from the endpoint');
                }
                return res.json();
            })
            .then(data => {
                setMyProducts(data);
                setLoading(false);
                setErr(null);
            })
            .catch(err =>{
                if (err.name === 'AbortError'){
                    console.log('fetch aborted');
                }else{
                    setErr(err.message);
                    setLoading(false);
                }
            });
        })
        .catch(error => console.log(error))
    }

    // const updateWeeks = (product_id, value) =>{
    //     setWeeks(value);
    //     ProductUnitChange(product_id, 'updateWeeks', value) 
    // }
    // FETCH USER DETAILS FOR CHART DISPLAY
    useEffect(() =>{
        fetch(`
            api/users/profile_details/${token['loggedIn']}`)
            .then(response => response.json())
            .then(data => setNutrientDetails(data))
            .catch(error => console.log(error))
    }, [myProducts, loading, err, token])

    return (
        <>
        <DashboardTemplates section='dashboard' />
        <div className='main-content'>
            
        <main className="main-sidebar">
            <div className="recent-grid">
                <div className="dashboard-projects">
                    <div className="dashboard-card">
                        <div className="card-header nutrient-chart flex">
                            <li onClick={() => setNutrientChart('macro')} className={nutrientChart === 'macro' ? 'active': ''}><Link to="#">Macro Nutrinet</Link></li>
                            <li onClick={() => setNutrientChart('micro')} className={nutrientChart === 'micro' ? 'active': ''}><Link to="#">Micro Nutrinet</Link></li>
                        </div>
                        <div className="card-body">
                            {/* NUTRIENT CHART SECTION */}
                            {
                                nutrientChart === 'macro' ? <MacroNutrientChart nutrientDetails={nutrientDetails} /> : null
                            }
                            {
                                nutrientChart === 'micro' ? <MicroNutrientChart nutrientDetails={nutrientDetails} /> : null
                            }
                        </div>
                    </div>
                </div>

                <div className="customers cover">
                    <div className="dashboar-card">
                        <div className="card-header">
                            <h3>Shopping List</h3>
                        </div>
                        <div className="card-body">
                        {err && <h5>{err}</h5>}
                        {loading && 'Loading...' }
                        {myProducts && 
                            myProducts.map(product => (
                                <div className="customer" key={product.id}>
                                    <div className="customer-info">
                                        <img src={product.image_url} width="40px" height="40px" alt='' />
                                        <div>
                                            <h4>{product.product_name}</h4>
                                            <small>x{product.units}</small>
                                            <small>
                                            &nbsp;&nbsp;&nbsp; w: <input value={product.weeks} onChange={(e) => ProductUnitChange(product.id, 'updateWeeks', e.target.value)} type="number" className="week-duration"/>
                                            </small>
                                        </div>
                                    </div>
                                    <div className="customer-contact">
                                        <Link to="#" onClick={() => ProductUnitChange(product.id, 'increment')}><span className="fas fa-plus"></span></Link>
                                        <Link to="#" onClick={() => ProductUnitChange(product.id, 'decrement')}><span className="fas fa-minus"></span></Link>
                                        <Link to="#" onClick={() => deleteProduct(product.id)}><span className="fas fa-trash-alt"></span></Link>
                                    </div>
                                </div>
                            ))  
                            }
                            
                        </div>
                    </div>
                </div>
            </div>

            <section className="small-screen-tabs my-5">
                <li onClick={() => setDisplaySection('products')} className={displaySection === 'products' ? 'active' : ''}><Link to="#">Products</Link></li>
                <li onClick={() => setDisplaySection('shopping-list')} className={displaySection === 'shopping-list' ? 'active' : ''}><Link to="#">Shopping List</Link></li>
                <li onClick={() => setDisplaySection('filters')} className={displaySection === 'filters' ? 'active' : ''}><Link to="#">Filters</Link></li>
            </section>

            {/* SHOPPING LIST COMPONENT HERE */}
            {displaySection === 'shopping-list' ? <ShoppingList /> : null}

            <section className="our-products">
                {/* FILTERED PRODUCTS */}
                <div className="hide-small">
                    <FilteredProducts addProduct={addProduct} />
                </div>
                {displaySection === 'products' ? <FilteredProducts addProduct={addProduct} /> : null}


                {/* PRODUCT FILTERS COMPONENT */}
                {displaySection === 'filters' ? <ProductFilters />: null}
                <div className="hide-small">
                    <ProductFilters />
                </div>
            </section>

            <div className="dashboard-projects my-5">
                <div className="dashboard-card">
                    
                </div>
            </div>
        </main>
        </div>
    </>
    )
}

export default Dashboard
