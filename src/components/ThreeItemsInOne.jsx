import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ShopContext } from "../context/ShopContext"



const ThreeItemsInOne = (props)=>{
    const {dispatch} = useContext(ShopContext)
    const threeItems =  [...props.threeItems]
    const navigate = useNavigate()

    const goToCategory=()=>{
        navigate(`category/${threeItems[0].category}`)
    }


    

    return (
    <div className="btn container col-3 text-center pt-3 border border-1 border-secondary rounded-2 m-2 ff-items-category-home"  onClick={goToCategory}>
        <div className="row ">
            {threeItems.map((item , index)=>{
                return <div className={` ${index === 2 ? "container" : "col-6"}`}><img key={`threeItems${index}`} src={item.imagesUrl[0]} alt=""  className="rounded-circle " width="110" height="110"/></div> 
            })}
        </div>
        <h2>{threeItems[0]?.category}</h2>
    </div>
    
    )
}


export default ThreeItemsInOne