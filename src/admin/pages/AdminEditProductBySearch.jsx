import React, { useEffect } from 'react'
import EdittingItem from '../components/EdittingItem'
import { ShopContext } from '../../context/ShopContext'
import { useContext } from 'react'
import LoadingPageComponent from '../../components/LoadingPageComponent'
import { useParams } from 'react-router-dom'
import { getCategoriesNameFromDB, searchFirestore } from '../../firebase.config'

const AdminEditProductBySearch = () => {
  const {searchedItem ,loadingPage , dispatch} = useContext(ShopContext)
  const {searchedWord} = useParams()


    const getEditedProductId = (productSpec)=>{
        let newProducts
        if(typeof productSpec === "string"){
        newProducts = searchedItem.map((arr)=>{
            return arr.filter((product)=>product.id !== productSpec)
        })
        dispatch({ type: "SET_SEARCHED_ITEMS", payload: newProducts })
        }else {
        newProducts = searchedItem.map((arr)=>{
            return arr?.map((product)=>{
                if(product.id===productSpec.id)return productSpec
                else return product
            })
        })
        dispatch({ type: "SET_SEARCHED_ITEMS", payload: newProducts })
        }
    }

     useEffect(()=>{    
        const getSearchedDataOnReload = async ()=>{
            const categories = await getCategoriesNameFromDB();
            const allFoundedItems = await searchFirestore(categories.categories, searchedWord);
            dispatch({ type: "SET_SEARCHED_ITEMS", payload: allFoundedItems });
        }
        getSearchedDataOnReload()
     }
     ,[])

    return (
      loadingPage ? <LoadingPageComponent/> : searchedItem.every((arr)=>arr.length===0) ? <h1>sorry, there isn't any item with category or name <span className="text-danger">{searchedWord}</span></h1> : <div>
          {searchedItem?.map((category)=>{
              if(category.length) {
                  return (
                  <div className="m-auto" style={{width:"95%"}}>
                      <h2 className=' mt-2 text-center'>{category[0].category}</h2>
                      {category.map((item,index)=><EdittingItem key={`editedItemsInSearch${index}`} item = {item} getEditedProductId={getEditedProductId}/>)}
                  </div>)
              }
          })}
      </div>
 
  )
}

export default AdminEditProductBySearch