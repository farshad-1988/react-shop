import { useCallback } from "react"
import { useEffect } from "react"
import { useState } from "react"
import AdminInputImage from "./AdminInputImage"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleLeft, faAngleRight, faCheck, faImage, faPanorama, faTrashCan, faX } from "@fortawesome/free-solid-svg-icons"
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"
import { toast } from "react-toastify"
import { deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore"
import { db } from "../../firebase.config"
import { useContext } from "react"
import { ShopContext } from "../../context/ShopContext"
import axios from "axios"


const EdittingItem = ({ item, getEditedProductId , addedCategory }) => {
    const [enableEditting, setEnableEdittng] = useState(false)
    const { name, countInStock, purchasedCount, category, price, imagesUrl, id, dateAdded, firstPicture } = { ...item }
    const { categoriesTitle , dispatch } = useContext(ShopContext)
    const editedInfo = { addedImagesUrl: [], editedName: name, editedCountInStock: countInStock, editedPurchasedCount: purchasedCount, editedCategory: category, editedPrice: price, editedImagesUrl: [...imagesUrl] }
    const [editedItem, setEditedItem] = useState(Object.assign({}, editedInfo))
    const [editedImagesUrl, seteditedImagesUrl] = useState([...imagesUrl])
    const { editedName, editedCountInStock, editedPurchasedCount, editedCategory, editedPrice, addedImagesUrl } = { ...editedItem }
    const [activeImageNum, setActiveImageNum] = useState(firstPicture)
    const [firstPictureInUi, setFirstPictureInUi] = useState(firstPicture)
    const [formImages, setFormImages] = useState()



    const updateeditedItem = (e) => {
        setEditedItem((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const deletePic = (e) => {
        editedImagesUrl.splice(activeImageNum, 1)
        // nextPrevFunc()
        if (activeImageNum !== 0) setActiveImageNum((prev) => prev - 1)
        setEditedItem((prev) => ({ ...prev, editedImagesUrl }))
    }


    const removePicFromDB = async (urlToDel) => {
        const imgPath = getPathStorageFromUrl(urlToDel)
        const storage = getStorage()
        await deleteObject(ref(storage, imgPath))
    }

    const abortEditedData = () => {
        if (addedImagesUrl.length) {
            if (window.confirm("are you sure to cancle changes ?(all added and deleted images will be lost)") === true) {
                setEditedItem((prev) => ({ ...prev, editedImagesUrl: [...imagesUrl] }))
                setEnableEdittng(false)
                addedImagesUrl.map(async (url) => await removePicFromDB(url))
            }
        } else {
            setEditedItem((prev) => ({ ...prev, editedImagesUrl: [...imagesUrl] }))
            setEnableEdittng(false)
        }
    }

    const removeProduct = async () => {
        if (window.confirm("press ok to remove product from database")) {
            const CATEGORY = category.toLocaleUpperCase()
            const docRef = doc(db, "PRODUCTS", CATEGORY, CATEGORY, id)

            try {
                imagesUrl?.map(async (url) => {
                    await removePicFromDB(url)
                })
                await deleteDoc(docRef)
                toast.success("product deleted")
                getEditedProductId(id)

            } catch (error) {
                console.log(error)
                toast.error("there is a problem")
            }

        }
    }



    const postEditedData = async () => {
        // imagesUrl
        const CATEGORY = category.toLocaleUpperCase()
        const oldDocRef = doc(db, "PRODUCTS", CATEGORY, CATEGORY, id)
        let objToUpload
        if (category !== editedCategory) {
            try {
                const isEditedCatExist = categoriesTitle.find((category) => category === editedCategory)

                const newDlUrlsPromise = imagesUrl.map(async (url) => {
                    try {
                        const storage = getStorage()
                        let ImageName = url.split(RegExp("%2..*%2F(.*?)\?alt"))[1]
                        ImageName = ImageName.substring(0, ImageName.length - 1)
                        const newPath = `${editedCategory}/${id}/${ImageName}`
                        const newRef = ref(storage, newPath)
                        const response = await axios.get(url, { responseType: "blob" })
                        await uploadBytes(newRef, response.data)    
                        return getDownloadURL(newRef)
                    } catch (error) {
                        return toast.error(error)
                    }
                })

                try {
                    const dlUrls = await Promise.all(newDlUrlsPromise)
                    seteditedImagesUrl(dlUrls)
                    
                    await imagesUrl.map(async(url)=>await removePicFromDB(url))
                    await deleteDoc(oldDocRef)
                    const EDITEDCATEGORY = editedCategory.toLocaleUpperCase()
                    const newDocRef = doc(db, "PRODUCTS", EDITEDCATEGORY, EDITEDCATEGORY, id)
                    objToUpload = { imagesUrl: [...dlUrls], firstPicture: firstPictureInUi, name: editedName, category: editedCategory.trim().toLocaleLowerCase(), subCategory: editedCategory.trim().toLocaleLowerCase(), countInStock: editedCountInStock, price: editedPrice, purchasedCount: editedPurchasedCount, splittedName: editedName.toLocaleLowerCase().split(" "), id, dateAdded, dateEdited: new Date() }
                    await setDoc(newDocRef, objToUpload)
                    
                } catch (error) {
                    console.log(error)
                }
                

                if (!isEditedCatExist) {
                    const docRef = doc(db, "ADDITIONAL_INFO", "CATEGORIES")
                    await updateDoc(docRef, { categories: [...categoriesTitle, editedCategory] })
                    dispatch({type:"ADD_CATEGORY_TO_DB" , payload:editedCategory})
                    addedCategory(editedCategory)
                }
                toast.success("product edit successful")
                setEnableEdittng(false)
                getEditedProductId(id)
            } catch (error) {
                console.log(error)
                toast.error("there is a problem")
            }

        } else {
            await updateDoc(oldDocRef, { imagesUrl: [...editedImagesUrl, ...addedImagesUrl], name: editedName, countInStock: editedCountInStock, price: editedPrice, purchasedCount: editedPurchasedCount, splittedName: editedName.toLocaleLowerCase().split(" "), dateEdited: new Date() })
            toast.success("product edit successful")
            setEnableEdittng(false)
            objToUpload = { imagesUrl: [...editedImagesUrl , ...addedImagesUrl], firstPicture: firstPictureInUi, name: editedName, category: editedCategory.trim().toLocaleLowerCase(), subCategory: editedCategory.trim().toLocaleLowerCase(), countInStock: editedCountInStock, price: editedPrice, purchasedCount: editedPurchasedCount, splittedName: editedName.toLocaleLowerCase().split(" "), id, dateAdded, dateEdited: new Date() }
            getEditedProductId(objToUpload)
        }


    }



    function getPathStorageFromUrl(url) {

        const baseUrl = "https://firebasestorage.googleapis.com/v0/b/project-80505.appspot.com/o/";

        let imagePath = url.replace(baseUrl, "");

        const indexOfEndPath = imagePath.indexOf("?");

        imagePath = imagePath.substring(0, indexOfEndPath);

        imagePath = imagePath.replace("%2F", "/");

        return imagePath;
    }






    const incrementImageNum = (e) => {
        !enableEditting && seteditedImagesUrl([...imagesUrl])
        setActiveImageNum((prev) => {
            //its not nessasary , just for double check
            if (prev < imagesUrl.length - 1) {
                return prev + 1
            } else {
                return prev
            }
        })
    }
    const decrementImageNum = (e) => {
        !enableEditting && seteditedImagesUrl([...imagesUrl])
        setActiveImageNum((prev) => {
            if (prev > 0) {
                return prev - 1
            } else {
                return prev
            }
        })
    }

    useEffect(() => {
        seteditedImagesUrl([...imagesUrl])
        // nextPrevFunc()
    }, [enableEditting])





    function getImagesUrl(imagesURL) {
        setEditedItem((prev) => ({ ...prev, addedImagesUrl: imagesURL }))
    }

    const enableEditingFunc = () => {
        setEnableEdittng(true)
        item.length && setEditedItem({ ...item })
    }

    const setAsActiveImageInDb = async () => {
        try {
            const docRef = doc(db, "PRODUCTS", category.toLocaleUpperCase(), category.toLocaleUpperCase(), id)
            await updateDoc(docRef, { firstPicture: activeImageNum })
            toast.success("image set as active image")
            setFirstPictureInUi(activeImageNum)
        } catch (error) {
            toast.error("image is not set as active image")
        }
    }


    // const tester = ()=>{
    //     const oldPath = getPathStorageFromUrl(url)
    //     imagesUrl.map(async(url)=>{

    //         const storage = getStorage()
    //         const ImageName = url.split(RegExp("%2..*%2F(.*?)\?alt"))[1]
    //         const newPath = `${editedCategory}/${id}/${ImageName}`
    //         const newRef = ref(storage , newPath)
    //         const response = await fetch(url)
    //         const blob = await response.blob()
    //         uploadBytes(newRef , blob)
    //     })
    // }

    const getFromImages = () => {

    }

    //     async function moveFile(oldEntirePath, newEntirePath) {
    //     var bucket = getStorage().bucket();
    //     return bucket.file(oldEntirePath).move(newEntirePath)
    //     .then(resp => {

    //       let bucketPart = resp[1].resource.bucket
    //       let namePart = resp[0].id
    //       let tokenPart = resp[1].resource.metadata.firebaseStorageDownloadTokens

    //       const url = "https://firebasestorage.googleapis.com/v0/b/"+ bucketPart +"/o/"+ namePart +"?alt=media&token=" + tokenPart
    //       console.log(`Image url = ${url}`)
    //       return url

    //     })
    //     .catch(err => {
    //         console.log(`Unable to upload image ${err}`)
    //     })
    //   }
    return (
        <div className="row mb-3" style={{ position: "relative" }}>

            <div className="row mt-3 d-flex border border-1 rounded-3 pt-3 pb-2" >
                {!imagesUrl.length ? <FontAwesomeIcon style={{ width: "250px", height: "250px" }} icon={faImage} /> :
                    !enableEditting && <div className="col-xl-3 col-12 d-flex flex-column" style={{ width: "330px", height: "350px" }}>
                        <img alt={"product"} className="rounded-3" width={300} height={300} src={imagesUrl[activeImageNum]} />
                        {firstPictureInUi === activeImageNum && <button className="btn text-success" style={{ position: "absolute", left: "270px", top: "30px" }}><FontAwesomeIcon size="xl" icon={faCheck} /></button>}
                        <div className="col-12 d-flex justify-content-between">
                            <button className="btn border-0 text-primary" disabled={activeImageNum === 0 ? true : false} onClick={decrementImageNum}><FontAwesomeIcon icon={faAngleLeft} size="lg" /></button>
                            {enableEditting && <button className="btn text-danger" onClick={() => deletePic(imagesUrl[activeImageNum])}><FontAwesomeIcon icon={faTrashCan} size="lg" /></button>}
                            <button className="btn border-0 text-primary" disabled={imagesUrl.length === 1 || activeImageNum === imagesUrl.length - 1 ? true : false} onClick={incrementImageNum}><FontAwesomeIcon icon={faAngleRight} size="lg" /></button>
                        </div>
                    </div>}

                {!editedImagesUrl.length ? <FontAwesomeIcon style={{ width: "250px", height: "250px" }} icon={faImage} /> :
                    enableEditting && <div className="col-xl-3 col-12 d-flex flex-column" style={{ width: "330px", height: "350px" }}>
                        <img alt="product" className="rounded-3" width={300} height={300} src={editedImagesUrl[activeImageNum]} />
                        {firstPictureInUi === activeImageNum && <button className="btn text-success" style={{ position: "absolute", left: "270px", top: "30px" }}><FontAwesomeIcon size="xl" icon={faCheck} /></button>}
                        <div className="col-12 d-flex justify-content-between">
                            <button className="btn border-0 text-primary" disabled={activeImageNum == 0 ? true : false} onClick={decrementImageNum}><FontAwesomeIcon icon={faAngleLeft} size="lg" /></button>
                            {enableEditting && <button className="btn text-danger" onClick={() => deletePic(imagesUrl[activeImageNum])}><FontAwesomeIcon icon={faTrashCan} size="lg" /></button>}
                            <button className="btn border-0 text-primary" disabled={editedImagesUrl.length === 1 || activeImageNum === editedImagesUrl.length - 1 ? true : false} onClick={incrementImageNum}><FontAwesomeIcon icon={faAngleRight} size="lg" /></button>
                        </div>
                    </div>}



                <div className="col-xl-3 col-12 ms-3 lh-base">
                    <p>product ID : {id}</p>
                    {!enableEditting ? <div> <span className="text-primary">category:</span>{category}</div> : <div className="d-flex flex-column"><span>category</span><input disabled={addedImagesUrl.length} name="editedCategory" onChange={updateeditedItem} type="text" defaultValue={category} />{!categoriesTitle.find((category)=>category===editedCategory) && <p className="text-danger">{`you will create new category ${editedCategory}`}</p>}</div>}
                    {!enableEditting ? <div> <span className="text-primary">name:</span>{name}</div> : <div className="d-flex flex-column"><span>name</span><textarea name="editedName" onChange={updateeditedItem} type="text" defaultValue={name} /> </div>}
                    {!enableEditting ? <div> <span className="text-primary">price:</span>{price}$</div> : <div className="d-flex flex-column"><span>price</span><input name="editedPrice" onChange={updateeditedItem} type="text" defaultValue={price} /></div>}
                    {!enableEditting ? <div> <span className="text-primary">warehouse count:</span>{countInStock}</div> : <div className="d-flex flex-column"><span>count in stock</span><input name="editedCountInStock" onChange={updateeditedItem} type="text" defaultValue={countInStock} /></div>}
                    {!enableEditting ? <div> <span className="text-primary">sold count:</span> {purchasedCount}</div> : <div className="d-flex flex-column"><span>purchased count</span><input name="editedPurchasedCount" onChange={updateeditedItem} type="text" defaultValue={purchasedCount} /></div>}
                    <button disabled={activeImageNum === firstPictureInUi} onClick={setAsActiveImageInDb} className="btn btn-success mt-3">set as active image</button>
                </div>

                <div className="col-xl-5 col-12 d-flex flex-column justify-content-between">
                    {enableEditting &&
                        <div>
                            {category===editedCategory && <p className="text-center">add new picture</p>}
                            {category===editedCategory ? <AdminInputImage items={{ category, id }} getImagesUrl={getImagesUrl} getFromImages={getFromImages} /> : <p className="text-danger mt-3 text-center">you can't change category and add picture at the same time</p>}
                        </div>}

                    {/* <div className="col-3 align-self-end mt-4"> */}
                    {!enableEditting ? <div className="d-flex flex-column col-5 align-self-end mt-5">
                        <button className="btn btn-primary" onClick={enableEditingFunc}>ENABLE EDIT MODE</button>
                        <button className="btn btn-danger mt-3" onClick={removeProduct}>DELETE</button>
                    </div> :
                        <div className="d-flex justify-content-end mb-4">
                            <button className="btn btn-danger me-3" onClick={abortEditedData}>ABORT</button>
                            <button className="btn btn-primary" onClick={postEditedData}>POST</button>
                        </div>}
                    {/* </div> */}

                </div>
            </div>
            {/* <button className="btn btn-danger rounded-circle " style={{ position: "absolute", right: "5px", top: "0px", width: "40px", height: "40px" }} onClick={removeProduct}><FontAwesomeIcon icon={faX} /></button> */}
        </div>
    )
}

export default EdittingItem

