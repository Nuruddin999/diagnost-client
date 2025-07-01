import React, {FC, useEffect, useState} from "react";
import Box from "@mui/material/Box";
import {useLocation, useParams} from "react-router-dom";
import {useQuery} from "../../common/hooks/useQuery";
import {getUserItemRecapApi} from "../../api/analytics";
import {UserItemRecapType} from "../../common/types";
import {
    Button,
    Card,
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Typography
} from "@mui/material";
import {makeDuration, makeTime} from "../../common/utils";
import {DatePicker, LocalizationProvider, TimePicker} from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import ruLocale from "date-fns/locale/ru";

const tableHeaders = ['В работе', 'Завершенные', 'Период']

const AnalyticsItem: FC = () => {
    const {id} = useParams<{ id: string }>(); // из :id
    const query = new URLSearchParams(useLocation().search);
    const period = query.get('period');
    const {loading, data} = useQuery<UserItemRecapType>(() => getUserItemRecapApi(period || '', id,))
    const [filteredData, setFilteredData] = useState<UserItemRecapType | null>();
    const [itemLoading, setItemLoading] = useState<boolean>(false);
    const fromPeriod = new Date(filteredData?.period[0] || '').toLocaleDateString()
    const fromPeriodTime = makeTime(filteredData?.period[0])
    const toPeriod = new Date(filteredData?.period[1] || '').toLocaleDateString()
    const toPeriodTime = makeTime(filteredData?.period[1])
    const [filerDate, setFilerDate] = useState<{ fromDate: string, fromTime: string, toDate: string, toTime: string }>({
        fromDate: '',
        fromTime: '',
        toDate: '',
        toTime: '',
    });


    const unfinished = filteredData?.user.applications.filter(el => el.passToCoordinatorTime === null)
    const finished = filteredData?.user.applications.filter(el => el.passToCoordinatorTime !== null)

    const fetchData=async (period:string,from:string='',to:string='')=>{
        try {
            const resp = await getUserItemRecapApi(period, id, from, to)
            setFilteredData(resp)
        } catch (e) {

        }
    }

    const handleFilter = async () => {
        const h = new Date(filerDate.fromTime).getHours()
        const m = new Date(filerDate.fromTime).getMinutes()
        const th = new Date(filerDate.toTime).getHours()
        const tm = new Date(filerDate.toTime).getMinutes()

        const fromData = new Date(filerDate.fromDate)
        fromData.setHours(h)
        fromData.setMinutes(m)
        fromData.setSeconds(0)
        fromData.setMilliseconds(0)
        const toData = new Date(filerDate.toDate)
        toData.setHours(th)
        toData.setMinutes(tm)
        toData.setSeconds(0)
        toData.setMilliseconds(0)
        await fetchData('',fromData.toISOString(), toData.toISOString())
    }


    useEffect(() => {
         fetchData(period || '')
    }, []);

    useEffect(() => {
        if (filteredData?.period) {
            setFilerDate({...filerDate,
                fromDate: new Date(filteredData.period[0]).toString(),
                fromTime: new Date(filteredData.period[0]).toString(),
                toDate: new Date(filteredData.period[1]).toString(),
                toTime: new Date(filteredData.period[1]).toString(),

            }
            )
        }

    }, [filteredData?.period]);

    if (loading || itemLoading) {
        return <CircularProgress/>
    }
    return <Box sx={{
        marginTop: '40px',
        width: '100%',
        height: 'calc(100% - 40px)',
        backgroundColor: "rgba(211, 211, 211, 0.6)",
        overflow: 'hidden'
    }}
                display="flex"
    justifyContent={"space-around"}>

        <Box sx={{
            width: "85%"
        }}>
            <Typography variant={'h6'} fontWeight={'bold'} color={"primary"} sx={{opacity: '1', marginTop: "8px"}}>Заключения
                общий отчет</Typography>
            <Card sx={{width: '800px', margin: "8px auto 0", borderRadius: "16px"}}>
                <Table size={"small"}>
                    <TableHead>
                        <TableRow>
                            {tableHeaders.map(header => <TableCell><Typography fontWeight={'bold'}>{header}</Typography></TableCell>)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <Typography>
                                    {filteredData?.count}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography>
                                    {filteredData?.user.applications.filter(el => el.passToCoordinatorTime).length || 0}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography>
                                    {`C ${fromPeriod} ${fromPeriodTime} по ${toPeriod} ${toPeriodTime}`}
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Card>
            <Typography variant={'h6'} fontWeight={'bold'} color={"primary"} marginTop={2} sx={{opacity: 1}}>Заключения
                - отчет детальный</Typography>
            <Card variant={"elevation"} sx={{width: 'calc(100% - 0px)', margin: "16px auto 0", borderRadius: "16px", maxHeight: "65vh",overflowY:"scroll"}}>
                <Table stickyHeader size={'small'}>
                    <TableHead>
                        <TableRow>
                            <TableCell><Typography fontWeight={'bold'}>В работе</Typography></TableCell>
                            <TableCell><Typography fontWeight={'bold'}>Время выполнения заявки</Typography></TableCell>
                            <TableCell><Typography fontWeight={'bold'}>Завершенные</Typography></TableCell>
                            <TableCell><Typography fontWeight={'bold'}>Период</Typography></TableCell>
                            <TableCell><Typography fontWeight={'bold'}>Время выполнения заявки</Typography></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredData?.user.applications.map((el, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <Typography>
                                        {unfinished && unfinished[index] ? unfinished[index].name : ""}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography>
                                        {unfinished && unfinished[index] ? makeDuration(unfinished[index].duration) : ""}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography>
                                        {finished && finished[index] ? finished[index].name : ""}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography>
                                        {`C ${fromPeriod} ${fromPeriodTime} по ${toPeriod} ${toPeriodTime}`}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography>
                                        {finished && finished[index] ? makeDuration(finished[index].duration) : ""}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </Box>
        <Box marginY={2} display='flex' alignItems='center' gap={2} flexDirection={'column'}>
            <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
                <div>
                    <DatePicker
                        value={filerDate.fromDate}
                        mask='__.__.____'
                        toolbarPlaceholder='01.01.2025'
                        label='Начало дата'
                        onChange={(e) => setFilerDate({...filerDate, fromDate: e || ''})}
                        renderInput={(params: any) => <TextField {...params} size='small'/>}
                        inputFormat="dd-MM-yyyy"
                    />
                </div>
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
                <div>
                    <TimePicker
                        value={filerDate.fromTime}
                        onChange={(e) => setFilerDate({...filerDate, fromTime: e || ''})}
                        label='Начало время'
                        renderInput={(params: any) => <TextField {...params} size='small'/>}
                    />
                </div>
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
                <div>
                    <DatePicker
                        value={filerDate.toDate}
                        mask='__.__.____'
                        toolbarPlaceholder='01.01.2025'
                        onChange={(e) => setFilerDate({...filerDate, toDate: e || ''})}
                        label='Начало время'
                        renderInput={(params: any) => <TextField {...params} size='small'/>}
                        inputFormat="dd-MM-yyyy"
                    />
                </div>
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
                <div>
                    <TimePicker
                        value={filerDate.toTime}
                        onChange={(e) => setFilerDate({...filerDate, toTime: e || ''})}
                        label='Начало время'
                        renderInput={(params: any) => <TextField {...params} size='small'/>}
                    />
                </div>
            </LocalizationProvider>
            <Button onClick={handleFilter}>Применить</Button>
            <Button onClick={()=>fetchData(period || '')}>Сбросить</Button>
        </Box>
    </Box>
}

export default AnalyticsItem;