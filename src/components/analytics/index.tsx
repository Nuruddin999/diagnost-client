import React, {FC, useEffect, useState} from "react";
import {getUsersRecapApi} from "../../api/analytics";
import Box from "@mui/material/Box";
import {UsersRecapType} from "../../common/types";
import {Button, Typography} from "@mui/material";
import {Link, useHistory} from "react-router-dom";
import {RoundLoader} from "../../common/components/roundloader";

const UsersRecap: FC = () => {

    const [data, setData] = useState<{ users: Array<UsersRecapType>, count: number }>({users: [], count: 0});
    const [loading, setIsLoading] = useState<boolean>(false);
    const [period, setPeriod] = useState<string>('week');
    const history = useHistory();

    const handleGetRecap = async (period: string) => {
        try {
            setIsLoading(true);
            const result = await getUsersRecapApi(period);
            setData({users: result.users, count: result.count});
        } catch (e) {

        } finally {
            setIsLoading(false);
        }
    }

    const goToItem=(id:string)=>{
        history.push(`analytics-item/${id}?period=${period}`);
    }

    useEffect(() => {
        if (period) {
            handleGetRecap(period)
        }
    }, [period]);
    if (loading) {
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
        <Box sx={{background: 'white', width: "20%", borderRadius: "8px", margin: "16px auto 0"}}>
            {[{t: 'Сегодня', f: 'today'}, {t: 'Вчера', f: 'yesterday'}, {t: 'Неделя', f: 'week'}, {
                t: 'Месяц',
                f: 'month'
            }].map(el => <Button sx={{color: el.f === period ? 'primary' : '#353535'}}
                                 onClick={() => setPeriod(el.f)}>{el.t}</Button>)}
        </Box>
        <Box
            marginTop={2}
            marginX={"auto"}
            width={700}
            sx={{backgroundColor: "white", padding: '16px', borderRadius: "8px"}}
        >
            {data.count > 0 && <Box color={"success"} p={2}>
                <Typography variant={'h6'} align={'left'}>Заключения по ответственным</Typography>
                <Typography
                    align={"left"}
                    variant={'h3'}
                    fontWeight={'bold'}
                    sx={{color: '#704cb6'}}
                    component={"p"}
                >{data.count}</Typography>
            </Box>}
            {data.users.length > 0 && data.users.map((user, index) => (
                    <Box
                        display={'flex'}
                        justifyContent={'start'}
                        marginTop={index > 0 ? 2 : 0}
                        sx={{borderBottom: "1px solid darkgray", paddingBottom: '8px', cursor: 'pointer'}}
                        key={user.name}
                        onClick={() => goToItem(user.id.toString())}
                    >
                        <Typography component={'span'}>{user.speciality}</Typography>
                        <Typography component={'span'} marginLeft={2}>{user.name}</Typography>
                        <Typography component={'span'} marginLeft={3} color={'primary'}
                                    fontWeight={'bold'}>{user.applications}</Typography>
                    </Box>
            ))}
        </Box>


    </Box>
}

export default UsersRecap;