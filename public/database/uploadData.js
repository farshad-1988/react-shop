import { db } from "../../src/firebase.config";
import { doc, setDoc } from "firebase/firestore";


const newf = async()=>{
    await setDoc(doc(db, "cities", "LA"), {
        name: "Los Angeles",
        state: "CA",
        country: "USA"
      });
}

newf()