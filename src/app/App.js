import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "../features/shared/pages/NotFound";
import Signup from "../features/shared/pages/Signup";
import Signin from "../features/shared/pages/Signin";
import CategoryPage from "../features/shared/pages/CategoryPage";
import Cart from "../features/shared/pages/Cart";
import ShowFoundItems from "../features/shared/pages/ShowFoundItems";
import { useContext } from "react";
import Profile from "../features/shared/pages/Profile";
import EditUserData from "../features/user/components/EditUserData";
import SingleItem from "../features/shared/pages/SingleItem";
import Admin from "../features/admin/pages/Admin";

import PurchaseItemsDetailPage from "../features/shared/pages/PurchaseItemsDetailPage";
import GalleryShapePage from "../features/shared/mobile/GalleryShapePage";
import Categories from "../features/shared/pages/Categories";
import Home from "../features/shared/pages/Home";
import Layout from "../features/shared/components/layout/Layout";
import { UserContext } from "../features/shared/context/UserContext";
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

