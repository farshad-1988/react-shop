import { createContext, useEffect, useReducer, useState } from "react"


export const ShopContext = createContext()



const ShopContextProvider = ({children})=>{
    
    const [homePageItems , setHomePageItems] = useState([])
    const [singleCategoryToShow , setSingleCategoryToShow] = useState([])
    

    // useEffect(()=>{
    //     console.log(homePageItems)
    // },[homePageItems])

    return (
    <ShopContext.Provider value={{ setHomePageItems , homePageItems , setSingleCategoryToShow , singleCategoryToShow}}>
        {children}
    </ShopContext.Provider>
    )
}

export default ShopContextProvider

