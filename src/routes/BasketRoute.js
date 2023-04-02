import { useSelector, useDispatch } from "react-redux"
import { useLoaderData, Link } from "react-router-dom";

import { deleteProduct, increaseBasketCount, decreaseBasketCount } from "../redux-data/productsSlice";

export async function loader() {
    // Fetch all products
    const repsonse = await fetch('https://dummyjson.com/products?limit=0');
    const json = await repsonse.json();
    console.log(json.products);
    return json.products;
}

export default function Basket() {
    const itemIds = useSelector(state => state.products.itemsIds);
    const itemCounts = useSelector(state => state.products.itemCounts);
    const products = useLoaderData();
    const dispatch = useDispatch();

    let totalItems = 0;
    for (let i = 0; i < itemIds?.length; i++) {
        let itemid = itemIds[i];
        totalItems += itemCounts[itemid]
    }

    let totalCost = 0;
    itemIds.forEach(itemId => {
        const product = products.find(product => product.id === itemId)
        totalCost += itemCounts[itemId] * product.price;
    });

    const totalHeading = totalItems === 1 ? 'item' : 'items';

    const basketActive = 
        itemIds.map(itemId => {
            const product = products.find(product => product.id === itemId);
            const productCount = itemCounts[product.id]
            return (
                <div key={product.id} className="basket-product">
                    <div className="product-basket-image-container">
                        <img src={product.images[0]} alt={product.description}/>
                    </div>
                    <div className="basket-product-details">
                        <h2>{product.title}</h2>
                        <p>{product.description}</p>
                        <h2>£{product.price.toLocaleString()}</h2>
                        <div className="modify-basket">
                            <button 
                                className="basket-decrease-button" 
                                onClick={() => dispatch(decreaseBasketCount(product.id))}
                            >
                                -
                            </button>
                            <span>{productCount}</span>
                            <button 
                                className="basket-increase-button" 
                                onClick={() => dispatch(increaseBasketCount(product.id))}
                            >
                                +
                            </button>
                            <button 
                                className="basket-delete-button"
                                onClick={() => dispatch(deleteProduct(product.id))}
                            >
                                Remove Item
                            </button>
                        </div>
                    </div>
                </div>
                
                )
            })
        
    const basketInactive =
        <div className="basket-empty">
            <p>Your basket is empty. <Link to="/">Continue shopping</Link></p>
        </div>
    
    return (
        <div className="basket-container">
            {totalItems > 0 && 
                <div className="basket-summary">
                    <h2>({totalItems} {totalHeading})</h2>
                    <h2>£{totalCost.toLocaleString()} in total</h2>
                </div>
            }
            {totalItems > 0 ? basketActive : basketInactive}
            {totalItems > 0 &&
                <div className="checkout"> 
                    <h2>£{totalCost.toLocaleString()} in total</h2>
                    <Link to="/basket/checkout">Checkout</Link>
                </div>
            }
        </div>
    )
}