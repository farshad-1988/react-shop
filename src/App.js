import "./app.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Navbar from "./layout/Navbar";
import NavTips from "./layout/NavTips";
import CategoryPage from "./pages/CategoryPage";
import Cart from "./pages/Cart";
import ShowFoundItems from "./pages/ShowFoundItems";
import { Children, useContext } from "react";
import Profile from "./pages/Profile";
import EditUserData from "./components/EditUserData";
import SingleItem from "./pages/SingleItem";
import Admin from "./admin/Admin";
import NavbarAdmin from "./admin/components/NavbarAdmin";
import { UserContext } from "./context/UserContext";
import PurchaseItemsDetailPage from "./pages/PurchaseItemsDetailPage";
import GalleryShapePage from "./mobile/GalleryShapePage";
import Categories from "./pages/Categories";
import Home from "./pages/Home";
import Layout from "./layout/Layout";
// import { setAllItemsOnFirestore } from "./firebase.config";
// import data from "./shop-data.js"

// import {QueryClientProvider , QueryClient} from "react-query"

// const client = new QueryClient({})

function App() {
  const { currentUser } = useContext(UserContext)





  return (
    //add admin uid and secret of json file in cloud function in process env
    <Router>

      <Routes>

        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          {/* <Route index element={<Navbar/>}/> */}
          <Route path="/admin/*" element={<Admin />} />
          {/* for phone!!! */}
          <Route path="/gallery/:category" element={<GalleryShapePage />} />
          {/* <Route path="/adminproductedit" element={<AdminEditProduct/>}/> */}
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/profile/:userId/edituserdata" element={<EditUserData />} />
          <Route path="/profile/:userId/purchasedItems/:purchaseId" element={<PurchaseItemsDetailPage />} />


          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="/editUserData"/> */}
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/:category/:productId" element={<SingleItem />} />
          <Route path="/cart/:userId" element={<Cart />} />
          <Route path="/searchedItems/:searchedWord" element={<ShowFoundItems />} />
          <Route path="*" element={<NotFound />} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;

