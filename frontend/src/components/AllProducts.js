import React, {useState, useEffect} from 'react'
import Loading from './Loading';
import Products from './Products';
import DashboardTemplates from './screens/DashboardTemplates';

function AllProducts() {
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
        <div className="main-content">
            <DashboardTemplates section='products' />
          <main className="main-sidebar">
            <div className="select-category m-2">
                <label>Choose a category:</label>
                <select onChange={(e) => selectCategory(e.target.value)}>
                    <option selected value='All'> All </option>
                    {
                        categories && categories.map((category) => (
                            <option value={category}>{category}</option>
                        ))
                    }
                </select>
            </div>
            
            <h4 className="m-2">{allProducts.length} products</h4>
           
            <div className="all-products grid">
                {error && <h5>{error}</h5>}
                {isLoading && <Loading /> }
                
                {products && <Products products={products}/> }
            </div>
        </main>  
        </div>
    )
}

export default AllProducts;
