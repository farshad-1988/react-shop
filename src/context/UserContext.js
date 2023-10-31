import { createContext, useEffect, useState } from "react"
import { userAuthChange } from "../firebase.config"


export const UserContext = createContext({
    currentUser:null,
    setCurrentUser:()=>{}
})



const UserContextProvider = ({children})=>{
    const [currentUser , setCurrentUser] = useState(null)
    const [userDoc , setUserDoc] = useState()

    useEffect(()=>{
        const unsubscribe = userAuthChange((user)=>{
            setCurrentUser(user)
            
        })
        return unsubscribe
    },[])


    return (
    <UserContext.Provider value={{currentUser , userDoc , setUserDoc}}>
        {children}
    </UserContext.Provider>
    )
}

export default UserContextProvider

