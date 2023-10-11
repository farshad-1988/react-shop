import { BrowserRouter as Router , Routes , Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import "./app.css"
import Navbar from "./components/Navbar";
import NavTips from "./components/NavTips";
import CategoryPage from "./pages/CategoryPage";
import Cart from "./pages/Cart";
import ShowFoundItems from "./pages/ShowFoundItems";
import { useContext, useEffect } from "react";
import { ShopContext } from "./context/ShopContext";
import LoadingPage from "./pages/LoadingPage";

// import {QueryClientProvider , QueryClient} from "react-query"

// const client = new QueryClient({})

function App() {
    const {loadingPageShow } = useContext(ShopContext)
  

  

  return (
    // <QueryClientProvider client={client}>
      loadingPageShow ? <LoadingPage/> : <Router>
        <NavTips/>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/signin" element={<Signin/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/category/:category" element={<CategoryPage/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/searchedItems" element={<ShowFoundItems/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </Router>
    // </QueryClientProvider>
  );
}

export default App;
