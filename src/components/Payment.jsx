import React, { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { CartContext } from '../context/CartContext'
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import axios from 'axios'
import { db, registerPurchasedItem } from '../firebase.config'
import { format, sub } from 'date-fns'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import QueryResponsive from '../utilities/QueryResponsive'
import "./components.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStripe } from '@fortawesome/free-brands-svg-icons'


function Payment() {
  const navigate = useNavigate()
  const { userId } = useParams()
  const { currentUser, userDoc } = useContext(UserContext)
  const { totalCountAndPrice, cartItems, cartDispatch } = useContext(CartContext)
  const { totalCount, totalPrice } = totalCountAndPrice
  const [deliveryDay, setDeliveryDay] = useState("")
  const [uploadingSpinner, setUploadingSpinner] = useState("")
  const { lg } = QueryResponsive()


  const stripe = useStripe()
  const elements = useElements()




  // useEffect(()=>{

  //   const getUserInfo =async ()=>{
  //     if(!currentUser) return
  //     // {
  //     //   return navigate("/signin")
  //     // }
  //     const userInfo = await getDocumentUser(currentUser.uid)
  //     setUserDoc(userInfo)
  //   } 
  //   getUserInfo()
  //   // return ()=>{console.log("first")}
  // },[currentUser])


  const pay = async (e) => {
    e.preventDefault()
    setUploadingSpinner("spinner-border")

    if (!stripe || !elements) {
      toast.error("problem in connection to stripe")
      return
    }




    try {
      const response = await axios.post("/.netlify/functions/create-payment-intent", { totalPrice })
      const data = await response.data



      //decrement items from db products
      await db.runTransaction(async (transaction) => {
        let arrayOfDocRefAndCount = []

        for (let item of cartItems) {

          const docRef = db.collection("PRODUCTS").doc(item.category.toLocaleUpperCase()).collection(item.category.toLocaleUpperCase()).doc(item.id)



          const purchasedItemDoc = await transaction.get(docRef);
          if (!purchasedItemDoc) throw new Error("Document does not exist!");

          const newCountInStock = purchasedItemDoc.data().countInStock - item.countInCart;
          const newPurchasedCount = purchasedItemDoc.data().purchasedCount + item.countInCart;


          if (newCountInStock <= 0) throw new Error("stock is not enough!");

          arrayOfDocRefAndCount.push({ docRef, countInStock: newCountInStock, purchasedCount: newPurchasedCount })


        }
        for (let obj of arrayOfDocRefAndCount) {
          transaction.update(obj.docRef, { countInStock: obj.countInStock, purchasedCount: obj.purchasedCount });
        }
      });

      //register items that user bought

      await registerPurchasedItem(currentUser.uid, cartItems, { totalCountAndPrice }, deliveryDay)
      // await finalPay(currentUser ,cartItems)
      cartDispatch({ type: "SET_CART_ITEMS", payload: [] })
      // cartDispatch({ type: "CHANGING_IN_CART" })
      setUploadingSpinner("")
      navigate(`/profile/${userId}`)
      setUploadingSpinner("")

      const clientSecret = data.paymentIntent.client_secret

      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: "farshad farazdel"
          }
        }
      })

      if (paymentResult.error) {
        toast.error("there is a problem in payment")
        throw new Error("payment problem")
      } else if (paymentResult.paymentIntent.status === "succeeded") {
        toast.success("payment was successful")
      }

    } catch (error) {
      toast.error(error)
      setUploadingSpinner("")
    }
  }



  return (
    <div className={`col-12 col-lg-6 rounded text-center m-auto mb-5 r-1 mt-3 ${lg && "position-fixed"} ff-payment-box`} >
      <div className='text-light text-start'><FontAwesomeIcon size='2xl' icon={faStripe} /></div>
      <div className='p-3'>
        <p>number of ordered item {totalCount}</p>
        <p>total price {totalPrice}$</p>
        {userDoc?.address ? <div>
          <p>deliver to: {userDoc?.address.city}</p>
          <p>{userDoc?.address.address1}</p>
          <p>{userDoc?.address.address2}</p>
        </div> : <span className='text-danger text-nowrap'>please compelete your profile info before payment</span>}
        <button type="button" className=" mb-3 btn btn-primary dropdown-toggle mt-3" data-bs-toggle="dropdown">
          {deliveryDay || "select a day to deliver"}
        </button>
        <ul name="time" className='dropdown-menu'>
          {
            Array.from({ length: 5 }).map((item, index) => {
              return <li key={`delivery_days_list${index}`}><button onClick={() => setDeliveryDay(format((sub(new Date(), { days: -index - 1 })), "PPPP"))} className='dropdown-item'>{format((sub(new Date(), { days: -index - 1 })), "PPPP")}</button></li>
            })
          }
        </ul>
        <form onSubmit={pay}>
          <div className='mt-3'><CardElement options={{
            style: {
              base: {
                fontSize: "16px",
                backgroundColor: "#eee",
                fontSmoothing: "always",
                fontStyle: "italic",
                iconColor: "green"
              }
            }
          }} /></div>

          <button disabled={cartItems?.length === 0 || !deliveryDay || !userDoc?.address} type='submit' className="btn btn-danger mt-3 ps-5 pe-5" ><span style={{ width: "15px", height: "15px", fontSize: "10px" }} className={`${uploadingSpinner}`}></span> pay now</button>
        </form>
      </div>
    </div>
  )
}

export default Payment