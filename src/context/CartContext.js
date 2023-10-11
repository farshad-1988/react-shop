import { createContext, useContext, useEffect, useState } from "react"
import { syncLocalStorageDbAndContext } from "../firebase.config"
import { UserContext } from "./UserContext"


export const CartContext = createContext()






const CartContextProvider = ({children})=>{
    const [cartItems , setCartItems] = useState(JSON.parse(localStorage.getItem("cart")) || [])
    const [totalCountAndPrice , setTotalCountAndPrice] = useState({totalCount:0 , totalPrice:0})
    const {currentUser} = useContext(UserContext)
    const [change , setChange] = useState(true)
    const [newSignIn , setNewSignIn] = useState("refresh")


    const increment =  (itemInfo , isItemInCart)=>{
        if(!isItemInCart){
            setCartItems((prev)=>([...prev , {...itemInfo , countInCart:1 , loading:true}]))
        }else{
            setCartItems((prev)=>{
                return prev.map((item)=>{
                    return itemInfo.id === item.id ? {...itemInfo , countInCart:item.countInCart+1 , loading:true} : item
                })
            }
            )
        }
        setNewSignIn("refresh")
        setChange((prev)=>!prev)
    }
    const decrement = (itemInfo,isItemInCart)=>{
            
        if(isItemInCart.countInCart===1){
            setCartItems((prev)=>prev.filter((item)=>item.id!==itemInfo.id))
        }else{
            setCartItems((prev)=>{
                return prev.map((item)=>{
                    return itemInfo.id === item.id ? {...itemInfo , countInCart:item.countInCart-1 , loading:true} : item
                })
            })
        }
        setNewSignIn("refresh")
        setChange((prev)=>!prev)
    }


    useEffect(()=>{
        setChange((prev)=>!prev)
    },[])

    
    //set new sign in as dependancy for signup and first time you signed in true
    useEffect(()=>{
        const f1 = async ()=>{
            const newv = await syncLocalStorageDbAndContext(currentUser , cartItems , newSignIn )
            const newCartItem = newv.map((item)=>({...item , loading:false}))
            setCartItems(newCartItem)
        }
        f1()
    },[change,newSignIn])
    

    useEffect(()=>{
        setTotalCountAndPrice({
            totalCount:cartItems?.reduce((lastCount , current)=>lastCount + current.countInCart ,0),
            totalPrice:cartItems?.reduce((lastTotalPrice , current)=>lastTotalPrice + current.countInCart*current.price ,0)
    })
    
    },[cartItems , currentUser])


    return (
    <CartContext.Provider value={{increment , decrement , cartItems , setCartItems , totalCountAndPrice , setTotalCountAndPrice , setNewSignIn , setChange}}>
        {children}
    </CartContext.Provider>
    )
}

export default CartContextProvider

