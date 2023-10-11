import ItemCounter from "./ItemCounter"




const Item = ({itemInfo})=>{
    const {imagesUrl , price , countInStock } = {...itemInfo}

    //just enter items in cart
    return (
    // <div className="row">
        <div className="col-3 m-3 bg-secondary rounded-2">
            <div className="container mt-3">
            <img className="w-100 img-thumbnail" src={imagesUrl[0]} alt="anotherPic" style={{ height:"200px"}}/>
            <div className="container d-flex">
                <div className="d-flex flex-column">
                    <h2 className="ms-1">{price}$</h2>
                    <p className="text-danger" style={{fontSize:"12px"}}>number in stock {countInStock}</p>
                </div>
                <ItemCounter itemInfo={itemInfo}/>
                
            </div>
            </div>
        </div>  
    // </div>
    )
}


export default Item