import React, {FC} from "react";
import "./style.smetatable.scss"
import {TextField} from "@mui/material";
import {CommonButton as Button} from '../../../common/components/button'
import {DatePicker, LocalizationProvider} from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import ruLocale from "date-fns/locale/ru";
import {formatPhone, handleKeyDown} from "../../../common/utils";


const SmetaTable: FC<{
    data: any,
    headers: Array<{ hdr: string, field: string, isDate?: boolean }>,
    addDataToTable: () => void,
    localObj: any,
    removeDataToTable: (id: number) => void,
    error: boolean,
    setLocalObj: any,
    setError: any,
    handleChangeCosts: (id: number, keyVal: string, val: string) => void
}> = (
    {
        data = [],
        headers,
        addDataToTable: addTableItem,
        localObj,
        removeDataToTable: delTableItem,
        error,
        setLocalObj,
        setError,
        handleChangeCosts,
    }) => {

    const addDataToTable = () => {
        addTableItem()
    }

    const removeDataToTable = (id: number) => {
        delTableItem(id)
    }

    const handleChangeRoadCosts = (id: number, keyVal: string, val: string) => {
        handleChangeCosts(id, keyVal, val)
    }




    return <div className='smeta-table'>
        <div className={'diagnosis-table'}>
            <div className={'table-section'}>
                <table>
                    <thead>
                    <tr>
                        {headers.map(el => <td>
                            {el.hdr}
                        </td>)}
                        <td>

                        </td>
                    </tr>
                    </thead>
                    <tbody>
                    {data.length > 0 && data.map((el: any, index: number) => (<tr>
                        {headers.map(hdrEl => <td key={hdrEl.hdr}>
                            {!hdrEl.isDate ? <TextField size={'small'}
                                                        value={el[hdrEl.field]}
                                                        onChange={(e) => {
                                                            handleChangeRoadCosts(index, hdrEl.field, e.target.value)
                                                        }}
                                                        error={error}
                                                        fullWidth
                                                        multiline
                                                        maxRows={5}
                                                        placeholder={hdrEl.field === 'phone' ? 'dfdgd' : ''}
                                                        sx={{
                                                            "& fieldset": {border: 'none'},
                                                        }}
                                                        onKeyDown={(e) => {
                                                            if ((e.key === "Backspace" || e.key === "Delete") && hdrEl.field === "phone") {
                                                                const formattedPhone = handleKeyDown(el[hdrEl.field])
                                                                handleChangeRoadCosts(index, hdrEl.field, formattedPhone || '')
                                                            }
                                                        }}

                            /> : <td>
                                <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
                                    <div>
                                        <DatePicker
                                            mask='__.__.____'
                                            value={el[hdrEl.field]}
                                            toolbarPlaceholder='19.06.87'
                                            onChange={(e) => {
                                                handleChangeRoadCosts(index, hdrEl.field, e)
                                            }}
                                            renderInput={(params: any) =>
                                                <TextField
                                                    {...params}
                                                    size='small'
                                                    error={error}
                                                    placeholder={el.hdr}
                                                    fullWidth
                                                    sx={{
                                                        "& fieldset": {border: 'none', padding: '0px'},
                                                    }}
                                                />}
                                            inputFormat="dd.MM.yyyy"
                                        />
                                    </div>
                                </LocalizationProvider></td>}
                        </td>)}
                        <td>
                            <Button onClick={() => removeDataToTable(index)} title={'-'} color={'error'}/>
                        </td>
                    </tr>))}
                    <tr>
                        {headers.map(el => {
                            return el.isDate ? <td key={el.field}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
                                        <div>
                                            <DatePicker
                                                mask='__.__.____'
                                                value={localObj[el.field as any] || ''}
                                                toolbarPlaceholder='19.06.87'
                                                onChange={(e) => {
                                                    if (error) {
                                                        setError(false)
                                                    }
                                                    setLocalObj((state: any) => ({
                                                        ...state,
                                                        [el.field as any]: e
                                                    }))
                                                }}
                                                renderInput={(params: any) =>
                                                    <TextField
                                                        {...params}
                                                        size='small'
                                                        error={error}
                                                        placeholder={'20.20.2024'}
                                                        fullWidth
                                                    />}
                                                inputFormat="dd.MM.yyyy"
                                            />
                                        </div>
                                    </LocalizationProvider></td>
                                : <td key={el.field}>
                                    <TextField size={'small'}
                                               required
                                               value={localObj[el.field as any] || ''}
                                               onChange={(e) => {
                                                   if (error) {
                                                       setError(false)
                                                   } else if (['totalPrice', 'totalCost'].includes(el.field as any)) {
                                                       return
                                                   }
                                                   setLocalObj((state: any) => ({
                                                       ...state,
                                                       [el.field as any]: el.field === 'phone' ? formatPhone(e.target.value)  :  e.target.value
                                                   }))
                                               }}
                                               error={error}
                                               placeholder={el.hdr}
                                               fullWidth
                                               multiline
                                               maxRows={5}
                                               onKeyDown={(e) => {
                                                   if ((e.key === "Backspace" || e.key === "Delete") && el.field === "phone") {
                                                       const formattedPhone = handleKeyDown(localObj[el.field as any] || '')
                                                       setLocalObj((state: any) => ({
                                                           ...state,
                                                           [el.field as any]: formattedPhone,
                                                       }))
                                                   }
                                               }}
                                    />
                                </td>
                        })}
                        <td className={'add-add-btn'}>
                            <Button onClick={addDataToTable} title={'+'}/>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div>
                <table>
                </table>
            </div>
        </div>
    </div>
}
export default SmetaTable