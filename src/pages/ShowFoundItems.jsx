import { useContext } from "react"
import { ShopContext } from "../context/ShopContext"
import Item from "../components/Item"

const ShowFoundItems = ()=>{
    const {foundedItemsToShow } = useContext(ShopContext)

    console.log(foundedItemsToShow)
    


    return (
   
        
        <div>
            {foundedItemsToShow?.map((category)=>{
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