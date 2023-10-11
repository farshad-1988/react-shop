import { initializeApp } from "firebase/app";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  or,
  query,
  runTransaction,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
const firebaseConfig = {
  apiKey: "AIzaSyBPJBEm5z9LMK2O4B4RcDE4DN31zGVeEuc",
  authDomain: "shop2-8814c.firebaseapp.com",
  projectId: "shop2-8814c",
  storageBucket: "shop2-8814c.appspot.com",
  messagingSenderId: "727418831827",
  appId: "1:727418831827:web:2e383f2375726baa91e526",
  measurementId: "G-XKJR5KWZ6M",
};
//baag sign in empty cart , sign out dont empty context

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();


export const getUser = () => {
  return auth.currentUser;
};

export const signInWithEmail = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    alert(error);
  }
};

export const signUpWithEmail = async (email, password, displayName) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser, { displayName });
  } catch (error) {
    console.log(error);
  }
};

export const signOutUser = async () => {
  await signOut(auth);
  localStorage.setItem("cart", "[]");
};

export const userAuthChange = (cb) => {
  return onAuthStateChanged(auth, cb);
};



export const syncLocalStorageDbAndContext = async (
  user,
  currentCart = [],
  newSignIn
) => {
  if (!user) {
    localStorage.setItem("cart", JSON.stringify(currentCart));
    return [...currentCart];
  }

  if (newSignIn === "signup") {
    const docRef = doc(db, "USERS", user.uid);
    await setDoc(docRef, {
      email: user.email,
      displayName: user.displayName,
      createAt: serverTimestamp(),
      loginAt: serverTimestamp(),
      cart: currentCart,
    });
    return currentCart
  }

  const docRef = doc(db, "USERS", user.uid);
  const userSnapshot = await getDoc(docRef);

  if (userSnapshot.exists()) {
    const userInfoOnDB = userSnapshot.data();
    let newCart;
    if (newSignIn === "signin") {
      console.log("signin")
      const newCartWithRepeatedItem = [...userInfoOnDB.cart, ...currentCart];
      const itemWithoutRepeat = newCartWithRepeatedItem.filter(
        (itemFromFilter, index) =>
          index ===
          newCartWithRepeatedItem.findIndex((itemFromFind) => itemFromFind.id === itemFromFilter.id)
      );

      newCart = itemWithoutRepeat.map((item)=>{
        const arrOffOneOrTwoObj = newCartWithRepeatedItem.filter((repeatedItem)=>repeatedItem.id === item.id)
        // console.log(arrOffOneOrTwoObj[0].countInCart)
        if(arrOffOneOrTwoObj.length===2){
          return {...item , countInCart:arrOffOneOrTwoObj[0].countInCart + arrOffOneOrTwoObj[1].countInCart}
        }else {
          return item
        }
      })
    } else {
      newCart = [...currentCart];
    }
    // const newCart2 = newCart.filter((item)=>item.countInCart!==0)
    await updateDoc(docRef, { cart: newCart, loginAt: serverTimestamp() , displayName:user.displayName });
    localStorage.setItem("cart", JSON.stringify([...newCart]));
    return [...newCart];
  }
};


export const getCategoriesNameFromDB = async () => {
  const localCat = JSON.parse(localStorage.getItem("categories"));
  if (localCat && localCat?.timeSet + 360000 > new Date().getTime())
    return localCat.categories;

  const docRef = doc(db, "ADDITIONAL_INFO", "CATEGORIES");
  const categoriesSnapshot = await getDoc(docRef);
  const categories = categoriesSnapshot.data();
  localStorage.setItem(
    "categories",
    JSON.stringify({ ...categories, timeSet: new Date().getTime() })
  );
  return categories?.categories || [];
};



export const searchFirestore = async (categories, text) => {
  const allItems = await categories.map(async (category) => {
    try {
      const colRef = collection(db, "SHOP_ITEMS", category, category);
      const q = query(
        colRef,
        or(
          where("splittedName", "array-contains", text),
          where("category", "==", text)
        )
      );
      const itemsSnapshot = await getDocs(q);
      return itemsSnapshot.docs.map((item) => {
        return item.data();
      });
    } catch (error) {
      console.log(error.code, error.message);
    }
  });
  return await Promise.all(allItems);
};




export const getThreeOfEachCat = async (categories) => {
  const allItems = await categories?.map(async (category) => {
    try {
      const colRef = collection(db, "SHOP_ITEMS", category, category);
      const q = query(colRef, limit(3));
      const itemsSnapshot = await getDocs(q);
      return itemsSnapshot.docs.map((item) => {
        return item.data();
      });
    } catch (error) {
      console.log(error.code, error.message);
    }
  });
  return await Promise.all(allItems);
};



export const getSingleCategoryItem = async (category) => {
  category = category.toLocaleUpperCase();
  const colRef = collection(db, "SHOP_ITEMS", category, category);
  const q = query(colRef, limit(10));
  const itemsSnapshot = await getDocs(q);
  return itemsSnapshot.docs.map((item) => item.data());
};





export const finalPay = async (user, cart) => {
  if (!user) return alert("please sign in before you proceed to payment");
  await runTransaction(db, async (transaction) => {

    let arrayOfDocRefAndCount = []

    for (let item of cart) {
      const docRef = doc(
        db,
        "SHOP_ITEMS",
        item.category.toLocaleUpperCase(),
        item.category.toLocaleUpperCase(),
        item.id
      )
      try {
        const purchasedItemDoc = await transaction.get(docRef);
        if (!purchasedItemDoc.exists()) {
          throw new Error("Document does not exist!");
        }
        
        const newCount = purchasedItemDoc.data().countInStock - item.countInCart;
        if(newCount<=0){
          throw new Error("stock is not enough!");
        }
        arrayOfDocRefAndCount.push({docRef,countInStock:newCount})
        
      } catch (error) {
        alert(error)
      }
      }
      
      for(let obj of arrayOfDocRefAndCount){
          transaction.update(obj.docRef, { countInStock: obj.countInStock });
      }
});
}



export const setAllItemsOnFirestore = async (data) => {
  const categories = data.map((obj) => obj.title.toLocaleUpperCase());
  await setDoc(doc(db, "ADDITIONAL_INFO", "CATEGORIES"), { categories });

  const colRef = collection(db, "SHOP_ITEMS");
  const batch = writeBatch(db);
  data.forEach((object) => {
    object.items?.forEach((obj, index) => {
      const uuid = uuidv4()
      const docRef = doc(
        colRef,
        object.title.toLocaleUpperCase(),
        object.title.toLocaleUpperCase(),
        uuid
      );

      //boiler plate code
      const imagesUrl = [];
      for (let i = 0; i < 3; i++) {
        imagesUrl.push(obj.imageUrl);
      }

      batch.set(docRef, {
        price: obj.price,
        id:uuid ,
        imagesUrl,
        name: obj.name.toLocaleLowerCase(),
        splittedName: obj.name.toLocaleLowerCase().split(" "),
        category: object.title.toLocaleLowerCase(),
        subCategory: object.title.toLocaleLowerCase(),
        countInStock: 100,
      });
    });
  });
  await batch.commit();
  console.log("data uploaded");
};