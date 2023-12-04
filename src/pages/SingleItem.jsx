import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { singleItemFullInfo } from '../firebase.config'
import ItemCounter from '../components/ItemCounter'

function SingleItem() {
    const { productId, category } = useParams()
    const [itemFullInfo, setItemFullInfo] = useState([])
    const { imagesUrl, name, price, countInStock, firstPicture } = itemFullInfo


    useEffect(() => {
        const CATEGORY = category.toLocaleUpperCase()

        const getSingleItemData = async () => {
            const itemInfo = await singleItemFullInfo(CATEGORY, productId)
            setItemFullInfo(itemInfo)
        }
        getSingleItemData()
    }, [category, productId])



    return (<div className='row m-auto'>
        <div id="demo" className="carousel slide mt-3 col-lg-5 col-md-6 col-sm-11 col-11" data-bs-ride="false">
            <div className="carousel-indicators">
                {imagesUrl?.map((image, index) =>
                    <button key={`img-btn${index}`} type="button" data-bs-target="#demo" data-bs-slide-to={index} className={index === 0 && "active"}></button>
                )}
            </div>

            <div className="carousel-inner">
                {imagesUrl?.map((image, index) =>
                (<div key={`img-pic${index}`} className={`carousel-item ${index === firstPicture && "active bg-image hover-zoom"}`} >
                    <img src={image} alt="" className="d-block w-100 rounded-3" />
                </div>)
                )}
            </div>

            <button className="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
                <span className="carousel-control-prev-icon"></span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
                <span className="carousel-control-next-icon"></span>
            </button>
        </div>

        <div className='mt-4 m-auto col-lg-5 col-md-5 col-sm-11 col-11'>
            <p>name of product: {name}</p>
            <p>category: {category}</p>
            <p>price: {price}$</p>
            <p>remain in stock: {countInStock}</p>
            <div className='ms-5'><ItemCounter itemInfo={itemFullInfo} /></div>

        </div>
    </div>
    )
}

export default SingleItem