import { useLoaderData, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ProductSummary from "../components/ProductSummary";

export async function loader({ request }) {
    // Fetch searched products
    const url = new URL(request.url);
    const q = url.searchParams.get('q');
    const repsonse = await fetch(`https://dummyjson.com/products/search?q=${q}`);
    const json = await repsonse.json();
    const products = json.products
    return { products, q };
}

export default function SearchRoute() {
    const { products, q } = useLoaderData();
    const navigate = useNavigate();

    // Redirects to home if the user submits empty search
    useEffect(() => {
        if (q === "") {
            navigate('/')
         }
    })
    
    // Sets the search input value when content loads
    useEffect(() => {
        document.getElementById('search').value = q
    }, [q]);
 
    return (
        <div className="search">
            <div className="hero-image"></div>
            {/* Heading */}
            {products.length
                    ? <h1 className="main-heading">Search results for "{q}"</h1>
                    : <h1 className="main-heading">Sorry no seach results for "{q}"</h1>
                }
            <div className="products-container">
                {/* Content */}
                {products.length 
                    ? products.map(product => 
                    <ProductSummary key={product.id} product={product} />
                )
                    : <div className="no-search-results"><Link to="/">Back to home</Link></div>
                }
            </div>
        </div>
    )
}