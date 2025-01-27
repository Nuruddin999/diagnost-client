import React, {useEffect, useState} from "react";
import {getListItemById} from "../api/api";
import {useParams} from "react-router-dom";
import {
    addSmetaReworkCommentApi,
    updateOneSmetaApi,
    updateSmetaStatusApi,
    uploadMultipleFilesApi
} from "../../api/smetas";
import {getAllCostsTotalSum} from "../../components/smetaItem/scripts/scripts";
import {formatPhone} from "../utils";

export const useManageSmetaItem = () => {
    const {id} = useParams<{ id: string }>()
    const [smetaItem, setSmetaItem] = React.useState<any>({
        Smetacosts: [],
        Smetaroadcosts: [],
        Smetamealcosts: [],
        Smetatransportcosts: [],
        Smetaroaccomodations: [],
        Smetaplans: [],
    })
    const [isLoading, setIsLoading] = React.useState<any>([])
    const [respStatus, setRespStatus] = React.useState<any>([])
    const [error, setErrorMessage] = useState('')
    const {
        Smetacosts,
        Smetaroadcosts,
        Smetamealcosts,
        Smetatransportcosts,
        Smetaroaccomodations,
        Smetaplans
    } = smetaItem

    const handleChangeSmetaItem = (field: string, payload: any) => {
        setSmetaItem((state: any) => ({...state, [field]: payload}))
    }

    const getSmetaItem = async () => {
        try {
            setIsLoading(true)
            const response = await getListItemById(id, 'smetas')
            const formattedSmetaPlans = response.Smetaplans.map((el:any)=>({...el, phone:formatPhone(el.phone || '')}))
            setSmetaItem({...response, Smetaplans: formattedSmetaPlans })
        } catch (e) {
            setErrorMessage(e?.message)
        } finally {
            setIsLoading(false)
        }
    }

    const updateSmetaItem = async () => {
        await updateWrapper(() => updateOneSmetaApi(smetaItem))
    }

    const updateSmetaStatus = async (status: string) => {
        await updateWrapper(() => updateSmetaStatusApi(id, status))
    }

    const handleUploadFiles = async (id: string, files: Array<File>) => {
        if (files.length > 0) {
            await uploadMultipleFilesApi(id, files)
        }
    }

    const handleUploadComment = async (reworkComment: string, files: Array<File>) => {
        if (reworkComment.trim()) {
            try {
                setIsLoading(true)
                const result = await addSmetaReworkCommentApi(smetaItem.id, reworkComment)
                await handleUploadFiles(result.added, files)
                await updateSmetaStatusApi(id, 'rework')
            } catch (e) {

            } finally {
                setIsLoading(false)
            }

        }
    }


    const updateWrapper = async (callback: any) => {
        try {
            setIsLoading(true)
            await callback()
            setRespStatus("ok")
        } catch (e) {
            setErrorMessage(e?.message)
        } finally {
            setIsLoading(false)
        }
    }


    useEffect(() => {
        const totalAddCosts = getAllCostsTotalSum(Smetacosts, "sum")
        const totalRoadCosts = getAllCostsTotalSum(Smetaroadcosts, "totalCost")
        const totalMealCosts = getAllCostsTotalSum(Smetamealcosts, "totalCost")
        const totalTransportCosts = getAllCostsTotalSum(Smetatransportcosts, "totalCost")
        const totalAcommodationsCosts = getAllCostsTotalSum(Smetaroaccomodations, "totalCost")
        const totalSmetaplanCosts = getAllCostsTotalSum(Smetaplans, "totalPrice")
        const result = `${totalAcommodationsCosts + totalSmetaplanCosts + totalMealCosts + totalTransportCosts + totalRoadCosts + totalAddCosts}`
        handleChangeSmetaItem('totalAllSum', result)
    }, [Smetacosts, Smetaroadcosts, Smetamealcosts, Smetatransportcosts, Smetaroaccomodations, Smetaplans]);

    useEffect(() => {
        getSmetaItem()
    }, [])


    return {
        smetaItem,
        isLoading,
        error,
        handleChangeSmetaItem,
        setIsLoading,
        updateSmetaItem,
        respStatus,
        setRespStatus,
        setErrorMessage,
        updateSmetaStatus,
        handleUploadComment
    }

}