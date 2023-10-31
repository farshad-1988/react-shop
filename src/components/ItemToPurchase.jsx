import { useContext } from "react"
import { CartContext } from "../context/CartContext"
import ItemCounter from "./ItemCounter"
import { useNavigate } from "react-router-dom"

const ItemToPurchase = ({item})=>{
    const {increment , decrement} = useContext(CartContext)
    const navigate = useNavigate()
    // const addItem = ()=>increment( item , true)
    // const removeItem = ()=>decrement( item , true)
    const goToSingleItem = ()=>{
        navigate(`/${item.category}/${item.id}`)
    }

    return(
    item.countInCart ? <div className="row mb-3">
        <img onClick={goToSingleItem} className="col-3 img-thumbnail btn" src={item.imagesUrl[0]} alt="anotherPic" />
        <div className="col-9">
            <p>{item.name}</p>
            <p>{item.guarantee}</p>
            <p>{item.price}$</p>
            <div className="d-flex">
                <div className="me-auto">
                    <ItemCounter itemInfo={item}/>  
                </div>
            </div>
        </div>
    </div> : "")
}

export default ItemToPurchase
