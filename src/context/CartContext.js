import { createContext, useContext, useEffect, useReducer, useState } from "react"
import { syncLocalStorageDbAndContext } from "../firebase.config"
import { UserContext } from "./UserContext"
import { cartReducer, initialCartState } from "../reducers/cartReducer"


export const CartContext = createContext()



const CartContextProvider = ({children})=>{
    const [state , dispatch] = useReducer(cartReducer , initialCartState)
    const {currentUser} = useContext(UserContext)
    const [itemIdLoadingFalse , setItemIdLoadingFalse] = useState([])
    // const [change , setChange] = useState(true)



    const increment = async (itemInfo , isItemInCart)=>{
        let newItems
        if(!isItemInCart){
            newItems = [...state.cartItems , {...itemInfo , countInCart:1 , loading:true}]
        }else{
            newItems = state.cartItems.map((item)=>{
                return itemInfo.id === item.id ? {...itemInfo , countInCart:item.countInCart+1 , loading:true} : item
            })
        }
        dispatch({type:"SET_CART_ITEMS" , payload:newItems})
        await syncLocalStorageDbAndContext(currentUser ,newItems)
        setItemIdLoadingFalse((prev)=>[...prev , itemInfo.id])
        dispatch({type:"CHANGING_IN_CART"})
    }

    const decrement =async (itemInfo,isItemInCart)=>{
        let newItems
        if(isItemInCart.countInCart===1){
            newItems = state.cartItems.filter((item)=>item.id!==itemInfo.id)

        }else{
                newItems =  state.cartItems.map((item)=>{
                    return itemInfo.id === item.id ? {...itemInfo , countInCart:item.countInCart-1 , loading:true} : item
                })

        }
        dispatch({type:"SET_CART_ITEMS" , payload:newItems})
        try {
            await syncLocalStorageDbAndContext (currentUser , newItems )
        } catch (error) {
            console.log(error)
            dispatch({type:"SET_CART_ITEMS" , payload:state.cartItems})
        }
        
        if(!(isItemInCart.countInCart === 1)){
            setItemIdLoadingFalse((prev)=>[...prev , itemInfo.id])
        }
        dispatch({type:"CHANGING_IN_CART"})
    }

    useEffect(()=>{
        dispatch({type:"CHANGING_IN_CART"})
    },[])

    
    //set new sign in as dependancy for signup and first time you signed in true
    useEffect(()=>{
        console.log(itemIdLoadingFalse)
        const f1 = async ()=>{

            const newItem = state.cartItems.map((item)=>{
                if(itemIdLoadingFalse?.includes(item.id)){
                    setItemIdLoadingFalse((prev)=>prev.filter((itemId)=>item.id!==itemId))
                    return ({...item , loading:false})
                } else{
                    return item
                }
            })
            

            dispatch({type:"SET_CART_ITEMS" , payload:newItem})
            dispatch({type:"SET_TOTAL_COUNT_AND_PRICE" , 
            payload:{
                totalCount:state.cartItems?.reduce((lastCount , current)=>lastCount + current.countInCart ,0),
                totalPrice:state.cartItems?.reduce((lastTotalPrice , current)=>lastTotalPrice + current.countInCart*current.price ,0)
            }})
        }
        f1()
    },[state.change])
    
    
    // useEffect(()=>{
    //     },[state.cartItems , currentUser])


    return (
    <CartContext.Provider value={{increment , decrement , cartItems:state.cartItems, cartDispatch:dispatch , totalCountAndPrice:state.totalCountAndPrice  , newSignIn:state.newSignIn}}>
        {children}
    </CartContext.Provider>
    )
}

export default CartContextProvider

