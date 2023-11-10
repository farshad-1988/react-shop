import { initializeApp } from "firebase/app";
import {
  Timestamp,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  or,
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
  setDoc,
  startAfter,
  startAt,
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
  GoogleAuthProvider,
  signInWithPopup,
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
export const db = getFirestore(app);
export const auth = getAuth();

export const getUser = () => {
  return auth.currentUser;
};

export const getDocumentUser = async (uid) => {
  const docRef = doc(db, "USERS", uid);
  const userSnapshot = await getDoc(docRef);
  const userInfo = userSnapshot.data();
  return userInfo;
};

export const editDocumentUser = async (uid  ,name , lastName ,address , phoneNumber) => {
  const docRef = doc(db, "USERS", uid);
  await updateDoc(docRef , {name , lastName ,address , phoneNumber});
  console.log("done");
};



//   if (newSignIn === "signin") {

//       // console.log(arrOffOneOrTwoObj[0].countInCart)
//   //purchasedItem:[]
//   // const newCart2 = newCart.filter((item)=>item.countInCart!==0)
//   return [...newCart];
// }

export const registerPurchasedItem = async (
  uid,
  cartItems,
  totalCountPrice,
  deliveryDay
) => {
  const purchasedItems = cartItems.map((purchasedItem) => {
    const { countInStock, ...rest } = { ...purchasedItem };
    return { ...rest };
  });
  // console.log(Math.round(Date.now()*0.001))
  const summaryPurchaseInfo = {
    ...totalCountPrice,
    purchasedAt: new Date(),
    purchasedId: uuidv4(),
    deliveryDay
  };
  const userDocRef = doc(db, "USERS", uid);
  await updateDoc(userDocRef, {
    purchasedItems: arrayUnion({ purchasedItems, summaryPurchaseInfo ,cart:[]}),
  });
  localStorage.setItem("cart" , JSON.stringify([]))
};

export const signUpWithEmail = async (
  email,
  name,
  lastName,
  password,
  address,
  phoneNumber,
  currentCart
) => {
  try {
    const userCredetial = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(auth.currentUser, { displayName: name + " " + lastName });
    const uid = userCredetial.user.uid;
    const docRef = doc(db, "USERS", uid);
    await setDoc(docRef, {
      email,
      name,
      lastName,
      address,
      phoneNumber,
      createAt: serverTimestamp(),
      loginAt: serverTimestamp(),
      cart: currentCart,
      uid,
      purchasedItems:[]
    });
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
  currentCart = []
) => {
  if (!user) {
    localStorage.setItem("cart", JSON.stringify(currentCart));
    return [...currentCart];
  }
  const docRef = doc(db, "USERS", user.uid);
  let newCart = currentCart.map((item)=>({...item , loading:false}))
    await updateDoc(docRef, {
      cart: newCart,
      loginAt: serverTimestamp()
    });
    localStorage.setItem("cart", JSON.stringify([...newCart]));
    return newCart;
  }
// };

export const getCategoriesNameFromDB = async () => {
  const localCat = JSON.parse(localStorage.getItem("categories"));
  if (localCat && localCat?.timeSet + 360000 > new Date().getTime())
    return localCat;

  const docRef = doc(db, "ADDITIONAL_INFO", "CATEGORIES");
  const categoriesSnapshot = await getDoc(docRef);
  const categoriesAndTips = categoriesSnapshot.data();
  localStorage.setItem(
    "categories",
    JSON.stringify({ ...categoriesAndTips, timeSet: new Date().getTime() })
  );
  return categoriesAndTips || {};
};


export const searchFirestore = async (categories, text) => {
  const CATEGORIES = categories.map((category)=>category.toLocaleUpperCase())
  try {
  const allItems = await CATEGORIES.map(async (category) => {
      const colRef = collection(db, "PRODUCTS", category, category);
      const q = query(
        colRef,
        or(
          where("splittedName", "array-contains", text),
          where("category", "==", text)
        )
      );
      const itemsSnapshot = await getDocs(q);
      return itemsSnapshot.docs.map((item) => item.data())
    })

    return await Promise.all(allItems);
  } catch (error) {
    console.log(error.code, error.message);
  }
};

export const getThreeOfEachCat = async (categories) => {
  const CATEGORIES = categories.map((category)=>category.toLocaleUpperCase())
  const allItems = await CATEGORIES?.map(async (category) => {
    try {
      const colRef = collection(db, "PRODUCTS", category, category);
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

export const getSingleCategoryItem = async (category , lastItem , sortType) => {
  category = category?.toLocaleUpperCase();
  const colRef = collection(db, "PRODUCTS", category, category);
  
  let q
  if(lastItem){
    q = query(colRef, limit(5), orderBy(sortType[0], sortType[1]), startAfter(lastItem) );
  }else{
    q=query(colRef, limit(5) , orderBy(sortType[0], sortType[1]));
  }
  const itemsSnapshot = await getDocs(q);
  return itemsSnapshot.docs
};




export const singleItemFullInfo = async(category , productId)=>{
  const docRef = doc(db ,"PRODUCTS", category , category , productId)
  const snapShot = await getDoc(docRef)
  const itemInfo =snapShot.data()
  return itemInfo
}

const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({
  prompt:"select_account"
})


const syncDataWhenSignIn = async(userSnapshot , currentCart , uid)=>{
  const docRef = doc(db , "USERS" , uid)
  let newCart;
  if (userSnapshot.exists()) {
    const userInfoOnDB = userSnapshot.data();
    const newCartWithRepeatedItem = [...userInfoOnDB.cart, ...currentCart];
    const itemWithoutRepeat = newCartWithRepeatedItem.filter(
      (itemFromFilter, index) =>
        index ===
        newCartWithRepeatedItem.findIndex(
          (itemFromFind) => itemFromFind.id === itemFromFilter.id
        )
    );
    newCart = itemWithoutRepeat.map((item) => {
      const arrOffOneOrTwoObj = newCartWithRepeatedItem.filter(
        (repeatedItem) => repeatedItem.id === item.id
      );
      if (arrOffOneOrTwoObj.length === 2) {
        return {
          ...item,
          countInCart:
            arrOffOneOrTwoObj[0].countInCart +
            arrOffOneOrTwoObj[1].countInCart,
        };
      } else {
        return item;
      }
    });
  }else {
      newCart = [...currentCart];
    }
    await updateDoc(docRef, { cart: newCart, loginAt: serverTimestamp() });
    localStorage.setItem("cart", JSON.stringify([...newCart]));
    return [...newCart]
}

export const signInWithGoogle = async (currentCart)=>{
  const userCredetial = await signInWithPopup(auth , googleProvider)
  const docRef = doc(db , "USERS" , userCredetial.user.uid)
  const userSnapshot = await getDoc(docRef)
  let newCart
  if(!userSnapshot.exists()){
    const [name , lastName]= userCredetial.user.displayName.split(" ")
    await setDoc(docRef , {cart:currentCart,purchasedItems:[],name , lastName,email:userCredetial.user.email , userId:userCredetial.user.uid , createAt:serverTimestamp() , loginAt:serverTimestamp()})
  }else {
    //duplicate code must check
    // await updateDoc(docRef , {cart:currentCart ,loginAt:serverTimestamp()})
    newCart = await syncDataWhenSignIn(userSnapshot , currentCart , userCredetial.user.uid)
  }
  return userSnapshot.data()?.address ? {user:userCredetial.user,hasAddress:true,newCart} : {user:userCredetial.user,hasAddress:false,newCart:false}
  
}


export const signInWithEmail = async (email, password , currentCart) => {
  try {
    const userCredetial = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const docRef = doc(db, "USERS", userCredetial.user.uid);
    const userSnapshot = await getDoc(docRef);


      const newCart = await syncDataWhenSignIn(userSnapshot , currentCart , userCredetial.user.uid)
      return newCart
  } catch (error) {
    alert(error);
  }
};



export const setAllItemsOnFirestore = async (data) => {
  const categories = data.map((obj) => obj.title.toLocaleUpperCase());
  await setDoc(doc(db, "ADDITIONAL_INFO", "CATEGORIES"), { categories });
  const colRef = collection(db, "PRODUCTS");
  const batch = writeBatch(db);
  data.forEach((object) => {
    object.items?.forEach((obj, index) => {
      const uuid = uuidv4();
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
        id: uuid,
        imagesUrl,
        name: obj.name.toLocaleLowerCase(),
        splittedName: obj.name.toLocaleLowerCase().split(" "),
        category: object.title.toLocaleLowerCase(),
        subCategory: object.title.toLocaleLowerCase(),
        countInStock: 100,
        purchasedCount:0,
        dateAdded:new Date()
      });
    });
  });
  await batch.commit();
  console.log("data uploaded");
};