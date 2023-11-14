
const admin = require("firebase-admin")


require("dotenv").config()

 !admin.apps.length ? admin.initializeApp({
  credential: admin.credential.cert({
    projectId:"shop2-8814c",
    clientEmail:"firebase-adminsdk-1hngd@shop2-8814c.iam.gserviceaccount.com",
    privateKey:process.env.FIREBASE_PRIVATE_KEY
  }),
  databaseURL:"https://shop2-8814c.firebaseapp.com/"
}) : admin.app()
//.split(String.raw`\n`).join('\n')

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const db = admin.firestore()





exports.handler = async(event) => { 
    const {cartItems:cart , currentUser:user} = JSON.parse(event.body)

    if (!user || !cart) throw new error("please sign in before you proceed to payment");
    let totalPrice=0

    
    await db.runTransaction( async (transaction) => {
        let arrayOfDocRefAndCount = []

        for (let item of cart) {
          
          const docRef = db.collection("PRODUCTS").doc(item.category.toLocaleUpperCase()).collection(item.category.toLocaleUpperCase()).doc(item.id)

          try {
            
            const purchasedItemDoc = await transaction.get(docRef);
            if (!purchasedItemDoc) throw new Error("Document does not exist!");
            
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

  const paymentIntent = await stripe.paymentIntents.create({amount:+totalPrice*100 , currency:"usd" , payment_method_types: ["card"]}) 
  
  // await updateDoc(userDocRef , {purchasedItems:arrayUnion({...purchasedItems})} )
    return {statusCode:200 , body:JSON.stringify({paymentIntent})}
} catch(error){
    console.log(error) 
    return {statusCode:400 , body:JSON.stringify({error}) }
}
}

