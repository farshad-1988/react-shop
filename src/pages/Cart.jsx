
import { useContext, useEffect } from "react"
import ItemToPurchase from "../components/ItemToPurchase"
import Payment from "../components/Payment"
import { CartContext } from "../context/CartContext"
import { getDocumentUser } from "../firebase.config"
import { UserContext } from "../context/UserContext"



const Cart = ()=>{
  const {cartItems} = useContext(CartContext)


    return (
        <div className="row">
            <div className="col-8 m-3" >
                {cartItems?.map((item,index)=>(
                    <ItemToPurchase key={`itemToPurchase${index}`} item={item}/>
                ))}
            </div>
            <Payment/>
        </div>
    )
}

export default Cart