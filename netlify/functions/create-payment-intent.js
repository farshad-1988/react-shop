const { initializeApp } = require("firebase/app");
const { runTransaction, doc, getFirestore, updateDoc, collection, addDoc, arrayUnion } = require("firebase/firestore");
// const { initializeApp } = require('firebase-admin/app');
// var serviceAccount = require("path/to/serviceAccountKey.json");
// var admin = require("firebase-admin");
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

require("dotenv").config()
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)



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


exports.handler = async(event) => { 
    const {cartItems:cart , currentUser:user} = JSON.parse(event.body)

    if (!user || !cart) throw new error("please sign in before you proceed to payment");
    let totalPrice=0

    
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
            if (!purchasedItemDoc.exists()) throw new Error("Document does not exist!");
            
            const newCountInStock = purchasedItemDoc.data().countInStock - item.countInCart;
            const newPurchasedCount = purchasedItemDoc.data().purchasedCount + item.countInCart;
            
            totalPrice += item.countInCart * purchasedItemDoc.data().price
            if(newCountInStock<=0) throw new Error("stock is not enough!");

            arrayOfDocRefAndCount.push({docRef,countInStock:newCountInStock , purchasedCount:newPurchasedCount })
            
          } catch (error) {
            throw new Error(error)
          }
          }
          for(let obj of arrayOfDocRefAndCount){
              transaction.update(obj.docRef, { countInStock: obj.countInStock , purchasedCount:obj.purchasedCount });
          }
    });
    
try{
  // const userDocRef = doc(
  //   db,
  //   "USERS",
  //   user.uid
  // )
  // const purchasedItems = cart.map((item)=>{
  //   const {countInCart , imagesUrl , category , name , price} = {...item}
  //   return {countInCart , imagesUrl , category , name , price}
  // })
  const paymentIntent = await stripe.paymentIntents.create({amount:+totalPrice*100 , currency:"usd" , payment_method_types: ["card"]}) 
  
  // await updateDoc(userDocRef , {purchasedItems:arrayUnion({...purchasedItems})} )
    return {statusCode:200 , body:JSON.stringify({paymentIntent})}
} catch(error){
    console.log(error) 
    return {statusCode:400 , body:JSON.stringify({error}) }
}
}

