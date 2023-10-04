
import { initializeApp } from "firebase/app";
import { Timestamp, collection, collectionGroup, doc, getDoc, getDocs, getFirestore, limit, query, serverTimestamp, setDoc, updateDoc, where, writeBatch } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword , createUserWithEmailAndPassword, onAuthStateChanged,signOut, updateProfile} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBPJBEm5z9LMK2O4B4RcDE4DN31zGVeEuc",
  authDomain: "shop2-8814c.firebaseapp.com",
  projectId: "shop2-8814c",
  storageBucket: "shop2-8814c.appspot.com",
  messagingSenderId: "727418831827",
  appId: "1:727418831827:web:2e383f2375726baa91e526",
  measurementId: "G-XKJR5KWZ6M"
};
//baag sign in empty cart , sign out dont empty context

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export const auth = getAuth()

export const getUser =()=> {
  return auth.currentUser
}





export const signInWithEmail  = async (email , password) =>{
  
  try {
    await signInWithEmailAndPassword(auth , email , password)
  } catch (error) {
    alert(error)
  }
}

export const signUpWithEmail  =async (email , password , displayName) =>{
  try {
    await createUserWithEmailAndPassword(auth , email , password)
    await updateProfile(auth.currentUser , {displayName})

  } catch (error) {
    console.log(error)
  }
}

export const signOutUser = async()=>{
  await signOut(auth)
  localStorage.setItem("cart","[]")
}

export const userAuthChange =(cb)=>{
  return onAuthStateChanged(auth , cb)
}

export const incrementAndDecrementItems =async (user , currentCart)=>{
    if(!user){
    localStorage.setItem("cart" , JSON.stringify(currentCart))
    return [...currentCart]
  }

  const docRef = doc(db , "USERS" , user.uid)
  await updateDoc(docRef , {cart:currentCart , loginAt:serverTimestamp()})


}



//set function for merging and call it for localstorage and cart
export const syncLocalStorageDbAndContext =async (user , currentCart=[] ,newSignIn)=>{
  if(!user){
    localStorage.setItem("cart" , JSON.stringify(currentCart))
    return [...currentCart]
  }
  if(newSignIn==="signup"){
    const docRef = doc(db , "USERS" , user.uid)
    await setDoc(docRef , {email:user.email,displayName:user.displayName , createAt:serverTimestamp(),loginAt:serverTimestamp() , cart:currentCart})
    return
  }


  const docRef = doc(db , "USERS" , user.uid)
  const userSnapshot = await getDoc(docRef)

  if(userSnapshot.exists()){
    const userInfoOnDB = userSnapshot.data()
    let newCart
    if(newSignIn==="signin"){
      console.log("1")
      const newCartWithRepeatedItem =[...userInfoOnDB.cart , ...currentCart]
      newCart = newCartWithRepeatedItem.filter((item , index)=>
      index===newCartWithRepeatedItem.findIndex(item2=>item2.id===item.id))
    }else{
      console.log("2")
      newCart = [...currentCart]
    }
      // console.log(newCart)
    await updateDoc(docRef , {cart:newCart , loginAt:serverTimestamp()})
    //? 
    // newCart !== localCart && localStorage.setItem("cart" , JSON.stringify(newCart))
    
    localStorage.setItem("cart",JSON.stringify([...newCart]))
    return [...newCart]
  // }else {
  //   const localCart = JSON.parse(localStorage.getItem("cart")) || []
  //   console.log()
  //   const docRef = doc(db , "USERS" , auth.currentUser.uid)
  //   await setDoc(docRef , {email:user.email,displayName:user.displayName , createAt:serverTimestamp(),loginAt:serverTimestamp() , cart:localCart})
  }
}

//give an array of objects with title as category and array of items in that category
export const setAllItemsOnFirestore = async(data)=>{
  //create uid for items and set them with uid for track in db and avoid repeatedz
  const categories = data.map((obj)=>obj.title.toLocaleUpperCase())
  await setDoc(doc(db , "ADDITIONAL_INFO" , "CATEGORIES") , {categories})

  const colRef = collection(db , "SHOP_ITEMS")
  const batch = writeBatch(db)
    data.forEach((object) => {
      object.items?.forEach((obj, index)=>{
        const docRef = doc(colRef, object.title.toLocaleUpperCase() ,object.title.toLocaleUpperCase(), `item${index+1}`);
        batch.set(docRef, {...obj , category:object.title , subCategory:object.title});
      })
  })
  await batch.commit()
  console.log("data uploaded")
}




export const updateCartInfo =async (cart , user)=>{
  // if(user){
  //   const docRef = doc(db , "USERS" , user.uid)
  //   await updateDoc(docRef , {cart})
  //   // console.log(dd)
  // }
  // // localStorage.setItem("cart" , JSON.stringify(cart))
}
//test what link inside a page go to

// export const gettingCollectionInfo = async (colName)=>{
//   const rawData = await getDocs(collection(db, colName));
//   let fixedCollection = []
//   rawData?.forEach((q) => {
//       fixedCollection = [...fixedCollection , q.data()]
//   });
//   return fixedCollection
// } 


export const getCategoriesNameFromDB = async()=>{
  const localCat = JSON.parse(localStorage.getItem("categories"))
  if(localCat && localCat?.timeSet + 360000 > new Date().getTime())return localCat.categories


  const docRef = doc(db , "ADDITIONAL_INFO" , "CATEGORIES")
  const categoriesSnapshot = await getDoc(docRef)
  const categories = categoriesSnapshot.data()
  localStorage.setItem("categories",JSON.stringify({...categories , timeSet:new Date().getTime()}))
  return categories?.categories || []
} 

export const searchFirestore =async(categories,text)=>{
  const allItems = await categories.map(async (category)=>{
    try {
      const colRef = collection(db , "SHOP_ITEMS" , category , category)
      //you should make an array from words and use in for that array, also make all text in lowercase for simplicity
      const q = query(colRef, where("category" ,"in", text[0].toUpperCase() +text.slice(1)))
      const itemsSnapshot = await getDocs(q)
      return itemsSnapshot.docs.map((item)=>{
        return item.data()
      })
    } catch (error) {
      console.log(error.code , error.message)
    }
  })
  return await Promise.all(allItems)
} 

// collection should odd number in path
export const getThreeOfEachCat = async (categories)=>{

  const allItems = await categories?.map(async (category)=>{
    try {
      const colRef = collection(db , "SHOP_ITEMS" , category , category)
      const q = query(colRef, limit(3))
      const itemsSnapshot = await getDocs(q)
      return itemsSnapshot.docs.map((item)=>{
        return item.data()
      })
    } catch (error) {
      console.log(error.code , error.message)
    }
  })
  return await Promise.all(allItems)
}


export const getSingleCategoryItem =async (category)=>{
  category = category.toLocaleUpperCase()
  const colRef = collection(db , "SHOP_ITEMS" , category , category)
  const q = query(colRef, limit(10))
  const itemsSnapshot = await getDocs(q)
  return itemsSnapshot.docs.map((item)=>{
    // console.log(item.data())
    return item.data()
  })
}

