import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import useFetch from '../useFetch'
import Loading from './Loading';

function FilteredProducts({addProduct}) {
    const {data: products, isLoading, error} = useFetch('api/products');
    const [allProducts, setAllProducts] = useState([]);

    const selectCategory = (selectedCategory)=>{
        if (selectedCategory === 'all'){
            setAllProducts(products)
        }else{
            const newItems = products.filter((item) => item.pnns_groups_1 === selectedCategory);
            setAllProducts(newItems)
        }
    }
    
    return (
        <>
          <div className="products-and-category-section">
                   <div>
                       <h3>Categories</h3>
                       <p className="category-section mt-2">
                           <select style={{width:'100px'}} className="select-product-category" onChange={(e) => selectCategory(e.target.value)}>
                           <option selected value='all'> Select </option>
                            <option value='all'> All </option>
                            <optgroup>
                            {
                                products && new Set(products.map((product) => (
                                    <option value={product.pnns_groups_1}>{product.pnns_groups_1}</option>
                                )))
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
                            {products && allProducts.map((product) =>(
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
