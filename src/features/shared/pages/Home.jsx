// import React, { useContext, useEffect, useState } from "react";
// import { ShopContext } from "../context/ShopContext";
// import { useNavigate } from "react-router-dom";
import LoadingPageComponent from "../components/LoadingPageComponent";

// const Home = () => {
//   const { categoriesPageItems, loadingPage } = useContext(ShopContext);
//   const [slideIndex, setSlideIndex] = useState(0);
//   const navigate = useNavigate();

//   // console.log(categoriesPageItems.length)
//   // console.log(slideIndex)

//   useEffect(() => {
//     console.log(categoriesPageItems);
//     const timer = setInterval(() => {
//       setSlideIndex((prev) => {
//         console.log(prev);
//         return prev + 1 >= categoriesPageItems.length ? 0 : prev + 1;
//       });
//     }, 10000);

//     return () => clearInterval(timer);
//   }, [categoriesPageItems]);

//   return loadingPage ? (
//     <LoadingPageComponent />
//   ) : (
//     <>
//       <div className="homePageGrid">
//         {categoriesPageItems.map((category, index) => (
//           <div key={index}>
//             <img
//               onClick={() => {
//                 navigate(`/${category[0].category}/${category[0].id}`);
//               }}
//               className="w-100"
//               src={category[0].imagesUrl[category[0].firstPicture]}
//               alt={`${category[0].name}`}
//             />
//           </div>
//         ))}
//         <div className="slideshow-container middleItem">
//           {categoriesPageItems.map((category, index) => (
//             <div
//               key={index}
//               className={index === slideIndex && "fade"}
//               style={{
//                 display: `${index === slideIndex ? "block" : "none"}`,
//                 position: "relative",
//               }}
//             >
//               <img
//                 className="w-100"
//                 src={category[1].imagesUrl[category[1].firstPicture]}
//                 alt={`${category[1].name}`}
//               />
//               <button
//                 onClick={() => {
//                   navigate(`/${category[1].category}/${category[1].id}`);
//                 }}
//                 className="btn btn-success"
//                 style={{ position: "absolute", top: "2vh", left: "10px" }}
//               >
//                 Order Now
//               </button>

//               <div
//                 style={{
//                   textAlign: "center",
//                   position: "absolute",
//                   top: "10px",
//                   right: "10px",
//                 }}
//               >
//                 {categoriesPageItems.map((_, index) => (
//                   <span
//                     key={index}
//                     onClick={() => {
//                       setSlideIndex(index);
//                     }}
//                     className={`dot ${index === slideIndex && "active"}`}
//                   ></span>
//                 ))}
//               </div>

//               <br />
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Home;

import React, { useContext, useState } from "react";
import { ChevronLeft, ChevronRight, ShoppingCart, Star } from "lucide-react";
import { ShopContext } from "../context/ShopContext";
import ItemCounter from "../components/ItemCounter";
import { useNavigate } from "react-router-dom";
import Item from "../components/Item";

