import { useLoaderData, Link } from "react-router-dom";

import AddToBasketButton from "../components/AddToBasketButton";

export async function loader({ params }) {
    // Return single product
    const productId = params.productId;
    const repsonse = await fetch(`https://dummyjson.com/products/${productId}`);
    const json = await repsonse.json();
    return json;
}

export default function ProductDetailsRoute() {
    const product = useLoaderData();

    // Format product category
    const formatCategory = category => {
        const capital = category.substring(0,1).toUpperCase();
            const replacedDash = category.replace("-", " ");
            const formattedCategory = capital + replacedDash.substring(1, category.length)
            
            return formattedCategory;
    }

    return (
        <div className="product-details">
            <div className="product-container">
                <div className="product-details-image-container">
                    <img src={product.images[0]} alt={product.description}/>
                </div>
                <div className="details">
                    <h2>{product.title}</h2>
                    <p>{product.description}</p>
                    <b>Tag: </b><Link to={`/products/category/${product.category}`}>{formatCategory(product.category)}</Link>
                    <h2>£{product.price.toLocaleString()}</h2>
                    <AddToBasketButton product={product}/>
                </div>
            </div>
        </div>
    )
}