import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const PurchasedItems = ({allPurchasedItemsInfo}) => {
  const navigate = useNavigate()
  const {userId} =useParams()
    const purchasedItems = allPurchasedItemsInfo[1].purchasedItems;
    const purchasedInfo =
      allPurchasedItemsInfo[1].summaryPurchaseInfo;
    let datePurchasedRegistered = purchasedInfo.purchasedAt.toDate()

    const goToPurchasedItems = ()=>{
        navigate(`purchasedItems/${purchasedInfo.purchasedId}`)
      }



    
  return (
    <div className="row mt-2 ms-2" >
    <div className=" col-6 mt-5">
      {/* gh */}
      <span className="text-danger">purchase Id: </span>
      <p>{purchasedInfo.purchasedId}</p>
      <p>{purchasedInfo.totalCountAndPrice.totalPrice}$</p>
      <p>{purchasedInfo.totalCountAndPrice.totalCount} items have purchased</p>
      <p>order date:{datePurchasedRegistered.toDateString()}</p>
      <p>deliverty date:{purchasedInfo.deliveryDay}</p>
    </div>

    <div onClick={goToPurchasedItems} className="col-6 bg-secondary rounded-circle d-flex m-3 ff-purchased-items-container btn">
      <div className="d-flex flex-wrap justify-content-center m-auto">
        {purchasedItems?.map((purchasedItem, index) => {
          if (index < 4)
            return (
              <div
                key={`purchasedItem${index}`}
                className="rounded-circle mt-1 me-1"
                style={{
                  backgroundImage: `url(${purchasedItem.imagesUrl[0]})`,
                  backgroundSize: "cover",
                  width:"95px",
                  height:"95px",
                }}
              ></div>
            );
        })}
      </div>
    </div>
  </div>
  )
}

export default PurchasedItems