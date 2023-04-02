import { useLoaderData } from "react-router-dom";

import ProductSummary from "../components/ProductSummary";

export async function loader({ params }) {
    // Fetch limited amount of products
    const repsonse = await fetch('https://dummyjson.com/products?limit=8&skip=7');
    const json = await repsonse.json();
    console.log(json);
    return json.products;
}

export default function Index() {
    const products = useLoaderData();

    return (
        <div className="index">
            <div className="hero-image"></div>
            <h1 className="main-heading">Featured Products</h1>
            <div className="products-container">
                {products.map(product => 
                    <ProductSummary key={product.id} product={product}/>
                )}
            </div>
        </div>
    )
}