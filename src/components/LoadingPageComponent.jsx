import ThreeDotsLoading from "../svg/ThreeDotsLoading"

const LoadingPageComponent = ()=>{



    return (
        // <span className="spinner-grow"></span>
    <div className="d-flex mt-5 justify-content-center">
        <h1>loading</h1><span className="d-flex align-items-end mb-3 ms-4"><ThreeDotsLoading/></span>
    </div>
    )
    }

export default LoadingPageComponent