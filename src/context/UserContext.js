import { createContext, useEffect, useState } from "react"
import { userAuthChange } from "../firebase.config"


export const UserContext = createContext({
    currentUser:null,
    setCurrentUser:()=>{}
})



const UserContextProvider = ({children})=>{
    const [currentUser , setCurrentUser] = useState(null)

    useEffect(()=>{
        const unsubscribe = userAuthChange((user)=>{
            setCurrentUser(user)
        })
        return unsubscribe
    },[])


    return (
    <UserContext.Provider value={{currentUser}}>
        {children}
    </UserContext.Provider>
    )
}

export default UserContextProvider

