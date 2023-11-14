
export const initialShopState={
    categoriesTitle:[],
    homePageItems:[],
    loadingPage:true,
    singleCategoryToShow:[],
    searchedItem:[],
    shoppingTips:[],
}

export const shopReducer = (state ,action)=>{
    const {type , payload} = action

    switch (type) {
        case "RESET_SINGLE_CATEGORY":
            return {
                ...state , singleCategoryToShow:[] , lastItemLoadedInSingleCat:0
            }
        case "SET_HOME_ITEMS_AND_CATEGORIES":
            return {
                ...state , ...payload , loadingPage:false
            }
        case "LOADING_PAGE_ON":
            return {
                ...state, loadingPage:true
            }
        case "SET_SINGLE_CATEGORY":
            return {
                ...state , singleCategoryToShow:payload ,  loadingPage:false
            }
        case "UPDATE_SINGLE_CATEGORY":
            return{
                ...state , singleCategoryToShow:[...state.singleCategoryToShow,...payload]
            }
        case "SET_SEARCHED_ITEMS":
            return {
                ...state , searchedItem:payload , loadingPage:false
            }
        case "ADD_CATEGORY_TO_DB":
            return {
                ...state , categoriesTitle:[...state.categoriesTitle , payload]
            }
        default:
            return state;
    }
}

