


const ThreeItemsInOne = (props)=>{
    const threeItems = [...props.threeItems]

    

    return (
    <div className="col-3">
        <div className="col-3">
            {threeItems.map((item , index)=>{
                return <img key={index} src={item.imageUrl} alt=""  className="rounded-circle" width="100" height="100"/>   
            })}

        </div>
    </div>
    
    )
}


export default ThreeItemsInOne