import { createContext, useEffect, useReducer } from "react"
import { getCategoriesNameFromDB, getThreeOfEachCat } from "../firebase.config"
import { initialShopState, shopReducer } from "../reducers/shopReducer"
import { useState } from "react"


export const ShopContext = createContext()



const ShopContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(shopReducer, initialShopState)



    useEffect(() => {
        const getItemsForHome = async () => {
            const categoriesAndTips = await getCategoriesNameFromDB()
            const allItems = await getThreeOfEachCat(categoriesAndTips.categories)
            const { categories, shoppingTips } = { ...categoriesAndTips }
            dispatch({ type: "SET_HOME_ITEMS_AND_CATEGORIES", payload: { categoriesTitle: categories, shoppingTips, categoriesPageItems: allItems } })
        }
        getItemsForHome()
    }, [])


    return (
        <ShopContext.Provider value={{ dispatch, lastItemLoadedInSingleCat: state.lastItemLoadedInSingleCat, singleCategoryToShow: state.singleCategoryToShow, loadingPage: state.loadingPage, searchedItem: state.searchedItem, categoriesPageItems: state.categoriesPageItems, shoppingTips: state.shoppingTips, categoriesTitle: state.categoriesTitle }}>
            {children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider

