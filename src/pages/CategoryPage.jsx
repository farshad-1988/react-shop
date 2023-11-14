import {useParams } from "react-router-dom"
import { getSingleCategoryItem } from "../firebase.config"
import { useContext, useEffect } from "react"
import { ShopContext } from "../context/ShopContext"
import Item from "../components/Item"
import LoadingPageComponent from "../components/LoadingPageComponent"
import InfiniteScroll from 'react-infinite-scroll-component';
import { useState } from "react"



const CategoryPage = ()=>{
    const {category} = useParams()
    const {singleCategoryToShow , dispatch , loadingPage } = useContext(ShopContext)
    const [lastItem  , setLastItem] = useState("")
    const [ifThereIsMoreItems , setIfThereIsMoreItems] = useState(true)
    const [sortType , setSortType] = useState(["dateAdded", "desc"])
    // const loadMoreContent = ()=>{
    //     console.log(1111)

    // }
    // window.onscroll = ()=>{

    //     // if (categoryListRef.current) {
    //         const { scrollTop, scrollHeight, clientHeight } = window;
    //         console.log( scrollTop, scrollHeight, clientHeight )
    //         if (scrollTop + clientHeight === scrollHeight) {
    //             console.log("Fire")
    //         }
    //         // }
    // } 


    const nextLoading = async ()=>{
        const tenItemsDocs= await getSingleCategoryItem(category , lastItem , sortType)
        if(tenItemsDocs.length===0)setIfThereIsMoreItems(false)
        setLastItem(tenItemsDocs[tenItemsDocs.length-1])
        const tenItems = tenItemsDocs.map((item) => item.data())
        dispatch({type:"UPDATE_SINGLE_CATEGORY" , payload:tenItems})
    }

    useEffect(()=>{
        const getItems = async (category)=>{
            dispatch({type:"LOADING_PAGE_ON"})
            const tenItemsDocs= await getSingleCategoryItem(category , 0 , sortType)
            setLastItem(tenItemsDocs[tenItemsDocs.length-1])
            const tenItems = tenItemsDocs.map((item) => item.data())
            dispatch({type:"SET_SINGLE_CATEGORY" , payload:tenItems})
            tenItems.length <= 4 ? setIfThereIsMoreItems(false) : setIfThereIsMoreItems(true)
        }
        getItems(category)
        return () => dispatch({type:"RESET_SINGLE_CATEGORY"})
    },[])

    useEffect(()=>{
        const getItems = async (category)=>{
            dispatch({type:"LOADING_PAGE_ON"})
            const tenItemsDocs= await getSingleCategoryItem(category , 0 , sortType)
            setLastItem(tenItemsDocs[tenItemsDocs.length-1])
            const tenItems = tenItemsDocs.map((item) => item.data())
            dispatch({type:"SET_SINGLE_CATEGORY" , payload:tenItems})
            tenItems.length <= 4 ? setIfThereIsMoreItems(false) : setIfThereIsMoreItems(true)
        }
        getItems(category)
        return () => dispatch({type:"RESET_SINGLE_CATEGORY"})
    },[sortType])
    
    
    //sort by best seller , price , name , date added
    // <RemoveScrollBar /> 
    const categorySort = [["newest" , "dateAdded" , "desc"], ["name" , "name", "asc"] ,["best seller" , "purchasedCount" , "desc"] , ["cheapest" , "price" , "asc"], ["the most expensive" , "price" , "desc"]]
    const selectSortType = (e)=>{

        setSortType(e.target.value.split(","))
    }
 
    return (

        <div>
            <div className="nav-pills d-flex align-items-center" role="tablist"><span>sort by:</span>{categorySort.map((typeOfSort , index)=>{
                return <button disabled={loadingPage} data-bs-toggle="pill" type="button" onClick={selectSortType} value={typeOfSort.slice(1,3)} key={`sort-type${index}`}  className={`btn text-primary p-1  ${typeOfSort[0]==="newest" && "active"} ff-sort-type`}>{typeOfSort[0]}</button>
            })}</div>
            {loadingPage ? <LoadingPageComponent/> : 
            <InfiniteScroll className="overflow-hidden" endMessage={<p className="text-center text-success">you've seen all items</p>} dataLength={singleCategoryToShow.length}  hasMore={ifThereIsMoreItems} next={nextLoading} loader={<p className="text-center">loading<span className="spinner-border spinner-border-sm"></span></p>}>
                <div className="row ms-3" >
                {singleCategoryToShow?.map((item , index) => {
                    return <Item key={"singleCat"+index} itemInfo ={item}/>
            })}
            </div>
            </InfiniteScroll>}
        </div>
    )
}



export default CategoryPage