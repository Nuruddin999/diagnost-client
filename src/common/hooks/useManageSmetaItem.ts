import React, {useEffect, useState} from "react";
import {deleteOneApplicationApi} from "../../api/application";
import {getListItemById} from "../api/api";
import {useParams} from "react-router-dom";

export const useManageSmetaItem = () => {
    const {id} = useParams<{ id: string }>()
    const [smetaItem, setSmetaItem] = React.useState<any>({})
    const [isLoading, setIsLoading] = React.useState<any>([])
    const [error, setErrorMessage] = useState('')

    const handleChangeSmetaItem =(field:string,payload:any)=>{
        setSmetaItem((state:any)=>({...state,[field]:payload}))
    }

    const getSmetaItem =async ()=>{
        try {
            setIsLoading(true)
            const response = await getListItemById(id,'smetas')
            setSmetaItem(response)
        } catch (e) {
            setErrorMessage(e?.message)
        } finally {
            setIsLoading(false)
        }
    }


    useEffect(()=>{
getSmetaItem()
    },[])



    const fetchApp = async (page: number, limit: number, manager: string, patientName: string, patientRequest: string, fundName: string, fundRequest: string) => {
        setIsLoading(true)
        try {
        } catch (e) {
            setErrorMessage(e?.message)
        } finally {
            setIsLoading(false)
        }
    }

    const deleteAppl = async (value: number) => {
        setIsLoading(true)
        try {
            await deleteOneApplicationApi(value.toString())
        } catch (e) {
            setErrorMessage(e?.message)
        } finally {
            setIsLoading(false)
        }

    };

    return {
      smetaItem, isLoading, error, handleChangeSmetaItem
    }

}