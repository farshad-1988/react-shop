import React from 'react'
import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import PurchasedItemsDetailsEach from '../components/PurchasedItemsDetailsEach'

const PurchaseItemsDetailPage = () => {
  const { userDoc} = useContext(UserContext)
  

  const {purchaseId}= useParams()
  
  
 
  const products =userDoc.purchasedItems?.find((item)=>item.summaryPurchaseInfo.purchasedId === purchaseId)
  
  


  return (
    <>
    {products.purchasedItems.map((product , index)=>{
      return <PurchasedItemsDetailsEach key={`purchasedItemsEachDetails${index}`} product={product}/>
    })}
</>
  )
}

export default PurchaseItemsDetailPage