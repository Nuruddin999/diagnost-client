import React, {FC} from "react";
import Box from "@mui/material/Box";
import {useLocation, useParams} from "react-router-dom";
import {getUserItemRecapApi} from "../../api/analytics";
import {Card, CircularProgress, Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@mui/material";
import {makeDuration} from "../../common/utils";
import {useFetchAnalyticsUserData} from "../../common/hooks/useFetchAnalyticsUserData";
import AnalyticsFilters from "../../common/components/analyticsFilters";
import AnalyticsRecapTable from "../../common/components/analytics_recap_table";

const AnalyticsItem: FC = () => {
    const {id} = useParams<{ id: string }>(); // из :id
    const query = new URLSearchParams(useLocation().search);
    const period = query.get('period');
    const {
        finished,
        fromPeriod,
        fromPeriodTime,
        fetchData,
        filteredData,
        unfinished,
        itemLoading,
        toPeriodTime,
        toPeriod
    } = useFetchAnalyticsUserData(getUserItemRecapApi, period || '', id)

    if (itemLoading || filteredData === null) {
        return <CircularProgress/>
    }
    return filteredData.users.length > 0 ? <Box sx={{
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
            <AnalyticsRecapTable
                inWork={filteredData?.users[0].applications.filter(el => !el.passToCoordinatorTime).length || 0}
                completed={filteredData?.users[0].applications.filter(el => el.passToCoordinatorTime).length || 0}
                periodTtitle={`C ${fromPeriod} ${fromPeriodTime} по ${toPeriod} ${toPeriodTime}`}/>
            <Typography variant={'h6'} fontWeight={'bold'} color={"primary"} marginTop={2} sx={{opacity: 1}}>Заключения
                - отчет детальный</Typography>
            <Card variant={"elevation"} sx={{
                width: 'calc(100% - 0px)',
                margin: "16px auto 0",
                borderRadius: "16px",
                maxHeight: "75vh",
                overflowY: "scroll"
            }}>
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
                        {filteredData?.users[0].applications.map((el, index) => (
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
        <AnalyticsFilters
            direction={'column'}
            fetchData={fetchData}
            period={period}
            initValues={{
                fromDate: filteredData?.period ? new Date(filteredData.period[0]).toString() : '',
                fromTime: filteredData?.period ? new Date(filteredData.period[0]).toString() : '',
                toDate: filteredData?.period ? new Date(filteredData.period[1]).toString() : '',
                toTime: filteredData?.period ? new Date(filteredData.period[1]).toString() : '',
            }}
        />
    </Box> : <Typography sx={{marginTop: "60px"}} variant={"h3"}>Нет данных</Typography>
}

export default AnalyticsItem;