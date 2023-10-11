import { useContext} from "react"
import { CartContext } from "../context/CartContext"


const ItemCounter = ({itemInfo})=>{
    const {cartItems , increment , decrement} = useContext(CartContext)

    const isItemInCart = cartItems?.find((item)=>item.id===itemInfo.id)
    
    const addItem = ()=>increment( itemInfo , isItemInCart)
    const removeItem = ()=>decrement( itemInfo , isItemInCart)


    return (
    cartItems.find((item)=>item.loading && itemInfo.id === item.id) ? <h2>loading</h2> : !isItemInCart ? <button onClick={addItem} className="btn ms-2">add to card</button> : 
    <div className="d-flex ms-5 align-content-center" style={{height:"50px"}}>
        <button className="btn" onClick={removeItem}> - </button>
        <span className="align-self-center">{isItemInCart?.countInCart}</span>
        <button className="btn" onClick={addItem}> + </button>
    </div>
    )
    }




export default ItemCounter