import React, {useState} from 'react'
import useFetch from '../useFetch';
import Loading from './Loading';
import Products from './Products';
import DashboardTemplates from './screens/DashboardTemplates';

function AllProducts() {
    const {data: products, isLoading, error} = useFetch('api/products');
    const [allProducts, setAllProducts] = useState(products);

    // if (products){
    //     const allCats = new Set(products.map((product) => product.categories));
    //     console.log(allCats);
    // }

    
    // setMenuItems(newItems);

    const selectCategory = (selectedCategory)=>{
        if (selectedCategory === 'all'){
            setAllProducts(products)
        }else{
            const newItems = products.filter((item) => item.pnns_groups_1 === selectedCategory);
            setAllProducts(newItems)
        }
    }

    return (
        <div className="main-content">
            <DashboardTemplates section='products' />
          <main className="main-sidebar">
            <div className="select-category m-2">
                <label>Choose a category:</label>
                <select onChange={(e) => selectCategory(e.target.value)}>
                    <option selected value='all'> Select </option>
                    <option value='all'> All </option>
                    {
                        products && new Set(products.map((product) => (
                            <option value={product.pnns_groups_1}>{product.pnns_groups_1}</option>
                        )))
                    }
                </select>
            </div>
            
            <h4 className="m-2">1001 products</h4>
           
            <div className="all-products grid">
                {error && <h5>{error}</h5>}
                {isLoading && <Loading /> }
                
                {allProducts && <Products products={allProducts}/> }
            </div>
        </main>  
        </div>
    )
}

export default AllProducts;
