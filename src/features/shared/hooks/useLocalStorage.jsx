import { useState } from "react"

const mixTwoArr = (arr1, arr2) => {
    const arrMap1 = new Map(arr1.map((obj) => [obj.a, obj]))
    const arrMap2 = new Map(arr2.map((obj) => [obj.a, obj]))

    const mixMap = new Map([...arrMap1, ...arrMap2])
    const finalArr = [...mixMap.values()]
    return finalArr
}


const useLocalStorage = (key, initialData = []) => {
    const [localData, setLocalData] = useState(() => {
        try {
            const item = JSON.parse(localStorage.getItem(key)) || []
            const mixedArr = mixTwoArr(item, initialData)
            return mixedArr
            // return item ? [...JSON.parse(item), ...initialData] : initialData
        } catch (error) {
            console.log(error)
            return initialData
        }
    })

    const setData = (data) => {
        try {
            localStorage.setItem(key, JSON.stringify(data))
            setLocalData(data)
        } catch (error) {
            console.log(error)
        }
    }



    return [localData, setData]
}


export default useLocalStorage