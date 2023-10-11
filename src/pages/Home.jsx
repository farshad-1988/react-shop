import data from "../shop-data"
import { useContext, useEffect } from "react"
import { ShopContext } from "../context/ShopContext"
import ThreeItemsInOne from "../components/ThreeItemsInOne"
import { setAllItemsOnFirestore } from "../firebase.config"


const Home = ()=>{
    const {homePageItems} = useContext(ShopContext)


    // useEffect(()=>{
        // const setItemOnDB = async(data)=>{
        //     await setAllItemsOnFirestore(data)
        //     console.log("done")
        //     // await getThreeOfEachCat(categories)
        // }
        // setItemOnDB(data) 
        // console.log(homePageItems)
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