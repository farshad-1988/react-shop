
export const initialCartState = {
    cartItems:JSON.parse(localStorage.getItem("cart")) || [],
    totalCountAndPrice:[{totalCount:0 , totalPrice:0}],
    newSignIn:"refresh",
    change:false
}


export const cartReducer = (state , action)=>{
    const {type , payload} = action
    switch (type) {
        case "SET_CART_ITEMS":
            return {
                ...state , cartItems:payload
            }
        case "SET_TOTAL_COUNT_AND_PRICE":
            return {
                ...state , totalCountAndPrice:payload
            }
        case "SET_SIGNING_TYPE":
            return {
                ...state , newSignIn:payload
            }
        case "CHANGING_IN_CART":
            return {
                ...state , change:!state.change
            }
        case "SET_SINGLE_ITEM_LOADING_FALSE":
            return {
                ...state , cartItems:payload
            }
        default:
            return state;
    }

}