// Sample data structure based on your format
// const sampleProducts = [
//   {
//     id: "186d349e-3b7b-4a3a-a81d-5bc901f8e320",
//     category: "sport",
//     subCategory: "sport",
//     name: "Umbro Ceramica 2.0 Size 5 Youth and Beginner Soccer Ball, Yellow",
//     price: 11.94,
//     countInStock: 91,
//     purchasedCount: 9,
//     firstPicture: 0,
//     imagesUrl: [
//       "https://images.unsplash.com/photo-1614632537197-38a17061c2bd?w=400",
//       "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400",
//       "https://images.unsplash.com/photo-1511886929837-354d827aae26?w=400"
//     ]
//   },
//   {
//     id: "2",
//     category: "sport",
//     subCategory: "sport",
//     name: "Professional Basketball Indoor/Outdoor Game Ball",
//     price: 29.99,
//     countInStock: 45,
//     purchasedCount: 23,
//     firstPicture: 0,
//     imagesUrl: [
//       "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400",
//       "https://images.unsplash.com/photo-1608245449230-4ac19066d2d0?w=400"
//     ]
//   },
//   {
//     id: "3",
//     category: "sport",
//     subCategory: "sport",
//     name: "Premium Yoga Mat with Carrying Strap - Extra Thick",
//     price: 34.99,
//     countInStock: 67,
//     purchasedCount: 41,
//     firstPicture: 0,
//     imagesUrl: [
//       "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400",
//       "https://images.unsplash.com/photo-1592432678016-e910b452bb90?w=400"
//     ]
//   },
//   {
//     id: "4",
//     category: "electronics",
//     subCategory: "electronics",
//     name: "Wireless Bluetooth Headphones with Noise Cancellation",
//     price: 89.99,
//     countInStock: 34,
//     purchasedCount: 156,
//     firstPicture: 0,
//     imagesUrl: [
//       "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
//       "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400"
//     ]
//   },
//   {
//     id: "5",
//     category: "electronics",
//     subCategory: "electronics",
//     name: "Smart Watch Fitness Tracker with Heart Rate Monitor",
//     price: 149.99,
//     countInStock: 28,
//     purchasedCount: 89,
//     firstPicture: 0,
//     imagesUrl: [
//       "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
//       "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400"
//     ]
//   },
//   {
//     id: "6",
//     category: "electronics",
//     subCategory: "electronics",
//     name: "Portable Bluetooth Speaker - Waterproof & Wireless",
//     price: 59.99,
//     countInStock: 52,
//     purchasedCount: 73,
//     firstPicture: 0,
//     imagesUrl: [
//       "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400",
//       "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400"
//     ]
//   },
//   {
//     id: "7",
//     category: "fashion",
//     subCategory: "fashion",
//     name: "Classic Leather Backpack - Vintage Style",
//     price: 79.99,
//     countInStock: 41,
//     purchasedCount: 64,
//     firstPicture: 0,
//     imagesUrl: [
//       "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
//       "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=400"
//     ]
//   },
//   {
//     id: "8",
//     category: "fashion",
//     subCategory: "fashion",
//     name: "Designer Sunglasses - UV Protection Polarized",
//     price: 119.99,
//     countInStock: 38,
//     purchasedCount: 52,
//     firstPicture: 0,
//     imagesUrl: [
//       "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400",
//       "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400"
//     ]
//   },
//   {
//     id: "9",
//     category: "fashion",
//     subCategory: "fashion",
//     name: "Premium Cotton T-Shirt - Organic & Comfortable",
//     price: 24.99,
//     countInStock: 120,
//     purchasedCount: 201,
//     firstPicture: 0,
//     imagesUrl: [
//       "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
//       "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400"
//     ]
//   }
// ];

const CategorySection = ({ category, products }) => {
  const navigate = useNavigate();

  return (
    <div className="mb-5">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h2 className="fw-bold text-capitalize mb-2">{category}</h2>
          <div
            style={{
              height: "4px",
              width: "80px",
              background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
              borderRadius: "2px",
            }}
          ></div>
        </div>
        <button
          onClick={() => {
            navigate(`/category/${category}`);
          }}
          className="text-decoration-none fw-semibold d-flex align-items-center gap-2"
          style={{ color: "#667eea" }}
        >
          View All
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="row g-4">
        {products.map((product) => (
          <div key={product.id} className="col-12 col-md-6 col-lg-4">
            <Item itemInfo={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Home() {
  // Group products by category
  // categoriesPageItems is an array of arrays, each containing 3 products
  const { categoriesPageItems, loadingPage } = useContext(ShopContext);

  const allProducts = categoriesPageItems.flat();
  const groupedProducts = allProducts.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});

  return loadingPage ? (
    <LoadingPageComponent />
  ) : (
    <>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />

      <main className="container py-5">
        {Object.entries(groupedProducts).map(([category, products]) => (
          <CategorySection
            key={category}
            category={category}
            products={products}
          />
        ))}
      </main>
    </>
  );
}
