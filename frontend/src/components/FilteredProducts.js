import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Loading from './Loading';

function FilteredProducts({addProduct}) {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const [categories, setCategories] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const abortCont = new AbortController();

        fetch('api/products', { signal: abortCont.signal })
            .then(res => {
                if(!res.ok){
                    throw Error('could not fetch data from the endpoint');
                }

                return res.json();
            })
            .then(data => {
                setAllProducts(data);
                setProducts(data);
                setIsLoading(false);
                setError(false);
                // new Set(data.map((product) => {
                //     return setCategories(product.pnns_groups_1)
                // }))
                let cat = [];
                data.map((product) =>{
                    return cat.push(product.pnns_groups_1);
                })
                let newCat = ['All', ...new Set(cat)]
                setCategories(newCat);
            })
            .catch(err =>{
                if (err.name === 'AbortError'){
                    console.log('fetch aborted');
                }else{
                    setError(err.message);
                    setIsLoading(false);
                }
            });
        return () => abortCont.abort();

    }, []);

    const selectCategory = (selectedCategory)=>{
        if (selectedCategory === 'All'){
            setProducts(allProducts)
        }else{
            const newItems = allProducts.filter((item) => item.pnns_groups_1 === selectedCategory);
            setProducts(newItems)
        }
    }
    
    return (
        <>
          <div className="products-and-category-section">
                   <div>
                       <h3>Categories</h3>
                       <p className="category-section mt-2">
                           <select style={{width:'100px'}} className="select-product-category" onChange={(e) => selectCategory(e.target.value)}>
                            <optgroup>
                            {
                                categories && categories.map((category) => (
                                    <option value={category}>{category}</option>
                                ))
                            }
                            </optgroup>
                           </select>
                       </p>
                   </div>
                   <div>
                       <div className="my_products-section flex">
                           <h3>Products</h3>
                           {/* <div className="see_all_products">
                               <a href="#" className="btn-sm"> see all <i className="fas fa-arrow-right"></i></a>
                           </div> */}
                       </div>
                       <div className="products-section mt-2">
                            {error && <h5>{error}</h5>}
                            {isLoading && <Loading />}
                            {products && products.map((product) =>(
                                <div className="single-product" key={product.id}>
                                    <img src={product.image_url} alt=''/>
                                    <h4>{product.product_name}</h4> 
                                    {/* <p>brief description will</p> */}
                                    <Link to="#" className="btn-sm mt-1" onClick={() => addProduct(product.id)}><i className="fas fa-plus-circle"></i>&nbsp; Add</Link>
                                </div>
                            )) }
                       </div>
                   </div>
                </div>  
        </>
    )
}

export default FilteredProducts
