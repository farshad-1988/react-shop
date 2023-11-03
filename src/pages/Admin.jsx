import React from 'react'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'
import { auth, db } from '../firebase.config'
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { useRef } from 'react'


const Admin = () => {
  const [formImages, setFormImages] = useState([])
  const [imagesUrl, setImagesUrl] = useState([])
  const [productId, setProductId] = useState("")
  const [cat, setCat] = useState("")
  const imageBtnRef = useRef()
  const [imageBtnClass, setImageBtnClass] = useState("btn btn-primary")
  const [registerEnable, setRegisterEnable] = useState(false)
  const [progressBarContent, setProgressBarContent] = useState([])
  console.log(progressBarContent)
  const userSchema = yup.object().shape({
    name: yup.string().min(3).required("please enter a valid name"),
    category: yup.string().min(2).required("please enter a valid family"),
    subCategory: yup.string().min(2).required("please enter a valid family"),
    countInStock: yup.number().required("enter number"),
    price: yup.number().required("enter price")
  })

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(userSchema) })

  const submitFormToDB = async ({ name, category, subCategory, countInStock, price }) => {
    const objToUpload = { name, category, subCategory, countInStock, price, purchasedCount: 0, splittedName: name.split(" "), id: productId, dateAdded: new Date(), imagesUrl }
    const uuid = uuidv4()
    setProductId(uuid)
    const docRef = doc(db, "PRODUCTS", category, subCategory, productId)
    try {
      const additionalDocRef = doc(db, "ADDITIONAL_INFO", "CATEGORIES")
      const allCat = await getDoc(additionalDocRef)
      let catData = allCat.data()
      console.log(1)
      !catData.categories.includes(category) && await updateDoc(additionalDocRef, { categories: [...catData.categories, category] })
      console.log(2)
      await setDoc(docRef, objToUpload)
      toast.success("file uploaded successfully")
    } catch (error) {
      console.log(error)
      toast.error("something's wrong,check the console...")
    } finally {
      // window.location.reload(true)
    }
  }


  // Store image in firebase
  const storeImage = async (image) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage()
      const fileName = `${image.name}`
      const storageRef = ref(storage, `${cat}/${productId}/` + fileName)

      const uploadTask = uploadBytesResumable(storageRef, image)

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          setProgressBarContent((prev) => ({ ...prev, [image.name]: progress }))
          // switch (snapshot.state) {
          //   case 'paused':
          //     console.log('Upload is paused')
          //     break
          //   case 'running':
          //     console.log('Upload is running')
          //     break
          //   default:
          //     break
          // }

        },
        (error) => {
          reject(error)
        },
        () => {
          console.log("done")
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL)
          })
        }
      )
    })
  }


  const uploadImages = async (e) => {
    e.preventDefault()

    const imgUrls = await Promise.all(
      formImages.map((image) => storeImage(image))
      ).catch(() => {
        // setLoading(false)
        toast.error('Images not uploaded')
        return
      })
      if(imgUrls){
        setImageBtnClass("btn btn-success")
        imageBtnRef.current.textContent = "successfully uploaded"
        setImagesUrl(imgUrls)
      }
  }


  const onMutate = (e) => {
    setFormImages((prev) => [...prev, ...e.target.files])
  }
  useEffect(() => {
    const productId = uuidv4()
    setProductId(productId)
  }, [])
  const [bool, setBool] = useState(true)




  return (
    <>
      <p className='text-center mt-2'>productId: {productId}</p>

      <form onSubmit={uploadImages} className='d-flex flex-column w-25 m-auto align-items-center'>
        <p className='mb-3'>
          maximum allowed images are 4
        </p>
        <input
          className='mb-3 mt-3'
          type='file'
          id='images'
          onChange={onMutate}
          max='4'
          accept='.jpg,.png,.jpeg'
          multiple
          required
        />
        <button className={imageBtnClass} type='submit' ref={imageBtnRef}>upload images</button>
      </form>
      <div className='w-25 m-auto mt-2'>
        {formImages.map((image, index) => (<div className={`progress mt-2 ${!progressBarContent[image.name] ? "d-none" : "d-block" }` }>
          <div key={`progressBar${index}`} className={`progress-bar`} style={{ width: `${progressBarContent[image.name]}%` }}>{Math.floor(progressBarContent[image.name])}%</div>
        </div>))}
      </div>

      

      <form className="container m-auto col-8 row" onSubmit={handleSubmit(submitFormToDB)}>
        <div className="mt-2 col-6">
          <span>name</span>
          <input className="form-control" type="text" placeholder="please enter your firstname..." {...register("name")} />
          {errors?.name?.message && <p className="text-danger">{errors?.name?.message}</p>}
        </div>
        <div className="mt-2 col-6">
          <span>category</span>
          <input onChange={(e) => setCat(e.target.value)} className="form-control" type="text" placeholder="please enter your category..." {...register("category")} />
          {errors?.category?.message && <p className="text-danger">{errors?.category?.message}</p>}
        </div>
        <div className="mt-2 col-6">
          <span>subCategory</span>
          <input className="form-control" type="text" placeholder="please enter your subCategory..." {...register("subCategory")} />
          {errors?.subCategory?.message && <p className="text-danger">{errors?.subCategory?.message}</p>}
        </div>
        <div className="mt-2 col-6">
          <span>countInStock:</span>
          <input className="form-control" type="number" placeholder="please enter your countInStock..." {...register("countInStock")} />
          {errors?.countInStock?.message && <p className="text-danger">{errors?.countInStock?.message}</p>}
        </div>
        <div className="mt-2 col-6">
          <span>price: </span>
          <input className="form-control" type="text" placeholder="please enter price..." {...register("price")} />
          {errors?.price?.message && <p className="text-danger">{errors?.price?.message}</p>}
        </div>
        <div>



          <div className="text-center">
            <button disabled={progressBarContent.length === 0 ? true : !Object.entries(progressBarContent).every((bar) => (bar[1] == 100))} className="mt-3 btn btn-primary w-50" type="submit">register</button>
          </div>

        </div>
      </form>


    </>
  )
}






export default Admin





