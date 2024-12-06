import {FC, useEffect} from "react";
import {Typography} from "@mui/material";
import SmetaTable from "../smeta-table";
import {useSmetaItemTable} from "../../../common/hooks/useSmetaItemTable";
import {calculateLocalRoadCost, calculateMedCost, processListData,} from "../scripts/scripts";

const SmetaMedCostItem: FC<{
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
    } = useSmetaItemTable(headers, handleChangeSmeta, data, "Smetaplans")

    const handleChangeRoadCosts = (id: number, keyVal: string, val: string) => {
        const newList = processListData({id, keyVal, val}, data, calculateMedCost, calculationFields)
        if (newList === false) {
            return;
        }
        handleChangeSmeta('Smetaplans', newList)
    }

    useEffect(() => {
        const totalCost = calculateLocalRoadCost(localObj.qty, localObj.price)
        setLocalObj((state: any) =>
            ({
                ...state,
                totalPrice: totalCost
            })
        )
    }, [localObj.qty, localObj.price])

    return <div>
        <div className='entity-table'>
            <Typography align='left' variant='h5'>
                Мед услуги
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

export default SmetaMedCostItem