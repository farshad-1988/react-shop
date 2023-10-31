import { createContext, useEffect, useReducer, useState } from "react"
import { getCategoriesNameFromDB, getShopingTips, getSingleCategoryItem, getThreeOfEachCat } from "../firebase.config"
import { useNavigate, useParams } from "react-router-dom"
import { initialShopState, shopReducer } from "../reducers/shopReducer"


export const ShopContext = createContext()



const ShopContextProvider = ({children})=>{
    const [state , dispatch] = useReducer(shopReducer , initialShopState)

    

 
    useEffect(()=>{
        const getItemsForHome = async()=>{
            const categoriesAndTips = await getCategoriesNameFromDB()
            const allItems =  await getThreeOfEachCat(categoriesAndTips.categories)
            const {categories , shoppingTips} = {...categoriesAndTips}
            dispatch({type:"SET_HOME_ITEMS_AND_CATEGORIES" , payload:{categoriesTitle:categories, shoppingTips , homePageItems:allItems}})
        }
        getItemsForHome()
    },[])


    return (
    <ShopContext.Provider value={{dispatch,lastItemLoadedInSingleCat:state.lastItemLoadedInSingleCat ,  singleCategoryToShow : state.singleCategoryToShow,loadingPage:state.loadingPage,searchedItem:state.searchedItem ,homePageItems:state.homePageItems , shoppingTips:state.shoppingTips}}>
        {children}
    </ShopContext.Provider>
    )
}

export default ShopContextProvider

