import {useParams } from "react-router-dom"
import { getSingleCategoryItem } from "../firebase.config"
import { useContext, useEffect } from "react"
import { ShopContext } from "../context/ShopContext"
import Item from "../components/Item"


const CategoryPage = ()=>{
    const {category} = useParams()
    const {setSingleCategoryToShow,singleCategoryToShow , setLoadingPageShow} = useContext(ShopContext)


    useEffect(()=>{
        const getItems = async (category)=>{
            const tenItems= await getSingleCategoryItem(category)
            setSingleCategoryToShow(tenItems)
        }
        getItems(category)
    },[])
    
    

    // itemInfo must come from cart
    return (
        <div className="row ms-3">
            {singleCategoryToShow?.map((item , index) => {
                return <Item key={index} itemInfo ={ item}/>
        })}
        </div>
    )
}



export default CategoryPage