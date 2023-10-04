import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from "react"
import { syncLocalStorageDbAndContext, updateCartInfo } from "../firebase.config"
import { UserContext } from "./UserContext"


export const CartContext = createContext()



const CartContextProvider = ({children})=>{
    const [cartItems , setCartItems] = useState(JSON.parse(localStorage.getItem("cart"))||[])
    // const [user , setUser] = useState()
    const [totalCountAndPrice , setTotalCountAndPrice] = useState({count:0 , price:0})
    const {currentUser} = useContext(UserContext)
    const [change , setChange] = useState(true)
    const [newSignIn , setNewSignIn] = useState("refresh")
//     const increment = async(cartItem , itemInCart)=>{
//         // const itemInCart = cartItems.find((item)=>cartItem.id===item.id)
//         if(!itemInCart){
//             setCartItems((prev)=>([...prev , {...cartItem , count:1}]))
//         }else{
//             setCartItems((prev)=>{
//                 return prev.map((item)=>{
//                     return itemInCart.id === item.id ? {...item , count:item.count+1} : item
//                 })
//             }
//             )
//         }
//         setChange((prev)=>!prev)
//     }
//     const decrement =async (cartItem,itemInCart)=>{
//         console.log(cartItems)
//         if(itemInCart.count===1){
//             setCartItems((prev)=>(prev.filter((item)=>item.id!==cartItem.id)))
//         }else{
//             setCartItems((prev)=>{
//                 return prev.map((item)=>{
//                     return itemInCart.id === item.id ? {...item , count:item.count-1} : item
//                 })
//             })
//         }
//         setChange((prev)=>!prev)
// }

    // useEffect(()=>{  
        
    // },[])
    // const aaa =useCallback(async function(active){
    //     if(!active)return
    //     const newCart = await syncLocalStorageDbAndContext(user , cartItems)
    //     if(newCart === undefined)return
    //     // setCartItems(newCart)
    //     // console.log(newCart)
    // })

    // let myMemoizedResult = useMemo(() => syncLocalStorageDbAndContext)
    // let myMemoizedResult = useMemo(() => cartItems)
    // console.log(myMemoizedResult)
    // useEffect(()=>{
    //     // let active = true
    //     // updateDB(active)
        
    // },[cartItems , user])
    // // console.log(JSON.parse(localStorage.getItem("cart")))
    // const mmm = useMemo(()=>{
    //     console.log("memo")
    //     return result
    // },[cartItems])

    // const updateDB = useMemo((async()=>{
    //     const newCart = await syncLocalStorageDbAndContext(currentUser , cartItems) || []
    //     console.log(newCart)
    //     return newCart || []
    // }),[currentUser])

    // useEffect(()=>{
    //     const f1 = async ()=>{
    //         await syncLocalStorageDbAndContext(currentUser , cartItems)
    //     }
    //     f1()

    // },[currentUser,cartItems])

    // const newVal = useMemo(()=>{
    //     return JSON.parse(localStorage.getItem("cart"))
    // },[])
    useEffect(()=>{
        console.log(cartItems)
        setNewSignIn("refresh")
        setChange((prev)=>!prev)
    },[])

    
    //set new sign in as dependancy for signup and first time you signed in true
    useEffect(()=>{
        const f1 = async ()=>{
            const bb = await syncLocalStorageDbAndContext(currentUser , cartItems , newSignIn )
            setCartItems(bb)
        }
        f1()
    },[change,currentUser])
    
    useEffect(()=>{
        setTotalCountAndPrice({
            count:cartItems?.reduce((lastCount , current)=>lastCount + current.count ,0),
            price:cartItems?.reduce((lastTotalPrice , current)=>lastTotalPrice + current.count*current.price ,0)
        })
    },[cartItems])

    // useEffect(()=>{
    //     setTotalCountAndPrice({
    //         count:cartItems.reduce((lastCount , current)=>lastCount + current.count ,0),
    //         price:cartItems.reduce((lastTotalPrice , current)=>lastTotalPrice + current.count*current.price ,0)
    // })
    // },[cartItems , currentUser])


    return (
    <CartContext.Provider value={{ cartItems , setCartItems , totalCountAndPrice , setTotalCountAndPrice , setNewSignIn}}>
        {children}
    </CartContext.Provider>
    )
}

export default CartContextProvider

