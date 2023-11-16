
const admin = require("firebase-admin")


require("dotenv").config()


const serviceAccount = {
  type: "service_account",
  project_id: "shop2-8814c",
  private_key_id: "48ed091846aba0ec37ff7177fc05349e6d4b40b8",
  private_key: process.env.FIREBASE_PRIVATE_KEY,
  client_email: "firebase-adminsdk-1hngd@shop2-8814c.iam.gserviceaccount.com",
  client_id: "108117369323790742378",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-1hngd%40shop2-8814c.iam.gserviceaccount.com",
  universe_domain: "googleapis.com"
}


 !admin.apps.length ? admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
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
    return {statusCode:200 ,    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Headers': 'Authorization'
    }, body:JSON.stringify({paymentIntent})}
} catch(error){
    console.log(error) 
    return {statusCode:400 , body:JSON.stringify({error}) }
}
}

