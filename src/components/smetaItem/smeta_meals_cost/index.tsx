import {FC, useEffect} from "react";
import {Typography} from "@mui/material";
import SmetaTable from "../smeta-table";
import {useSmetaItemTable} from "../../../common/hooks/useSmetaItemTable";
import {calculateMealCost, calculateMealLocalCost, processListData} from "../scripts/scripts";

const SmetaMealCostItem: FC<{
    data: any,
    handleChangeSmeta: (field: string, payload: any) => void,
    headers: Array<{ hdr: string, field: string, isDate?: boolean }>,
    calculationFields: Array<string>
}> = ({
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
    } = useSmetaItemTable(headers, handleChangeSmeta, data, "Smetamealcosts")

    const handleChangeRoadCosts = (id: number, keyVal: string, val: string) => {
        const newList = processListData({id, keyVal, val}, data, calculateMealCost, calculationFields)
        if (newList === false) { return;}
        handleChangeSmeta('Smetamealcosts', newList)
    }

    useEffect(() => {
        const totalCost = calculateMealLocalCost(localObj)
        setLocalObj((state: any) => ({
            ...state,
            totalCost
        }))
    }, [localObj.daysQty, localObj.costPerDay, localObj.peopleQty])

    return <div>
        <div className='entity-table'>
            <Typography align='left' variant='h5'>
                Питание
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

export default SmetaMealCostItem