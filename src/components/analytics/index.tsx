import React, {FC, useEffect, useState} from "react";
import {getUsersRecapApi} from "../../api/analytics";
import Box from "@mui/material/Box";
import {Button, Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@mui/material";
import {useHistory} from "react-router-dom";
import {RoundLoader} from "../../common/components/roundloader";
import {useFetchAnalyticsUserData} from "../../common/hooks/useFetchAnalyticsUserData";
import AnalyticsRecapTable from "../../common/components/analytics_recap_table";
import AnalyticsFilters from "../../common/components/analyticsFilters";
import styles from './analytics.module.scss'

const UsersRecap: FC = () => {

    const [period, setPeriod] = useState<string>('week');
    const history = useHistory();

    const {,
        fromPeriod,
        fromPeriodTime,
        fetchData,
        filteredData,,
        itemLoading,
        toPeriodTime,
        toPeriod,
        inWork,
        completed
    } = useFetchAnalyticsUserData(getUsersRecapApi, period || '', '')


    const goToItem = (id: string) => {
        history.push(`analytics-item/${id}?period=${period}`);
    }

    useEffect(() => {
        if (period) {
            fetchData(period, '', '')
        }
    }, [period]);

    if (itemLoading) {
        return <RoundLoader/>
    }

    return <Box sx={{
        width: '100%',
        overflow: 'hidden'
    }}>
        <Box display="flex" justifyContent="space-between" alignItems="start">
            <Box sx={{flex: `1 1 80%`}}>
                <Box sx={{background: 'white', width: "332px", borderRadius: "8px", margin: "16px auto 0"}}>
                    {[{t: 'Сегодня', f: 'today'}, {t: 'Вчера', f: 'yesterday'}, {t: 'Неделя', f: 'week'}, {
                        t: 'Месяц',
                        f: 'month'
                    }].map(el => <Button sx={{color: el.f === period ? 'primary' : '#353535'}}
                                         onClick={() => setPeriod(el.f)}>{el.t}</Button>)}
                </Box>
                <Box>
                    <AnalyticsRecapTable
                        inWork={inWork}
                        completed={completed}
                        periodTtitle={`C ${fromPeriod} ${fromPeriodTime} по ${toPeriod} ${toPeriodTime}`}/>
                </Box>
                <Box
                    marginTop={2}
                    marginX={"auto"}
                    width={1000}
                    sx={{backgroundColor: "white", padding: '16px', borderRadius: "8px"}}
                >
                    {filteredData.count > 0 && <Box color={"success"} p={2}>
                        <Typography variant={'h6'} align={'left'}>Заключения по ответственным</Typography>
                        <Typography
                            align={"left"}
                            variant={'h3'}
                            fontWeight={'bold'}
                            sx={{color: '#704cb6'}}
                            component={"p"}
                        >{filteredData?.count}</Typography>
                    </Box>}
                    <Table size={"small"}>
                        <TableHead>
                            <TableRow>
                                {['ФИО', 'Должность','Всего заявок', 'В работе', 'Завершенные'].map((el, index) =>
                                    <TableCell width={index > 0 ? '16%' : '50'}><Typography
                                        fontWeight={'bold'} align={index === 0 ? 'left':'center'}>{el}</Typography></TableCell>)}
                            </TableRow>
                        </TableHead>
                    </Table>
                    <Box sx={{maxHeight:'60vh',overflowY:'scroll'}}>
                        {filteredData?.users.length > 0 && filteredData.users.map((user) => (
                            <Box key={user.id} onClick={() => goToItem(user.id.toString())} className={styles.item}>
                                <Table size={"small"}>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell width={'36%'}><Typography align={'left'}>{user.name}</Typography></TableCell>
                                            <TableCell width={'16%'}><Typography align={'left'}>{user.speciality}</Typography></TableCell>
                                            <TableCell sx={{width: '16%'}}><Typography
                                                align={'center'}>{user.applications.length}</Typography></TableCell>
                                            <TableCell sx={{width: '16%'}}> <Typography
                                                align={'center'}>{user.applications.filter(el => !el.passToCoordinatorTime).length}</Typography></TableCell>
                                            <TableCell sx={{width: '16%'}}>
                                                <Typography
                                                    align={'center'}>{user.applications.filter(el => el.passToCoordinatorTime).length}</Typography>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>
            <Box sx={{flex: `1 1 20%`}}>
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
            </Box>
        </Box>
    </Box>
}

export default UsersRecap;