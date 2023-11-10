// const { initializeApp } = require("firebase/app");
const admin = require("firebase-admin")
// const { runTransaction, doc, getFirestore, updateDoc, collection, addDoc, arrayUnion } = require("firebase/firestore");
// const { initializeApp , runTransaction } = require('firebase-admin/app');
const serviceAccount = require("./shop2-8814c-firebase-adminsdk-1hngd-5cc85cf7af.json");
require("dotenv").config()
// const ini = admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL:"https://shop2-8814c.firebaseapp.com/"
// });
const ini = admin.initializeApp({
  credential: admin.credential.cert({
    projectId:"shop2-8814c",
    clientEmail:"firebase-adminsdk-1hngd@shop2-8814c.iam.gserviceaccount.com",
    privateKey:process.env.FIREBASE_PRIVATE_KEY
  }),
  databaseURL:"https://shop2-8814c.firebaseapp.com/"
}, "admin");
//.split(String.raw`\n`).join('\n')

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const db = admin.firestore(ini)


// const firebaseConfig = {
//   apiKey: "AIzaSyBPJBEm5z9LMK2O4B4RcDE4DN31zGVeEuc",
//   authDomain: "shop2-8814c.firebaseapp.com",
//     projectId: "shop2-8814c",
//     storageBucket: "shop2-8814c.appspot.com",
//     messagingSenderId: "727418831827",
//     appId: "1:727418831827:web:2e383f2375726baa91e526",
//     measurementId: "G-XKJR5KWZ6M",
//   };
//   //baag sign in empty cart , sign out dont empty context
  
  

  

//   const app = initializeApp(firebaseConfig);
//   const db = getFirestore(app);


exports.handler = async(event) => { 
    const {cartItems:cart , currentUser:user} = JSON.parse(event.body)

    if (!user || !cart) throw new error("please sign in before you proceed to payment");
    let totalPrice=0

    
    await db.runTransaction( async (transaction) => {
        let arrayOfDocRefAndCount = []

        for (let item of cart) {
          
          const docRef = db.collection("PRODUCTS").doc(item.category.toLocaleUpperCase()).collection(item.category.toLocaleUpperCase()).doc(item.id)
            // "PRODUCTS",
            // item.category.toLocaleUpperCase(),
          //   item.category.toLocaleUpperCase(),
          //   item.id
          // )
          try {
            
            const purchasedItemDoc = await transaction.get(docRef);
            if (!purchasedItemDoc) throw new Error("Document does not exist!");
            // console.log(purchasedItemDoc)
            
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

