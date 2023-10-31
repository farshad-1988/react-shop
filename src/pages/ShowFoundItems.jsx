import { useContext } from "react"
import { ShopContext } from "../context/ShopContext"
import Item from "../components/Item"
import LoadingPageComponent from "../components/LoadingPageComponent"
import { useParams } from "react-router-dom"

const ShowFoundItems = ()=>{
    const {searchedItem ,loadingPage} = useContext(ShopContext)
    const {searchedWord} = useParams()


    return (
        loadingPage ? <LoadingPageComponent/> : searchedItem.every((arr)=>arr.length===0) ? <h1>sorry, there isn't any item with category or name <span className="text-danger">{searchedWord}</span></h1> : <div>
            {searchedItem?.map((category)=>{
                if(category.length) {
                    return (
                    <div className="row ms-3">
                        <h2>{category[0].category}</h2>
                        {category.map((item,index)=><Item key={index} itemInfo = {{...item}}/>)}
                    </div>)
                }
            })}
        </div>
   
    )
}

export default ShowFoundItems