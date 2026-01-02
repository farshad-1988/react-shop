import React from 'react'

const PurchasedItemsDetailsEach = ({product}) => {
    const {imagesUrl , category , countInCart:boughtCount , name , price  ,id}={...product}
  return (
    <div className='row m-auto'>
      <div id={`${id}`} className="carousel slide mt-3 col-lg-5 col-md-6 col-sm-11 col-11" data-bs-ride="false">
          <div className="carousel-indicators">
              {imagesUrl?.map((image, index) => 
                  <button key={`img-btn${index}`} type="button" data-bs-target="#demo" data-bs-slide-to={index} className={index===0 && "active"}></button>
              )}
          </div>

          <div className="carousel-inner">
              {imagesUrl?.map((image, index) => 
                  (<div key={`img-pic${index}`} className={`carousel-item ${index===1 && "active bg-image hover-zoom"}`} >
                          <img  src={image} alt="" className="d-block w-100 rounded-3"/>
                  </div>)
              )}
          </div>

          <button className="carousel-control-prev" type="button" data-bs-target={`#${id}`} data-bs-slide="prev">
              <span className="carousel-control-prev-icon"></span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target={`#${id}`} data-bs-slide="next">
              <span className="carousel-control-next-icon"></span>
          </button>
      </div>

      <div className='mt-4 m-auto col-lg-5 col-md-5 col-sm-11 col-11'>
          <p>name of product: {name}</p>
          <p>category: {category}</p>
          <p>price: {price}$</p>
          <p>number bought :{boughtCount}</p>
      </div>
      </div>
  )
}

export default PurchasedItemsDetailsEach