import { useNavigate } from "react-router-dom"



const ThreeItemsInOne = (props)=>{
    const threeItems = [...props.threeItems]
    const navigate = useNavigate()

    const goToCategory=()=>{
        navigate(`category/${threeItems[0].category}`)
    }
    

    return (
    <div className="col-3" onClick={goToCategory}>
        <div className="col-3">
            {threeItems.map((item , index)=>{
                return <img key={index} src={item.imageUrl} alt=""  className="rounded-circle" width="100" height="100"/>   
            })}
        </div>
        <h2>{threeItems[0].category}</h2>
    </div>
    
    )
}


export default ThreeItemsInOne