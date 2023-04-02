import { useLoaderData } from "react-router-dom";

import ProductSummary from "../components/ProductSummary";

export async function loader({ params }) {
    // Fetch products by category
    const category = params.category;
    const repsonse = await fetch(`https://dummyjson.com/products/category/${category}`);
    const json = await repsonse.json();
    const products = json.products
    return { products, category };
}

export default function CategoryRoute() {
    const {products, category} = useLoaderData();

    // Formats the json data
    const formatCategory = category => {
        const capital = category.substring(0,1).toUpperCase();
            const replacedDash = category.replace("-", " ");
            const formattedCategory = capital + replacedDash.substring(1, category.length)
            
            return formattedCategory;
    }

    return (
        <div className="category-products">
            <div className="hero-image"></div>
            <h1 className="main-heading">{formatCategory(category)}</h1>
            <div className="products-container">
                {products.map(product => 
                    <ProductSummary key={product.id} product={product}/>
                )}
            </div>
        </div>
    )
}