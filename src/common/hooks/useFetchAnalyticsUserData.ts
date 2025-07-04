import {useEffect, useState} from "react";
import {UserItemRecapType} from "../types";
import {makeTime} from "../utils";

export const useFetchAnalyticsUserData =(fetchDataCallback:any, period:string, id:string)=>{
    const [filteredData, setFilteredData] = useState<UserItemRecapType>({
        users:[],
        period:[],
        count:0
    });
    const [itemLoading, setItemLoading] = useState<boolean>(false);
    const fromPeriod =filteredData?.period[0] ?  new Date(filteredData?.period[0]).toLocaleDateString() : ''
    const fromPeriodTime = filteredData?.period[0] ?  makeTime(filteredData?.period[0]):''
    const toPeriod = filteredData?.period[1]?  new Date(filteredData?.period[1]).toLocaleDateString():''
    const toPeriodTime =filteredData?.period[1] ?  makeTime(filteredData?.period[1]):''

    let inWork=0;
    let completed = 0
    let completedTotalDuration = 0

    for (const user of filteredData.users) {
        for (const applel of user.applications) {
            if (applel.passToCoordinatorTime) {
                completed+=1
                completedTotalDuration += applel.duration
            } else {
                inWork+=1
            }
        }
    }

    const unfinished = filteredData.users[0] ?  filteredData?.users[0].applications.filter(el => el.passToCoordinatorTime === null):[]
    const finished = filteredData?.users[0] ? filteredData?.users[0].applications.filter(el => el.passToCoordinatorTime !== null):[]

    const fetchData=async (period:string,from:string='',to:string='')=>{
        try {
            setItemLoading(true);
            const resp = await fetchDataCallback(period, id, from, to)
            setFilteredData(resp)
        } catch (e) {

        }
        finally {
            setItemLoading(false);
        }
    }


    useEffect(() => {
        fetchData(period)
    }, []);

    return {
        itemLoading,
        fromPeriod,
        toPeriod,
        toPeriodTime,
        fromPeriodTime,
        unfinished,
        finished,
        filteredData,
        fetchData,
        inWork,
        completed,
        completedTotalDuration,
    }

}