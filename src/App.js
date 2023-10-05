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

// import {QueryClientProvider , QueryClient} from "react-query"

// const client = new QueryClient({})

function App() {

  

  return (
    // <QueryClientProvider client={client}>
      <Router>
        <NavTips/>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/signin" element={<Signin/>}/>
          <Route path="/category/:category" element={<CategoryPage/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/searchedItems" element={<ShowFoundItems/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </Router>
    // </QueryClientProvider>
  );
}

export default App;
