import ItemCounter from "./ItemCounter"
import { useNavigate } from "react-router-dom"



const Item = ({ itemInfo }) => {
    const { imagesUrl, price, countInStock, category, id, firstPicture } = { ...itemInfo }
    const navigate = useNavigate()

    const goToSingleItem = () => {
        navigate(`/${category}/${id}`)
    }


    //just enter items in cart
    return (
        // <div className="row">
        <div className="m-2 rounded-2 ff-size-item-category">
            <div className="container mt-3">
                <img className="w-100 img-thumbnail" src={imagesUrl[firstPicture]} alt="anotherPic" onClick={goToSingleItem} />
                <div className="container d-flex w-100 justify-content-between mt-2 h-auto" >
                    <div className="d-flex flex-column w-50 h-100">
                        <h2>{price}$</h2>
                        <p className="text-danger text-nowrap ff-font-12" >number in stock {countInStock}</p>
                    </div>
                    <div>
                        <ItemCounter itemInfo={itemInfo} />
                    </div>
                </div>
            </div>
        </div>
        // </div>
    )
}


export default Item