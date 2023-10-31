import { useContext} from "react"
import { CartContext } from "../context/CartContext"


const ItemCounter = ({itemInfo})=>{
    const {cartItems , increment , decrement} = useContext(CartContext)

    const isItemInCart = cartItems?.find((item)=>item.id===itemInfo.id)
    
    const addItem = ()=>increment( itemInfo , isItemInCart)
    const removeItem = ()=>decrement( itemInfo , isItemInCart)


    return (
    // <div className="text-center w-50">
        <div className="d-flex align-content-center justify-content-center" style={{width:"50px" , height:"50px"}}>
        {cartItems.find((item)=>item.loading && itemInfo.id === item.id) ? <div class="spinner-border m-auto"></div>
        : !isItemInCart ? <button onClick={addItem} className="btn btn-danger text-nowrap">add to card</button> : 
            <div className="d-flex align-content-center">
                <button className="btn" onClick={removeItem}> - </button>
                <span className="align-self-center">{isItemInCart?.countInCart}</span>
                <button disabled={isItemInCart.countInCart>=isItemInCart.countInStock} className="btn" onClick={addItem}> + </button>
            </div>}
        </div>
    // </div>
    )
    }




export default ItemCounter