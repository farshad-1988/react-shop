import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { CartContext } from '../context/CartContext'
import {CardElement , useStripe , useElements} from "@stripe/react-stripe-js"
import axios from 'axios'
import { getDocumentUser, registerPurchasedItem } from '../firebase.config'
import { format, sub } from 'date-fns'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import QueryResponsive from '../utilities/QueryResponsive'
import "./components.css"


function Payment() {
  const navigate = useNavigate()
  const {userId} = useParams()
  const {currentUser, userDoc , setUserDoc} = useContext(UserContext)
  const {totalCountAndPrice,cartItems , cartDispatch} = useContext(CartContext)
  const {totalCount , totalPrice} = totalCountAndPrice
  const [deliveryDay , setDeliveryDay] = useState("")
  const {sm} = QueryResponsive()


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


  const pay = async(e)=>{
    e.preventDefault()

    if(!stripe || !elements)return

  

    const response = await axios.post("/.netlify/functions/create-payment-intent" , { cartItems , currentUser})
    const data = await response.data

    const clientSecret =  data.paymentIntent.client_secret

    const paymentResult= await stripe.confirmCardPayment(clientSecret , {
      payment_method:{
        card: elements.getElement(CardElement),
        billing_details:{
          name:"farshad farazdel"
        }
      }
    })
    if(paymentResult.error){
      console.log(paymentResult.error)
      return toast.error("there is a problem in payment")
    }else if(paymentResult.paymentIntent.status === "succeeded") {
      toast.success("payment was successful")
    }
    
    await registerPurchasedItem(currentUser.uid , cartItems ,{totalCountAndPrice} , deliveryDay )
    // await finalPay(currentUser ,cartItems)
    cartDispatch({type:"SET_CART_ITEMS" , payload:[]})
    cartDispatch({type:"CHANGING_IN_CART"})
    navigate(`/profile/${userId}`)
  }

  

 
  return (
    <div className={`col-12 col-lg-6 rounded text-center m-auto mb-5 p-4 w-auto h-auto r-1 mt-3 ${sm && "position-fixed"} ff-payment-box`} >
      <p>number of ordered item {totalCount}</p>
      <p>total price {totalPrice}$</p>
      {userDoc?.address ? <div>
        <p>deliver to: {userDoc?.address.city}</p>
        <p>{userDoc?.address.address1}</p>
      <p>{userDoc?.address.address2}</p>
      </div> : <span className='text-danger'>please compelete your profile info before payment</span>}
      <button type="button" className=" mb-3 btn btn-primary dropdown-toggle" data-bs-toggle="dropdown">
        {deliveryDay || "select a day to deliver"}
      </button>
      <ul name="time" className='dropdown-menu'>
        {        
          Array.from({length:5}).map((item , index)=>{
            return <li key={`delivery_days_list${index}`}><button onClick={()=>setDeliveryDay(format((sub(new Date() , {days:-index-1})) , "PPPP"))} className='dropdown-item'>{format((sub(new Date() , {days:-index-1})) , "PPPP")}</button></li>
          })
        }
      </ul>
      <form onSubmit={pay}>
        <div><CardElement options={{style:{
          base:{
            fontSize:"16px",
            backgroundColor:"#555",
            fontSmoothing:"always",
            fontStyle:"italic",
            iconColor:"green"
          }
        }}}/></div>
        
        <button disabled={cartItems?.length === 0 || !deliveryDay || !userDoc?.address} type='submit' className="btn btn-danger mt-3" >proceed to payment</button>
      </form>
    </div>
  )
}

export default Payment