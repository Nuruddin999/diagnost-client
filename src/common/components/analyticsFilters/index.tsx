import React, {FC, useEffect, useState} from "react";
import Box from "@mui/material/Box";
import {DatePicker, LocalizationProvider, TimePicker} from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import ruLocale from "date-fns/locale/ru";
import {Button, TextField} from "@mui/material";

const AnalyticsFilters: FC<{
    direction: "column" | "row",
    fetchData: (period: string, from: string, to: string) => Promise<void>,
    period: string | null,
    initValues: { fromDate: string, fromTime: string, toDate: string, toTime: string }
}> = ({direction = 'column', fetchData, period, initValues}) => {

    const [filterDate, setFilterDate] = useState<{
        fromDate: string,
        fromTime: string,
        toDate: string,
        toTime: string
    }>({
        fromDate: '',
        fromTime: '',
        toDate: '',
        toTime: '',
    });

    const handleFilter = async () => {
        const h = new Date(filterDate.fromTime).getHours()
        const m = new Date(filterDate.fromTime).getMinutes()
        const th = new Date(filterDate.toTime).getHours()
        const tm = new Date(filterDate.toTime).getMinutes()

        const fromData = new Date(filterDate.fromDate)
        fromData.setHours(h)
        fromData.setMinutes(m)
        fromData.setSeconds(0)
        fromData.setMilliseconds(0)
        const toData = new Date(filterDate.toDate)
        toData.setHours(th)
        toData.setMinutes(tm)
        toData.setSeconds(0)
        toData.setMilliseconds(0)
        await fetchData('', fromData.toISOString() || '', toData.toISOString() || '')
    }


    useEffect(() => {
        if (initValues?.fromDate) {
            setFilterDate({
                    ...filterDate,
                    fromDate: initValues.fromDate,
                    fromTime: initValues.fromTime,
                    toDate: initValues.toDate,
                    toTime: initValues.toTime,

                }
            )
        }

    }, [initValues]);


    return initValues?.fromDate ? <Box marginY={2} display='flex' alignItems='center' gap={2} flexDirection={direction}>
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
            <div>
                <DatePicker
                    value={filterDate.fromDate}
                    mask='__.__.____'
                    toolbarPlaceholder='01.01.2025'
                    label='Начало дата'
                    onChange={(e) => setFilterDate({...filterDate, fromDate: e || ''})}
                    renderInput={(params: any) => <TextField {...params} size='small'/>}
                    inputFormat="dd-MM-yyyy"
                />
            </div>
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
            <div>
                <TimePicker
                    value={filterDate.fromTime}
                    onChange={(e) => setFilterDate({...filterDate, fromTime: e || ''})}
                    label='Начало время'
                    renderInput={(params: any) => <TextField {...params} size='small'/>}
                />
            </div>
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
            <div>
                <DatePicker
                    value={filterDate.toDate}
                    mask='__.__.____'
                    toolbarPlaceholder='01.01.2025'
                    onChange={(e) => setFilterDate({...filterDate, toDate: e || ''})}
                    label='Начало время'
                    renderInput={(params: any) => <TextField {...params} size='small'/>}
                    inputFormat="dd-MM-yyyy"
                />
            </div>
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
            <div>
                <TimePicker
                    value={filterDate.toTime}
                    onChange={(e) => setFilterDate({...filterDate, toTime: e || ''})}
                    label='Начало время'
                    renderInput={(params: any) => <TextField {...params} size='small'/>}
                />
            </div>
        </LocalizationProvider>
        <Button onClick={handleFilter}>Применить</Button>
        <Button onClick={() => fetchData(period || '', '', '')}>Сбросить</Button>
    </Box>:null
}

export default AnalyticsFilters;