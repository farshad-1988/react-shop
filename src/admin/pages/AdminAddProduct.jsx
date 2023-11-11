import React from 'react'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject
} from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'
import { auth, db } from '../../firebase.config'
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { useRef } from 'react'
import AdminInputImage from '../components/AdminInputImage'


const AdminAddProduct = () => {

  const [productId, setProductId] = useState("")
  const categoryRef = useRef()
  const nameRef = useRef()
  const priceRef = useRef()
  const countRef = useRef()
  const [imagesUrl, setImagesUrl] = useState([])
  const [productInfo, setProductInfo] = useState({})
  const [uploadingSpinner , setUploadingSpinner]=useState("")
  const [dataUploaded , setDataUploaded] = useState(false)
  const [firstPicture , setFirstPicture] = useState(0)


  const submitFormToDB = async (e) => {
    e.preventDefault()
    setUploadingSpinner("spinner-border")
    let { name, category, price , countInStock } = { ...productInfo }
    category = category.trim()
    if(!name || !category || !price || !countInStock || !imagesUrl.length){
      toast.error("please complete all fields...")
      return
    }
    const objToUpload = { name, category, subCategory: category, countInStock, price, purchasedCount: 0, splittedName: name.toLocaleLowerCase().split(" "), id: productId, dateAdded: new Date(), imagesUrl ,firstPicture}
    const CATEGORY = category.toLocaleUpperCase()
    const docRef = doc(db, "PRODUCTS", CATEGORY, CATEGORY, productId)
    try {
      const additionalDocRef = doc(db, "ADDITIONAL_INFO", "CATEGORIES")
      const allCat = await getDoc(additionalDocRef)
      let catData = allCat.data()

      !catData.categories.includes(category) && await updateDoc(additionalDocRef, { categories: [...catData.categories, category] })

      await setDoc(docRef, objToUpload)
      toast.success("file uploaded successfully")
      setDataUploaded(true)
      setProductId(uuidv4())
      
      // setTimeout(() => {
      //   window.location.reload()
      // }, 1000);


      setUploadingSpinner("")
    } catch (error) {
      console.log(error)
      setUploadingSpinner("")
      toast.error("something's wrong,check the console...")
      setUploadingSpinner("")
    } 
  }

  // console.log(cat)


  // Store image in firebase






  const updateProductInfo = (e) => {
    setDataUploaded(false)
    setProductInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }
  useEffect(()=>{
    categoryRef.current.value = ""
    nameRef.current.value = ""
    countRef.current.value = ""
    priceRef.current.value = ""
    setImagesUrl([])
    setProductInfo({})
    
  },[productId])



  useEffect(() => {
    setProductId(uuidv4())
  }, [])




  function getImagesUrl(imagesURL , activeImage) {
    setImagesUrl(imagesURL)
    setFirstPicture(activeImage)
  }

  

  return (

    <div className='row'>
      <div className='d-flex flex-column col-12 col-md-6 m-auto align-items-center'>
        <div className='d-flex flex-column'>
          <p className='mt-2 '>product ID: {productId}</p>
          <div className="mt-2">
            <span>category : </span>
            <input disabled={imagesUrl.length} ref={categoryRef} onChange={updateProductInfo} name='category' className="form-control" type="text" placeholder="enter category..." />
            {/* {errors?.category?.message && <p className="text-danger">{errors?.category?.message}</p>} */}
          </div>
          <p className='mb-2 mt-3 text-capitalize'>
            please select images for uploading in database(max 4)
          </p>
        </div>

        <AdminInputImage items={{ category: productInfo?.category, productId , dataUploaded }} getImagesUrl={getImagesUrl} />
      </div>

      <form className="container m-auto col-12 col-md-5 row" onSubmit={submitFormToDB}>
        <div className="mt-2">
          <span>name :</span>
          <input required ref={nameRef} onChange={updateProductInfo} className="form-control" name='name' type="text" placeholder="products name..." />
          {/* {errors?.name?.message && <p className="text-danger">{errors?.name?.message}</p>} */}
        </div>

        {/* <div className="mt-2 col-6">
          <span>subCategory</span>
          <input className="form-control" type="text" placeholder="please enter your subCategory..." {...register("subCategory")} />
          {errors?.subCategory?.message && <p className="text-danger">{errors?.subCategory?.message}</p>}
        </div> */}
        <div className="mt-2">
          <span>count in stock :</span>
          <input ref={countRef} onChange={updateProductInfo} className="form-control" type="number" name='countInStock' placeholder="warehouse count..." />
        </div>
        <div className="mt-2">
          <span>price : </span>
          <input required ref={priceRef} onChange={updateProductInfo} className="form-control" type="number" name='price' placeholder="price in dolar..." />
          {/* {errors?.price?.message && <p className="text-danger">{errors?.price?.message}</p>} */}
        </div>
        <div>
          <div className="text-center">
            <button disabled={!imagesUrl.length} className="mt-5 btn btn-primary w-50" style={{fontSize:"20px"}} type="submit"><span style={{width:"15px", height:"15px", fontSize:"10px"}} className={`${uploadingSpinner}`}></span> upload data </button>
          </div>

        </div>
      </form>
    </div>

  )
}


{/* !Object.entries(progressBarContent).length */ }
{/* disabled={( !Object.entries(progressBarContent).every((bar) => (bar[1] === 100))) ? true : false} */ }






export default AdminAddProduct





