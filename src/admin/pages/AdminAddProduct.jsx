import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { db } from '../../firebase.config'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { useRef } from 'react'
import AdminInputImage from '../components/AdminInputImage'
import { useContext } from 'react'
import { ShopContext } from '../../context/ShopContext'


const AdminAddProduct = () => {
  const {categoriesTitle} = useContext(ShopContext)
  const [productId, setProductId] = useState("")
  const categoryRef = useRef()
  const nameRef = useRef()
  const priceRef = useRef()
  const countRef = useRef()
  const [imagesUrl, setImagesUrl] = useState([])
  const [productInfo, setProductInfo] = useState({})
  const [uploadingSpinner, setUploadingSpinner] = useState("")
  const [dataUploaded, setDataUploaded] = useState(false)
  const [firstPicture, setFirstPicture] = useState(0)
  const [formImages, setFormImages] = useState([])
  const [messageOfNewCategory,setMessageOfNewCategory] = useState("")



  const submitFormToDB = async (e) => {
    e.preventDefault()
    setUploadingSpinner("spinner-border")
    let { name, category, price, countInStock } = { ...productInfo }
    category = category.toLocaleLowerCase().trim()
    if (!name || !category || !price || !countInStock || !imagesUrl.length) {
      toast.error("please complete all fields...")
      return
    }
    const objToUpload = { name, category, subCategory: category, countInStock, price, purchasedCount: 0, splittedName: name.toLocaleLowerCase().split(" "), id: productId, dateAdded: new Date(), imagesUrl, firstPicture }
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



  // Store image in firebase


  const getFromImages = (formFromInput) => {
    setFormImages(formFromInput)
  }



  const updateProductInfo = (e) => {
    setDataUploaded(false)
    setProductInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }))

    if(e.target.name === "category"){
      setMessageOfNewCategory("")
      setTimeout(() => {
      setMessageOfNewCategory(<p className='text-danger mt-2'>{`you will create new category as ${e.target.value}`}</p>)
    }, 1000)
  }
  }
  useEffect(() => {
    categoryRef.current.value = ""
    nameRef.current.value = ""
    countRef.current.value = ""
    priceRef.current.value = ""
    setImagesUrl([])
    setProductInfo({})

  }, [productId])



  useEffect(() => {
    setProductId(uuidv4())
  }, [])




  function getImagesUrl(imagesURL, activeImage) {
    setImagesUrl(imagesURL)
    if (activeImage >= imagesURL.length) return setFirstPicture(0)
    setFirstPicture(+activeImage)
  }

  const selectCategory = (e)=>{
    setProductInfo((prev)=>({...prev , category:e.target.value}))
    categoryRef.current.value = e.target.value
  }
  

  return (

    <div className='row'>
      <div className='d-flex flex-column col-12 col-md-6 m-auto align-items-center'>
        <div className='d-flex flex-column'>
          <p className='mt-2 '>product ID: {productId}</p>
          <div className="mt-2 border d-flex flex-column align-items-center p-3 rounded">
            <span className='align-self-start'>Category </span>
            <div className="dropdown">
              <button type="button" className="btn btn-primary dropdown-toggle mt-1" data-bs-toggle="dropdown">
                select category
              </button>
              <ul className="dropdown-menu">
                {categoriesTitle?.map((category , index)=>{
                  return <li key={`selectCat${index}`}><button onClick={selectCategory} value={category} className="dropdown-item">{category}</button></li>
                })}
              </ul>
            </div>
            <input disabled={formImages?.length} ref={categoryRef} onChange={updateProductInfo} name='category' className="form-control mt-3 text-uppercase" type="text" placeholder="enter category..." />
            {!categoriesTitle.find((category)=> category === categoryRef.current?.value) &&  categoryRef.current?.value && messageOfNewCategory}
          </div>
          <p className='mb-2 mt-3 text-capitalize'>
            please select images for uploading in database(max 4)
          </p>
        </div>

        <AdminInputImage items={{ category: productInfo?.category, productId, dataUploaded }} getImagesUrl={getImagesUrl} getFromImages={getFromImages} />
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
          <input required step=".01"   ref={priceRef} onChange={updateProductInfo} className="form-control" type="number" name='price' placeholder="price in dolar..." />
          {/* {errors?.price?.message && <p className="text-danger">{errors?.price?.message}</p>} */}
        </div>
        <div>
          <div className="text-center">
            <button disabled={!imagesUrl.length} className="mt-5 btn btn-primary w-50" style={{ fontSize: "20px" }} type="submit"><span style={{ width: "15px", height: "15px", fontSize: "10px" }} className={`${uploadingSpinner}`}></span> upload data </button>
          </div>

        </div>
      </form>
    </div>

  )
}








export default AdminAddProduct





