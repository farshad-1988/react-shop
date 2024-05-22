import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'
import LoadingPageComponent from '../components/LoadingPageComponent'

const Home = () => {
    const { categoriesPageItems, loadingPage } = useContext(ShopContext)
    const [slideIndex, setSlideIndex] = useState(0)
    const navigate = useNavigate()

    // console.log(categoriesPageItems.length)
    // console.log(slideIndex)


    useEffect(() => {
        console.log(categoriesPageItems)
        const timer = setInterval(() => {
            setSlideIndex((prev) => {
                console.log(prev)
                return (prev + 1 >= categoriesPageItems.length ? 0 : prev + 1)
            })
        }, 10000);

        return () => clearInterval(timer)
    }, [categoriesPageItems])



    return (
        loadingPage ? <LoadingPageComponent /> :
            <>
                <div className='homePageGrid'>
                    {categoriesPageItems.map((category, index) => <div key={index}>
                        <img onClick={() => { navigate(`/${category[0].category}/${category[0].id}`) }} className='w-100' src={category[0].imagesUrl[category[0].firstPicture]} alt={`${category[0].name}`} />
                    </div>)}
                    <div className="slideshow-container middleItem">
                        {categoriesPageItems.map((category, index) => <div key={index} className={index === slideIndex && "fade"} style={{ display: `${index === slideIndex ? "block" : "none"}`, position: "relative" }}>
                            <img className='w-100' src={category[1].imagesUrl[category[1].firstPicture]} alt={`${category[1].name}`} />
                            <button onClick={() => { navigate(`/${category[1].category}/${category[1].id}`) }} className='btn btn-success' style={{ position: 'absolute', top: "2vh", left: "10px" }}>Order Now</button>


                            <div style={{ textAlign: "center", position: 'absolute', top: "10px", right: "10px" }}>
                                {categoriesPageItems.map((_, index) => <span key={index} onClick={() => { setSlideIndex(index) }} className={`dot ${index === slideIndex && "active"}`}></span>)}
                            </div>

                            <br />
                        </div>)}
                    </div>
                </div>

            </>)
}

export default Home
