import {useState} from "react";

export const useSmetaItemTable=(headers:any,handleChangeSmeta:any,data:any,fieldName:string)=>{
    const [localObj, setLocalObj] = useState<any>({})
    const [error, setError] = useState<boolean>(false)
    const addDataToTable = () => {
        const localObjkeys = Object.keys(localObj)
        const notValidValue = localObjkeys.find(lcKey => !localObj[lcKey as any].toString().trim())
        const notValidField = localObjkeys.length < headers.length || notValidValue
        if (notValidField) {
            setError(true)
            return
        }

        const newList = [...data, localObj]
        handleChangeSmeta(fieldName, newList)
        setLocalObj({})
    }

    const removeDataToTable = (id: number) => {
        const newList = data.filter((el: any, index: number) => index !== id)
        handleChangeSmeta(fieldName, newList)
    }

    return {
        addDataToTable,removeDataToTable,localObj,error, setLocalObj, setError
    }
}