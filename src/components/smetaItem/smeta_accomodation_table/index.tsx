import {FC, useEffect} from "react";
import {Typography} from "@mui/material";
import SmetaTable from "../smeta-table";
import {useSmetaItemTable} from "../../../common/hooks/useSmetaItemTable";
import {calculateAccommodationCost, calculateLocalAccommodationCost} from "../scripts/scripts";


const SmetaAccomodationItem: FC<{ data: any, handleChangeSmeta: (field: string, payload: any) => void, headers: Array<{ hdr: string, field: string, isDate?: boolean }> }> = ({
                                                                                                                                                                                  data,
                                                                                                                                                                                  handleChangeSmeta,
                                                                                                                                                                                  headers,
                                                                                                                                                                              }) => {

    const {
        addDataToTable,
        removeDataToTable,
        localObj,
        error,
        setLocalObj,
        setError
    } = useSmetaItemTable(headers, handleChangeSmeta, data, "Smetaroaccomodations")

    const handleChangeRoadCosts = (id: number, keyVal: string, val: string) => {
        const newList = data.map((dataEl: any, index: number) => {
            if (id === index) {
              return calculateAccommodationCost(dataEl, keyVal, val)
            }
            return dataEl
        })
        handleChangeSmeta('Smetaroaccomodations', newList)
    }

    useEffect(() => {
        const totalCost = calculateLocalAccommodationCost(localObj)
        setLocalObj((state: any) => ({
            ...state,
            totalCost
        }))
    }, [localObj.inData, localObj.outData, localObj.peopleQty, localObj.costPerDay])

    return <div>
        <div className='entity-table'>
            <Typography align='left' variant='h5'>
                Проживание
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

export default SmetaAccomodationItem