import data from "../shop-data"
import { useContext, useEffect } from "react"
import { getCategoriesNameFromDB, getThreeOfEachCat, setAllItemsOnFirestore } from "../firebase.config"
import { ShopContext } from "../context/ShopContext"
import ThreeItemsInOne from "../components/ThreeItemsInOne"

const Home = ()=>{
    const {homePageItems ,setHomePageItems} = useContext(ShopContext)

    useEffect(()=>{
        const getItemsForHome = async()=>{
            const categories = await getCategoriesNameFromDB()
            const allItems =  await getThreeOfEachCat(categories)
            setHomePageItems(allItems)
        }
       getItemsForHome()
    //    console.log(homePageItems)
    },[])
    // useEffect(()=>{

    //     const setItemOnDB = async(data)=>{
    //         await setAllItemsOnFirestore(data)
    //         // console.log(categories.categories)
    //         // await getThreeOfEachCat(categories)
    //     }
    //     setItemOnDB(data) 
    // },[])
    
    return (
    <div className="row ms-3">
        {homePageItems?.map((threeItems , index)=>{
            return <ThreeItemsInOne key={index} threeItems={threeItems} />
        })}
    </div>
    )
}

export default Home