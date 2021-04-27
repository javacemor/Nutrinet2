import {Link} from 'react-router-dom';
import { useCookies } from 'react-cookie';
import React, { useState, useEffect } from 'react';

function ShoppingList() {
    const [myProducts, setMyProducts] = useState('');
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState('');

    const [token, setToken] = useCookies(['loggedIn']);
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

    // REMOVE/DELETE PRODUCT FROM USER'S GROCERY'S LIST
    const deleteProduct = (product_id) =>{
        fetch(`http://localhost:8000/api/products/my_products/${token['loggedIn']}`, {
            'method': 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({product_id}),
        })
        // .then(response => response.json())
        .then(() => {
            fetch(`http://localhost:8000/api/products/my_products/${token['loggedIn']}`)
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
    const ProductUnitChange = (product_id, action, weeks=1) => {
        fetch(`http://localhost:8000/api/products/my_products/${token['loggedIn']}`, {
            'method': 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({product_id, action, weeks}),
        })
        // .then(response => response.json())
        .then(() => {
            fetch(`http://localhost:8000/api/products/my_products/${token['loggedIn']}`)
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
    return (
        <>
          <div className="customers-sm">
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
                                            &nbsp;&nbsp;&nbsp; w: <input type="number" value={product.weeks} onChange={(e) => ProductUnitChange(product.id, 'updateWeeks', e.target.value)} className="week-duration"/>
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
  
        </>
    )
}

export default ShoppingList;
