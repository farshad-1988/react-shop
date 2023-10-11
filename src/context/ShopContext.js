import { createContext, useEffect, useState } from "react"
import { getCategoriesNameFromDB, getSingleCategoryItem, getThreeOfEachCat } from "../firebase.config"
import { useNavigate, useParams } from "react-router-dom"


export const ShopContext = createContext()



const ShopContextProvider = ({children})=>{
    const [categoriesTitle , setCategoriesTitle] = useState([])
    const [homePageItems , setHomePageItems] = useState([])
    const [singleCategoryToShow , setSingleCategoryToShow] = useState([])
    const [foundedItemsToShow , setFoundedItemsToShow] = useState()
    const [loadingPageShow , setLoadingPageShow] = useState(true)


    
    useEffect(()=>{
        const getItemsForHome = async()=>{
            const categories = await getCategoriesNameFromDB()
            const allItems =  await getThreeOfEachCat(categories)
            setHomePageItems(allItems)
            setLoadingPageShow(false)
        }
        getItemsForHome()
    },[])

    useEffect(()=>{
        const getCategories = async()=>{
            const categories = await getCategoriesNameFromDB()
            setCategoriesTitle(categories)
        }
        getCategories()
    },[])

    return (
    <ShopContext.Provider value={{loadingPageShow , setLoadingPageShow,foundedItemsToShow , setFoundedItemsToShow ,  categoriesTitle, setHomePageItems , homePageItems , setSingleCategoryToShow , singleCategoryToShow}}>
        {children}
    </ShopContext.Provider>
    )
}

export default ShopContextProvider

