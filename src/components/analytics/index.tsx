import React, {FC, useEffect, useState} from "react";
import {getUserItemRecapApi, getUsersRecapApi} from "../../api/analytics";
import Box from "@mui/material/Box";
import {Button, Typography} from "@mui/material";
import {Link, useHistory} from "react-router-dom";
import {RoundLoader} from "../../common/components/roundloader";
import {useFetchAnalyticsUserData} from "../../common/hooks/useFetchAnalyticsUserData";
import AnalyticsRecapTable from "../../common/components/analytics_recap_table";
import AnalyticsFilters from "../../common/components/analyticsFilters";

const UsersRecap: FC = () => {

    const [period, setPeriod] = useState<string>('week');
    const history = useHistory();

    const {
        finished,
        fromPeriod,
        fromPeriodTime,
        fetchData,
        filteredData,
        unfinished,
        itemLoading,
        toPeriodTime,
        toPeriod,
        inWork,
        completed
    } = useFetchAnalyticsUserData(getUsersRecapApi, period || '', '')


    const goToItem=(id:string)=>{
        history.push(`analytics-item/${id}?period=${period}`);
    }

    useEffect(() => {
        if (period) {
          fetchData(period,'','')
        }
    }, [period]);

    if (itemLoading) {
        return <RoundLoader/>
    }

    return <Box sx={{
        marginTop: '40px',
        width: '100%',
        height: '100%',
        background: 'lightgray',
        opacity: '80%',
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
                    width={700}
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
                    {filteredData?.users.length > 0 && filteredData.users.map((user, index) => (
                        <Box
                            display={'flex'}
                            justifyContent={'start'}
                            marginTop={index > 0 ? 2 : 0}
                            sx={{borderBottom: "1px solid darkgray", paddingBottom: '8px', cursor: 'pointer', maxHeight: "75vh",
                                overflowY: "scroll"}}
                            key={user.name}
                            onClick={() => goToItem(user.id.toString())}
                        >
                            <Typography component={'span'}>{user.speciality}</Typography>
                            <Typography component={'span'} marginLeft={2}>{user.name}</Typography>
                            <Typography component={'span'} marginLeft={3} color={'primary'}
                                        fontWeight={'bold'}>{user.applications.length}</Typography>
                        </Box>
                    ))}
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