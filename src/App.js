import { BrowserRouter as Router , Routes , Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import "./app.css"
import Navbar from "./layout/Navbar";
import NavTips from "./layout/NavTips";
import CategoryPage from "./pages/CategoryPage";
import Cart from "./pages/Cart";
import ShowFoundItems from "./pages/ShowFoundItems";
import { useContext, useEffect } from "react";
import { ShopContext } from "./context/ShopContext";
import LoadingPageComponent from "./components/LoadingPageComponent";
import Profile from "./pages/Profile";
import EditUserData from "./components/EditUserData";
import SingleItem from "./pages/SingleItem";
// import { setAllItemsOnFirestore } from "./firebase.config";
// import data from "./shop-data.js"

// import {QueryClientProvider , QueryClient} from "react-query"

// const client = new QueryClient({})

function App() {
  // useEffect(()=>{

  //   const seasf = async()=>{
  //     await setAllItemsOnFirestore(data)
  //   }

  //   seasf()
  // },[])
  
  


  return (

    <Router>
        <NavTips/>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/profile/:userId" element={<Profile/>}/>
          <Route path="/edituserdata/:userId" element={<EditUserData/>}/>
            

          <Route path="/signin" element={<Signin/>}/>
          <Route path="/signup" element={<Signup/>}/>
          {/* <Route path="/editUserData"/> */}
          <Route path="/category/:category" element={<CategoryPage/>}/>
          <Route path="/:category/:productId" element={<SingleItem/>}/>
          <Route path="/cart/:userId" element={<Cart/>}/>
          <Route path="/searchedItems/:searchedWord" element={<ShowFoundItems/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </Router>
  );
}

export default App;

