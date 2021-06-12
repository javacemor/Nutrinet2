import { useCookies } from 'react-cookie';
import React from 'react';

function Products({products}) {
    const [token, setToken] = useCookies(['loggedIn']);

    // ADD PRODUCT TO USER'S GROCERY'S LIST
    const addProduct = (product_id) => {
        fetch(`api/products/my_products/${token['loggedIn']}`, {
            'method': 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({product_id})
        })
        .then(response => response.json())
        .catch(error => alert(error))
    }

    return (
        <>
            {
                products.map((product) => (
                    <div className="product" key={product.id}>
                        <img src={product.image_url} alt={product.product_name.substring(0, 15)} />
                        <h5>{product.product_name.substring(0, 15)}</h5>
                        <button className="btn-sm mt-1" onClick={() => addProduct(product.id)}><i className="fas fa-plus"></i> Add</button>
                    </div>
                ))
            }  
        </>
    )
}

export default Products;
