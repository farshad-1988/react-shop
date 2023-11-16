require("dotenv").config()

const admin = require("firebase-admin")



 !admin.apps.length ? admin.initializeApp({
  credential: admin.credential.cert({
    projectId:"shop2-8814c",
    clientEmail:"firebase-adminsdk-1hngd@shop2-8814c.iam.gserviceaccount.com",
    privateKey:`-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCnsdo8XtiIa0It\n2fKJuygZoXU0xSQ2hTLUmSRpl3inOOqLj68bUnViu5hOFyw4SccaZCLYZCoCcO0R\nqCi0njkttXJfBf4+z1iIQBI7iKsXL+I+HaVYwiuTkYgTKj6b6/9Q66sh5OBOnqAb\nUkOUoQ/Tgtqn0+2oyk+eru0hUN3bOV6qcRFTUtnL2u5IxEr+3eqoHlQDRRcYb+W8\ndYFaF08FE3SPCWMFcOXbtAIaWC6ZTag9OEgz2u153b9oN5H8g/wJIe6f74tJCnr3\njhXa2jBwk5bUKvlW4ba0qLN3/BJ3MRvl9AjAQf3X1Ihw0PUPKSWQ15OHdJ/yMJr+\nzNNV1mgHAgMBAAECggEAGqQHGxsoRDfh+h3LSbU5cCT11U3SbHTpt9uibMH7EXnZ\nzRUlCO6nJmnODu3ggQq7fkZVQNJc2ClviCQSX2tZgxj11AHEO9893dtr6hhSserS\nAvM7vueN+7Idj4nhC21JEOZ3t/k/502M+votMVILDRuXOB1TfsKxNnDszCOoMzje\nlbv2CFhZp9ILL7KJOa5IV0ccY2fadbAa9Jy3D2vF7jGauKM9FGG9uIBkO5QhaFQi\ngf4roEY+eSMlEfTmflp5RZt00UnXb13pcfTEGbGM50OePbOaUfkos4XGElsrdNTU\nQTfR+TE1u3daKJc0k1ABPxoQiHHIAkrMQCtTrM/CAQKBgQDZ/C5fMHKjOLUdmkq2\n4vImNu7rPbs766CECCa9xfJ4DHUgqUs/kLKfEDIbGma6nuafb+i7kM4nSaDkj1Gy\n2WryMo/eHOdNe3SyrUSRkQn5w5u+C0bHI0KJkBpoaP6wAL2oEgcbums21iplnRn2\ngC3zCeFoK2folCINauJqNMTyBwKBgQDE8HzaR/6d0QG4MrRrhVreW0pkBpSkMd+n\nz+2mDqV5/eEl8szP85kiMIAs553UNH21br168nLI1abi6OGIdRzPRGA2umnG/N84\nOy9RD1B2lb57gGWdk5DARisjlDou/L6kGwhfttH/L6rCjadzVvekltaCPeJwIjOe\nYneGsW1aAQKBgQCt6sYUrFLKZzQZqkByKh+I3ctBZL89z4EB1n8SahxKK6ZHqMqg\nrJHW1tUjSq0ruBvImUDWZXIVZmk38iD80PrCwhSG4gipiRZSeGt8uHt9CtP3jIer\n2jX8Cz0GkL6jLfQjZD7HoLRpy/WHnRBZ22rNvdRZiEgfCBEjI2QB2JhJgQKBgEyT\nokiSE/wzh/KirKreSK4LW0q3kFakGe47mJGoQknEISbLWT5G3zV/HGfZi/I2kubY\nb4799QoIoYK7wO55c0FYufyt0XGRZA6OXOCtDsF9inqlO13hQjixUBbejR02I77V\n0BS/lroeQ8ywnfroRxTVngU4oPKvKdkdOpLCLN4BAoGBAL5jE1RXuXwsIeGnWkGQ\nAJErCNe53KcxlZXOLYojBFoE5f0sd1ryoqHzJkjmPAmX8KZKZJugu97pIDevsx1Q\nN9w7U/hep/B/${process.env.FIREBASE_PRIVATE_KEY}+yhFOfImXf87t2eJjSffrt\nGeN40g7jJryDowEz5yvcuHHO\n-----END PRIVATE KEY-----\n`
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

