import { createContext, useEffect, useReducer, useState } from "react"
import { getCategoriesNameFromDB } from "../firebase.config"


export const ShopContext = createContext()



const ShopContextProvider = ({children})=>{
    const [categoriesTitle , setCategoriesTitle] = useState([])
    const [homePageItems , setHomePageItems] = useState([])
    const [singleCategoryToShow , setSingleCategoryToShow] = useState([])
    

    useEffect(()=>{
        const getCategories = async()=>{
            const categories = await getCategoriesNameFromDB()
            setCategoriesTitle(categories)
            console.log(categoriesTitle)
        }
        getCategories()
    },[])

    return (
    <ShopContext.Provider value={{ categoriesTitle, setHomePageItems , homePageItems , setSingleCategoryToShow , singleCategoryToShow}}>
        {children}
    </ShopContext.Provider>
    )
}

export default ShopContextProvider

