import React, {useEffect, useState} from "react";
import {getListItemById} from "../api/api";
import {useParams} from "react-router-dom";
import {updateOneSmetaApi} from "../../api/smetas";
import {getAllCostsTotalSum} from "../../components/smetaItem/scripts/scripts";

export const useManageSmetaItem = () => {
    const {id} = useParams<{ id: string }>()
    const [smetaItem, setSmetaItem] = React.useState<any>({Smetacosts:[],
        Smetaroadcosts:[],
        Smetamealcosts:[],
        Smetatransportcosts:[],
        Smetaroaccomodations:[],
        Smetaplans:[]
    })
    const [isLoading, setIsLoading] = React.useState<any>([])
    const [respStatus, setRespStatus] = React.useState<any>([])
    const [error, setErrorMessage] = useState('')
    const {Smetacosts,Smetaroadcosts,Smetamealcosts,Smetatransportcosts,Smetaroaccomodations,Smetaplans}=smetaItem

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
        const totalAddCosts =  getAllCostsTotalSum(Smetacosts, "sum")
        const totalRoadCosts =  getAllCostsTotalSum(Smetaroadcosts, "totalCost")
        const totalMealCosts = getAllCostsTotalSum(Smetamealcosts, "totalCost")
        const totalTransportCosts = getAllCostsTotalSum(Smetatransportcosts, "totalCost")
        const totalAcommodationsCosts = getAllCostsTotalSum(Smetaroaccomodations, "totalCost")
        const totalSmetaplanCosts = getAllCostsTotalSum(Smetaplans, "totalPrice")
        const result= `${totalAcommodationsCosts + totalSmetaplanCosts + totalMealCosts + totalTransportCosts + totalRoadCosts + totalAddCosts}`
        handleChangeSmetaItem('totalAllSum',result)
    }, [Smetacosts,Smetaroadcosts,Smetamealcosts,Smetatransportcosts,Smetaroaccomodations,Smetaplans]);

    useEffect(() => {
        getSmetaItem()
    }, [])


    return {
        smetaItem, isLoading, error, handleChangeSmetaItem, setIsLoading, updateSmetaItem, respStatus, setRespStatus, setErrorMessage
    }

}