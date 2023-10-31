import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Marquee from "react-fast-marquee"


const NavTips = ()=>{
  const { shoppingTips} = useContext(ShopContext);
    const randomNum =Math.floor(Math.random()*10) 
    const firstRun = randomNum <= 5 ? shoppingTips[randomNum] : shoppingTips[0]

  
    return (
        <div className="container-fluid py-1 text-center">
            <Marquee speed={20} delay={5}>
                {randomNum <= 5 ? shoppingTips[randomNum] : shoppingTips[0]}
            </Marquee>    
        </div>
    )
}


export default NavTips