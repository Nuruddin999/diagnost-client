import { useSelector} from "react-redux";
import React, {useState} from "react";
import {RootState} from "../../app/store";
import {changeManagerApi, deleteOneApplicationApi, getApplicationApi} from "../../api/application";

export const useFetchApplications = () => {
    const [appls, setAppls] = React.useState<any>([])
    const [isLoading, setIsLoading] = React.useState<any>([])
    const [error, setErrorMessage] = useState('')
    const {id, role} = useSelector((state: RootState) => state.user.user)

    const fetchApplications = async (page: number, limit: number, manager: string, patientName: string, patientRequest: string, fundName: string, fundRequest: string) => {
        const resp = await getApplicationApi(page, role === 'doctor' ? id : 'all', limit, manager, patientName, patientRequest, fundName, fundRequest)
        setAppls(resp)
    }

    const fetchApp = async (page: number, limit: number, manager: string, patientName: string, patientRequest: string, fundName: string, fundRequest: string) => {
        setIsLoading(true)
        try {
            await fetchApplications(page, limit, manager, patientName, patientRequest, fundName, fundRequest)
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
            await fetchApplications(1, 10, '','', '', '','')
        } catch (e) {
            setErrorMessage(e?.message)
        } finally {
            setIsLoading(false)
        }

    };

    const updateApplicationManager=async (applId:string,userId:string)=>{
        setIsLoading(true)
        try {
            await changeManagerApi(applId, userId)
            await fetchApplications(1, 10, '','', '', '','')
        } catch (e) {
            setErrorMessage(e?.message)
        } finally {
            setIsLoading(false)
        }
    }

    return {
        appls,
        isLoading,
        error,
        fetchApp,
        id,
        role,
        deleteAppl,
        setAppls,
        updateApplicationManager,
    }

}