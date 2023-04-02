import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    itemsIds: [],
    itemCounts: {},
    searchQuery: ""
}

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addtoBasket(state, action) {
            const productId = action.payload
            // If item already exists in basket then increase the count, otherwise add a new item and initialize the count to 1
            if (state.itemsIds.includes(productId)) {
                state.itemCounts[productId] = state.itemCounts[productId] + 1;
            } else {
                state.itemsIds.push(productId);
                state.itemCounts[productId] = 1;
            }
        },
        decreaseBasketCount(state, action) {
            const productId = action.payload;
            const productIdIndex = state.itemsIds.indexOf(productId)

            if (state.itemCounts[productId] > 1) {
                state.itemCounts[productId] = state.itemCounts[productId] - 1;
            } else {
            state.itemsIds.splice(productIdIndex, 1)
            delete state.itemCounts[productId]
            }
        },
        increaseBasketCount(state, action) {
            const productId = action.payload;
            state.itemCounts[productId] = state.itemCounts[productId] + 1;
        },
        deleteProduct(state, action) {
            const productId = action.payload;
            const productIdIndex = state.itemsIds.indexOf(productId)

            state.itemsIds.splice(productIdIndex, 1)
            delete state.itemCounts[productId]
        },
        updateSearchQuery(state, action) {
            state.searchQuery = action.payload;
        }
    }
})

export default productsSlice.reducer;
export const { 
    addtoBasket, 
    updateSearchQuery, 
    decreaseBasketCount, 
    increaseBasketCount,
    deleteProduct 
} = productsSlice.actions;