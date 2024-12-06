import {FC, useEffect} from "react";
import {Typography} from "@mui/material";
import SmetaTable from "../smeta-table";
import {useSmetaItemTable} from "../../../common/hooks/useSmetaItemTable";
import {calculateLocalRoadCost, calculateRoadCost, processListData} from "../scripts/scripts";

const SmetaRoadCostItem: FC<{ data: any, handleChangeSmeta: (field: string, payload: any) => void, headers: Array<{ hdr: string, field: string, isDate?: boolean }>,calculationFields:Array<string> }> = ({
                                                                                                                                                                              data,
                                                                                                                                                                              handleChangeSmeta,
                                                                                                                                                                              headers,
                                                                                                                                                                                                          calculationFields,
                                                                                                                                                                          }) => {

    const {
        addDataToTable,
        removeDataToTable,
        localObj,
        error,
        setLocalObj,
        setError
    } = useSmetaItemTable(headers, handleChangeSmeta, data, "Smetaroadcosts")

    const handleChangeRoadCosts = (id: number, keyVal: string, val: string) => {
        const newList = processListData({id,keyVal,val},data, calculateRoadCost,calculationFields)
        if (newList === false) { return;}
        handleChangeSmeta('Smetaroadcosts', newList)
    }

    useEffect(() => {
        const totalCost = calculateLocalRoadCost(localObj.ticketQty,localObj.cost)
        setLocalObj((state: any) => ({
            ...state,
            totalCost
        }))
    }, [localObj.ticketQty, localObj.cost])

    return <div>
        <div className='entity-table'>
            <Typography align='left' variant='h5'>
                Дорожные расходы
            </Typography>
            <SmetaTable
                handleChangeCosts={handleChangeRoadCosts}
                setError={setError}
                setLocalObj={setLocalObj}
                error={error}
                removeDataToTable={removeDataToTable}
                localObj={localObj}
                addDataToTable={addDataToTable}
                data={data}
                headers={headers}
            />
        </div>
    </div>
}

export default SmetaRoadCostItem