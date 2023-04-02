import { Link } from "react-router-dom"
import AddToBasketButton from "./AddToBasketButton"

export default function ProductSummary({ product }) {
    const formatProductTitle = productTitle => {
        const formattedTitle = productTitle.replaceAll(" ", "-");

        return formattedTitle;
    }

    return (
        <div className="product-summary">
            <div className="product-summary-image-container">
                <Link 
                    to={`/products/${product.id}/${formatProductTitle(product.title)}`} 
                    className="product-details-link">
                        <img src={product.images[0]} alt={product.description}/>
                </Link>
            </div>
            <p>{product.title}</p>
            <h2>£ {product.price.toLocaleString()}</h2>
            <AddToBasketButton product={product}/>
        </div>
    )
}