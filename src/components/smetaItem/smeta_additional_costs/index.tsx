import {FC} from "react";
import {Typography} from "@mui/material";
import SmetaTable from "../smeta-table";
import {useSmetaItemTable} from "../../../common/hooks/useSmetaItemTable";


const SmetaAdditionalCosts: FC<{ data: any, handleChangeSmeta: (field: string, payload: any) => void, headers: Array<{ hdr: string, field: string, isDate?: boolean }> }> = ({
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
    } = useSmetaItemTable(headers, handleChangeSmeta, data, "Smetacosts")

    const handleChangeRoadCosts = (id: number, keyVal: string, val: string) => {
        const newList = data.map((dataEl: any, index: number) => {
            if (id === index) {
                return {
                    ...dataEl,
                    [keyVal]: val
                }
            }
            return dataEl
        })
        handleChangeSmeta('Smetacosts', newList)
    }

    return <div>
        <div className='entity-table'>
            <Typography align='left' variant='h5'>
                Дополнительные расходы
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

export default SmetaAdditionalCosts