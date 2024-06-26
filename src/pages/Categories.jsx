
import { useContext } from "react"
import { ShopContext } from "../context/ShopContext"
import ThreeItemsInOne from "../components/ThreeItemsInOne"
import LoadingPageComponent from "../components/LoadingPageComponent"


const Categories = () => {
    const { categoriesPageItems, loadingPage } = useContext(ShopContext)


    // useEffect(()=>{
    // const setItemOnDB = async(data)=>{
    //     await setAllItemsOnFirestore(data)
    //     console.log("done")
    //     // await getThreeOfEachCat(categories)
    // }
    // setItemOnDB(data) 
    // console.log(categoriesPageItems)
    // },[])


    return (
        loadingPage ? <LoadingPageComponent /> : <div className="row ms-3">
            {categoriesPageItems?.map((threeItems, index) => {
                return <ThreeItemsInOne key={"home" + index} threeItems={threeItems} />
            })}
        </div>
    )
}

export default Categories