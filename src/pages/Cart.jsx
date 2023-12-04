
import { useContext, useEffect } from "react"
import ItemToPurchase from "../components/ItemToPurchase"
import Payment from "../components/Payment"
import { CartContext } from "../context/CartContext"
import { getDocumentUser } from "../firebase.config"
import { UserContext } from "../context/UserContext"



const Cart = () => {
  const { setUserDoc, currentUser } = useContext(UserContext)
  const { cartItems } = useContext(CartContext)


  useEffect(() => {
    const getUserInfo = async () => {
      if (!currentUser) return
      const userInfo = await getDocumentUser(currentUser.uid);
      setUserDoc(userInfo)
    };
    getUserInfo();
  }, [currentUser, setUserDoc]);

  return (
    <div className="row">
      <div className="col-12 col-lg-7 m-3" >
        {cartItems?.map((item, index) => (
          <ItemToPurchase key={`itemToPurchase${item.id}`} item={item} />
        ))}
      </div>
      {/* <div className="col-12 col-lg-6"> */}
      <Payment />
      {/* </div> */}
    </div>
  )
}

export default Cart