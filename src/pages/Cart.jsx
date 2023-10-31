
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
            <div className="col-12 col-md-9 m-3" >
                {cartItems?.map((item,index)=>(
                    <ItemToPurchase key={`itemToPurchase${index}`} item={item}/>
                ))}
            </div>
            {/* <div className="col-12 col-lg-6"> */}
                <Payment/>
            {/* </div> */}
        </div>
    )
}

export default Cart