import { useDispatch } from "react-redux"
import { addtoBasket } from "../redux-data/productsSlice";

export default function AddToBasketLink({ product }) {
    const dispatch = useDispatch();

    return (
        <button 
            className="add-to-basket"
            onClick={(e) => {
                dispatch(addtoBasket(product.id))
                e.target.textContent = 'Added'
            }}
            onMouseLeave={(e) => {
                e.target.textContent = 'Add to Cart'
            }}
        >
            Add to Cart
        </button>
    )
}