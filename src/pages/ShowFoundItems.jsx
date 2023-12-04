import { useContext, useEffect } from "react"
import { ShopContext } from "../context/ShopContext"
import Item from "../components/Item"
import LoadingPageComponent from "../components/LoadingPageComponent"
import { useParams } from "react-router-dom"
import { getCategoriesNameFromDB, searchFirestore } from "../firebase.config"

const ShowFoundItems = () => {
    const { searchedItem, loadingPage, dispatch } = useContext(ShopContext)
    const { searchedWord } = useParams()


    useEffect(() => {
        const getSearchedDataOnReload = async () => {
            const categories = await getCategoriesNameFromDB();
            const allFoundedItems = await searchFirestore(categories.categories, searchedWord);
            dispatch({ type: "SET_SEARCHED_ITEMS", payload: allFoundedItems });
        }
        getSearchedDataOnReload()
    }, [dispatch, searchedWord])

    return (
        loadingPage ? <LoadingPageComponent /> : searchedItem.every((arr) => arr.length === 0) ? <h1>sorry, there isn't any item with category or name <span className="text-danger">{searchedWord}</span></h1> : <div>
            {searchedItem?.map((category) => {
                if (category.length) {
                    return (
                        <div className="row ms-3">
                            <h2>{category[0].category}</h2>
                            {category.map((item) => <Item key={`searchItems${item.id}`} itemInfo={{ ...item }} />)}
                        </div>)
                }
            })}
        </div>

    )
}

export default ShowFoundItems