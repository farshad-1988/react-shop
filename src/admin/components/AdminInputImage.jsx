import { deleteObject, getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { useEffect } from "react"
import { useRef } from "react"
import { useState } from "react"
import { toast } from "react-toastify"


const AdminInputImage = ({ items: { category, productId , dataUploaded}, getImagesUrl , getFromImages }) => {

  const storage = getStorage()
  const [formImages, setFormImages] = useState([])
  const [imagesUrl, setImagesUrl] = useState([])
  const [activeImage , setActiveImage] = useState(0)
  const [progressBarContent, setProgressBarContent] = useState({})
  const imageInputRef = useRef()

  const onMutate = async (e) => {
    if(e.target.files.length + formImages.length >4){
      toast.error("maximum number of allowed image is four")
      return
    }
    if (!e.target.files.length) return

    // if(e.target.files.length===4)return
    // categoryRef.current.disabled = true
    setFormImages((prev) => {
      const repeated = prev.find((item) => (item.name === e.target.files[0].name))
      if (repeated) return prev
      //  setImageBtnClass("btn btn-primary")
      return [...prev, ...e.target.files]
    })

  }



  const uploadImages = async () => {
    // e.preventDefault()

    const imgUrls = await Promise.all(
      formImages.map((image) => {
        if (progressBarContent[image.name] === 100) return
        return storeImage(image)
      })
    ).catch((error) => {
      // setLoading(false)
      toast.error('Images not uploaded')
      console.log(error)
      return
    })
    if (imgUrls) {
      console.log(imagesUrl)
      imgUrls.map((url) => {
        if (url !== undefined) {
          setImagesUrl((prev) => [...prev, url])
        }
      })
    }
    getImagesUrl(imagesUrl , activeImage)
  }

  const storeImage = async (image) => {
    return new Promise((resolve, reject) => {
      const fileName = `${image.name}`
      const storageRef = ref(storage, `${category.toLocaleLowerCase().trim()}/${productId}/` + fileName)

      const uploadTask = uploadBytesResumable(storageRef, image)

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          setProgressBarContent((prev) => ({ ...prev, [fileName]: progress }))

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

  const removeAllImage =async () => {
    if (!formImages.length) return
    if (window.confirm("confirm to remove all picture ?") === true) {
      const promisesRemovedItem = formImages.map(async(file) => {
        const storageRef = ref(storage, `${category}/${productId}/` + file.name)
        return await deleteObject(storageRef)
        })
        try {
          await Promise.all(promisesRemovedItem)
          toast.success("successfully deleted")
          setFormImages([])
          setProgressBarContent({})
          setImagesUrl([])
          imageInputRef.current.value = null
        } catch (error) {
          toast.error("there is a problem in removing pictures")
          console.log(error)
        }
      }

      //   categoryRef.current.disabled = false
    
  }

  useEffect(() => {
    getFromImages(formImages)
    const uploadData = async () => {
      await uploadImages()
    }
    uploadData()
  }, [formImages])


  useEffect(()=>{
    if(dataUploaded){
      setFormImages([])
      setProgressBarContent({})
      setImagesUrl([])
    }
  },[dataUploaded])


  useEffect(() => {
    getImagesUrl(imagesUrl , activeImage)
    if(!imagesUrl.length) imageInputRef.current.value=null
  }, [imagesUrl])



  // useEffect(()=>{

    
  // },[])
  const selectAciveImage = (e)=>{
    setActiveImage(e.target.value)
  }

    function getPathStorageFromUrl(url) {

    const baseUrl = "https://firebasestorage.googleapis.com/v0/b/shop2-8814c.appspot.com/o/";

    let imagePath = url.replace(baseUrl, "");

    const indexOfEndPath = imagePath.indexOf("?");

    imagePath = imagePath.substring(0, indexOfEndPath);

    imagePath = imagePath.replaceAll("%2F", "/");

    return imagePath;
  }
  //remove url correpond to image
  
  const removeOneSelectedPhoto =(e,image)=>{
    // e.currentTarget.textContent = ""
    // e.currentTarget.className = "m-auto spinner-border"
    // e.currentTarget = <FontAwesomeIcon icon={faSpinner} />
    const storageRef = ref(storage, `${category}/${productId}/` + image.name)
    deleteObject(storageRef).then(() => {
      toast.success(`${image.name} successfully deleted`)
      const newFromImages = formImages.filter((file)=>file.name !== image.name)
      setFormImages(newFromImages)
      const newImagesUrl = imagesUrl.filter((url)=>getPathStorageFromUrl(url)!==`${category}/${productId}/` + image.name)
      setImagesUrl(newImagesUrl)
      setProgressBarContent((prev)=>({...prev , [image.name]:0}))
      getImagesUrl(newImagesUrl , activeImage)
      if(!newImagesUrl.length) imageInputRef.current.value=null
    }).catch((error) => {
      //double check
      toast.error(error)
    })
  }
  
  

  return (
    <div className="d-flex flex-column">
      <input
        disabled={!category}
        ref={imageInputRef}
        className='mb-3 mt-3 m-auto'
        type='file'
        id='images'
        onChange={onMutate}
        max="2"
        accept='.jpg,.png,.jpeg'
        multiple
        required
      />
      {/* <button className={imageBtnClass} type='submit' ref={imageBtnRef}>upload images</button> */}
      <div className='mt-2 d-flex'>
        {formImages?.map((image, index) => {
          return <div className='d-flex flex-column me-2 ' style={{ width: "100px" }} key={`adminImagesUpdated${index}`}>
            {progressBarContent[image.name] === 100 && <span style={{cursor:"pointer"}} className="m-auto badge text-danger " onClick={(e)=>removeOneSelectedPhoto(e,image)}>X</span>}
            <img src={URL.createObjectURL(image)} width={100} height={100} alt={image.name} />
            <div className={`progress mt-2 ${!progressBarContent[image.name] ? "d-none" : "d-block"} }`}>
              <div key={`progressBar${index}`} className={`progress-bar ${progressBarContent[image.name] === 100 && "bg-success"}`} style={{ width: `${progressBarContent[image.name]}%` }}>{Math.floor(progressBarContent[image.name])}%</div>
            </div>
            <input className="mt-1" title="set as active image" defaultChecked={index===0} type="radio" name="selectPic" value={index} onChange={selectAciveImage}/>
          </div>
        })}
      </div>
      {imagesUrl.length !== 0 && formImages.every((image)=>progressBarContent[image.name]===100) && <button className='btn btn-danger mt-4' onClick={removeAllImage}>
        remove all images
      </button>}
    </div>

  )
}

export default AdminInputImage