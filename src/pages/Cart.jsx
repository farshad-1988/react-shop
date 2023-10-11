import { useContext } from "react"
import { CartContext } from "../context/CartContext"
import ItemToPurchase from "../components/ItemToPurchase"
import { finalPay } from "../firebase.config"
import { UserContext } from "../context/UserContext"




const Cart = ()=>{
    const {totalCountAndPrice,cartItems , setCartItems , setChange} = useContext(CartContext)
    const {currentUser} = useContext(UserContext)


    const {totalCount , totalPrice} = totalCountAndPrice
    
    const pay = async()=>{
        await finalPay(currentUser ,cartItems)
        alert("payment was successful")
        setCartItems([])
        setChange((prev)=>!prev)
    }


    return (
        <div className="row">
            <div className="col-8 m-3" >
                {cartItems.map((item,index)=>(
                    <ItemToPurchase key={`itemToPurchase${index}`} item={item}/>
                ))}
            </div>
            <div className="col-3 bg-secondary rounded text-center mt-3 pt-4" style={{position:"fixed", right:"50px", height:"300px"}}>
                <p>number of ordered item {totalCount}</p>
                <p>total price</p>
                <p>{totalPrice}$</p>
                <button className="btn btn-danger" onClick={pay}>proceed to payment</button>
            </div>
        </div>
    )
}

export default Cart