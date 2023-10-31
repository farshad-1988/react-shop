import ItemCounter from "./ItemCounter"
import { useNavigate } from "react-router-dom"




const Item = ({itemInfo})=>{
    const {imagesUrl , price , countInStock , category , id } = {...itemInfo}
    const navigate = useNavigate()

    const goToSingleItem = ()=>{
        navigate(`/${category}/${id}`)
    }


    //just enter items in cart
    return (
    // <div className="row">
        <div className="m-2 rounded-2" style={{width:"330px" , height:"350px" , backgroundColor:"rgb(220, 220, 220)"}}>
            <div className="container mt-3">
            <img className="w-100 img-thumbnail" src={imagesUrl[0]} alt="anotherPic" style={{ height:"240px" , cursor:"pointer"}} onClick={goToSingleItem}/>
            <div className="container d-flex w-100 justify-content-between mt-2" style={{height:"100px"}}>
                <div className="d-flex flex-column w-50 h-100">
                    <h2>{price}$</h2>
                    <p className="text-danger text-nowrap   " style={{fontSize:"12px"}}>number in stock {countInStock}</p>
                </div>
                <div>
                    <ItemCounter itemInfo={itemInfo}/>
                </div>
            </div>
            </div>
        </div>  
    // </div>
    )
}


export default Item