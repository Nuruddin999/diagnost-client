import React, {useEffect, useState} from "react";
import {getListItemById} from "../api/api";
import {useParams} from "react-router-dom";
import {updateOneSmetaApi} from "../../api/smetas";

export const useManageSmetaItem = () => {
    const {id} = useParams<{ id: string }>()
    const [smetaItem, setSmetaItem] = React.useState<any>({})
    const [isLoading, setIsLoading] = React.useState<any>([])
    const [respStatus, setRespStatus] = React.useState<any>([])
    const [error, setErrorMessage] = useState('')

    const handleChangeSmetaItem = (field: string, payload: any) => {
        setSmetaItem((state: any) => ({...state, [field]: payload}))
    }

    const getSmetaItem = async () => {
        try {
            setIsLoading(true)
            const response = await getListItemById(id, 'smetas')
            setSmetaItem(response)
        } catch (e) {
            setErrorMessage(e?.message)
        } finally {
            setIsLoading(false)
        }
    }

    const updateSmetaItem = async () => {
        try {
            setIsLoading(true)
            await updateOneSmetaApi(smetaItem)
            setRespStatus("ok")
        } catch (e) {
            setErrorMessage(e?.message)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getSmetaItem()
    }, [])


    return {
        smetaItem, isLoading, error, handleChangeSmetaItem, setIsLoading, updateSmetaItem, respStatus, setRespStatus, setErrorMessage
    }

}