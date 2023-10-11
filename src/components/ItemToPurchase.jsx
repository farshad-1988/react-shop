import { useContext } from "react"
import { CartContext } from "../context/CartContext"

const ItemToPurchase = ({item})=>{
    const {increment , decrement} = useContext(CartContext)
    // const addItem = ()=>increment( item , true)
    // const removeItem = ()=>decrement( item , true)
    

    return(
    item.countInCart ? <div className="row mb-3">
        <img className="col-3 img-thumbnail" src={item.imagesUrl[0]} alt="anotherPic" />
        <div className="col-9">
            <p>{item.name}</p>
            <p>{item.guarantee}</p>
            <p>{item.price}$</p>
            <button className="btn" onClick={()=>decrement( item , true)}> - </button>
            <span className="align-self-center">{item.countInCart}</span>
            <button className="btn" onClick={()=>increment( item , true)}> + </button>
            
        </div>
    </div> : "")
}

export default ItemToPurchase
