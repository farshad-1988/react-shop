import { useContext, useEffect, useState } from "react"
import { CartContext } from "../context/CartContext"
import { UserContext } from "../context/UserContext"
import { syncLocalStorageDbAndContext } from "../firebase.config"




const Item = (props)=>{
    const {imageUrl , price , id } = {...props.itemInfo}
    const {currentUser} = useContext(UserContext)
    const {cartItems , setCartItems , setChange } = useContext(CartContext)
    const [loading , setLoading] = useState(false)
    
    const isItemOnCart = cartItems?.find((item)=>item.id===id)

    const increment = (cartItem , itemInCart)=>{
        setLoading(true)
        if(!itemInCart){
            setCartItems((prev)=>([...prev , {...cartItem , count:1}]))
        }else{
            setCartItems((prev)=>{
                return prev.map((item)=>{
                    return itemInCart.id === item.id ? {...item , count:item.count+1} : item
                })
            }
            )
        }
        // setLoading(false)
        // setChange((prev)=>!prev)
    }
    const decrement = (cartItem,itemInCart)=>{
        setLoading(true)
        console.log(cartItems)
        if(itemInCart.count===1){
            setCartItems((prev)=>(prev.filter((item)=>item.id!==cartItem.id)))
        }else{
            setCartItems((prev)=>{
                return prev.map((item)=>{
                    return itemInCart.id === item.id ? {...item , count:item.count-1} : item
                })
            })
        }


    }
    
    const addItem = ()=>increment(props.itemInfo , isItemOnCart)

    const removeItem = ()=>decrement(props.itemInfo , isItemOnCart)

    useEffect(()=>{
         const  f2 = async ()=>{
            const val = await syncLocalStorageDbAndContext(currentUser , cartItems )
            setCartItems(val)
            setLoading(false)
        }
        f2()
    },[loading])

    return (
    // <div className="row">
        <div className="col-3 m-3 bg-secondary rounded-2">
            <div className="container mt-3">
            <img className="w-100 img-thumbnail" src={imageUrl} alt="anotherPic" style={{ height:"200px"}}/>
            <div className="container d-flex">
                <h2 className="ms-1">{price}$</h2>
                {loading ? "loading" : !isItemOnCart ? <button onClick={addItem} className="btn ms-2">add to card</button> : 
                <div className="d-flex ms-5 align-content-center" style={{height:"50px"}}>
                    <button className="btn" onClick={removeItem}> - </button>
                    <span className="align-self-center">{isItemOnCart?.count || 0}</span>
                    <button className="btn" onClick={addItem}> + </button>
                </div>
                }
            </div>
            </div>
        </div>  
    // </div>
    )
}


export default Item