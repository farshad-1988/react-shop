import React from 'react'
import { getCategoriesNameFromDB, getSingleCategoryItem } from '../../firebase.config'
import { useEffect } from 'react'
import { useContext } from 'react'
import { ShopContext } from '../../context/ShopContext'
import { useState } from 'react'
import Item from '../../components/Item'
import LoadingPageComponent from '../../components/LoadingPageComponent'
import InfiniteScroll from 'react-infinite-scroll-component'
import { deleteObject, getStorage, ref } from 'firebase/storage'
import { toast } from 'react-toastify'
import EdittingItem from '../components/EdittingItem'

const AdminEditProduct = () => {
  const { categoriesTitle, singleCategoryToShow, dispatch, loadingPage } = useContext(ShopContext)
  console.log(categoriesTitle)
  const [selectedCategory, setSelectedCategory] = useState("")

  const [lastItem, setLastItem] = useState("")
  const [ifThereIsMoreItems, setIfThereIsMoreItems] = useState(true)
  const [sortType, setSortType] = useState(["dateAdded", "desc"])



  const chooseCategory = (e) =>
    setSelectedCategory(e.target.value.toLocaleLowerCase())


  const nextLoading = async () => {
    const tenItemsDocs = await getSingleCategoryItem(selectedCategory, lastItem, sortType)
    if (tenItemsDocs.length === 0) setIfThereIsMoreItems(false)
    setLastItem(tenItemsDocs[tenItemsDocs.length - 1])
    const tenItems = tenItemsDocs.map((item) => item.data())
    console.log(tenItems)
    dispatch({ type: "UPDATE_SINGLE_CATEGORY", payload: tenItems })
  }







  useEffect(() => {
    const getItems = async (category) => {
      dispatch({ type: "LOADING_PAGE_ON" })
      const tenItemsDocs = await getSingleCategoryItem(category, 0, sortType)
      setLastItem(tenItemsDocs[tenItemsDocs.length - 1])
      const tenItems = tenItemsDocs.map((item) => item.data())
      dispatch({ type: "SET_SINGLE_CATEGORY", payload: tenItems })
      tenItemsDocs.length <= 4 ? setIfThereIsMoreItems(false) : setIfThereIsMoreItems(true)
    }
    getItems(selectedCategory)
    return () => dispatch({ type: "RESET_SINGLE_CATEGORY" })
  }, [selectedCategory, sortType])

  useEffect(() => {
    const getItems = async () => {
      // dispatch({ type: "LOADING_PAGE_ON" })
      const categories = await getCategoriesNameFromDB();
      setSelectedCategory(categories.categories[0])
      const tenItemsDocs = await getSingleCategoryItem(categories.categories[0], 0, sortType)
      setLastItem(tenItemsDocs[tenItemsDocs.length - 1])
      const tenItems = tenItemsDocs.map((item) => item.data())
      dispatch({ type: "SET_SINGLE_CATEGORY", payload: tenItems })
      tenItemsDocs.length <= 4 ? setIfThereIsMoreItems(false) : setIfThereIsMoreItems(true)

    }
    getItems()
    // singleCategoryToShow.map((item) => { setActiveImageNumber((prev) => ({ ...prev, [item.id]: 0 })) })
    // return () => dispatch({ type: "RESET_SINGLE_CATEGORY" })
  }, [])


  const categorySort = [["newest", "dateAdded", "desc"], ["name", "name", "asc"], ["best seller", "purchasedCount", "desc"], ["cheapest", "price", "asc"], ["the most expensive", "price", "desc"]]
  const selectSortType = (e) => {
    setSortType(e.target.value.split(","))
  }



  // function getPathStorageFromUrl(url) {

  //   const baseUrl = "https://firebasestorage.googleapis.com/v0/b/project-80505.appspot.com/o/";

  //   let imagePath = url.replace(baseUrl, "");

  //   const indexOfEndPath = imagePath.indexOf("?");

  //   imagePath = imagePath.substring(0, indexOfEndPath);

  //   imagePath = imagePath.replace("%2F", "/");

  //   return imagePath;
  // }


  // const deletePic = (urlToDel) => {
  //   const imgPath = getPathStorageFromUrl(urlToDel)
  //   const storage = getStorage()
  //   deleteObject(ref(storage , imgPath)).then(()=>toast.success("deleted").catch((error)=>toast.error("failed")))
  // }
  const getEditedProductId = (productSpec) => {
    let newProducts
    if (typeof productSpec === "string") {
      newProducts = singleCategoryToShow.filter((product) => product.id !== productSpec)
      console.log(newProducts)
      dispatch({ type: "SET_SINGLE_CATEGORY", payload: newProducts })
    } else {
      newProducts = singleCategoryToShow.map((product) => {
        if (product.id === productSpec.id) return productSpec
        else return product
      })
      dispatch({ type: "SET_SINGLE_CATEGORY", payload: newProducts })
    }
  }

  return (
    <div className='d-flex flex-column' style={{ width: "100%" }}>
      <div className='d-flex align-items-center'>
        <select onChange={chooseCategory} className='w-25 m-auto text-center rounded-2 mt-3 mb-2'>
          {categoriesTitle?.map((category, index) => {
            // index===1 && setSelectedCategory(category)
            return <option key={`categoryChoose${index}`} selected={category === selectedCategory} value={category}>{category}</option>
          })}
        </select>
      </div>

      <div>
        <div className="nav-pills d-flex align-items-center ms-3" role="tablist"><span>sort by:</span>{categorySort.map((typeOfSort, index) => {
          return <button disabled={loadingPage} data-bs-toggle="pill" type="button" onClick={selectSortType} value={typeOfSort.slice(1, 3)} key={`sort-type${index}`} className={`btn text-primary p-1  ${typeOfSort[0] === "newest" && "active"} ff-sort-type`}>{typeOfSort[0]}</button>
        })}</div>

        {loadingPage ? <LoadingPageComponent /> :
          <InfiniteScroll className="overflow-hidden" endMessage={<p className="text-center text-success">you've seen all items</p>} dataLength={singleCategoryToShow.length} hasMore={ifThereIsMoreItems} next={nextLoading} loader={<p className="text-center">loading<span className="spinner-border spinner-border-sm"></span></p>}>
            <div className="m-auto" style={{ width: "95%" }} >
              {singleCategoryToShow?.map((item, index) => {
                return <EdittingItem key={`editedItemsInCategory${index}`} item={item} getEditedProductId={getEditedProductId} />
              })}

            </div>
          </InfiniteScroll>}
      </div>
    </div >


  )
}

export default AdminEditProduct



{/* <div className="carousel-inner">
    {imagesUrl?.map((image, index) =>
    (<div key={`img-pic${index}`} className={`carousel-item ${index === 1 && "active"}`} >
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
</div> */}
