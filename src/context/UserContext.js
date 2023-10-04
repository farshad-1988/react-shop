import { createContext, useEffect, useState } from "react"
import { syncLocalStorageDbAndContext, userAuthChange } from "../firebase.config"


export const UserContext = createContext({
    currentUser:null,
    setCurrentUser:()=>{}
})

// const getUser = ()=>auth.currentUser


const UserContextProvider = ({children})=>{
    const [currentUser , setCurrentUser] = useState(null)

    useEffect(()=>{
        const unsubscribe = userAuthChange((user)=>{
            // if(user){
            //     // syncLocalStorageDbAndContext(user)
            // }
            console.log("userUpdated")
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

