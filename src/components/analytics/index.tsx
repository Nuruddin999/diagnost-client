import React, {FC, useEffect, useState} from "react";
import {getUsersRecapApi} from "../../api/analytics";
import Box from "@mui/material/Box";
import {UsersRecapType} from "../../common/types";
import {Button, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {RoundLoader} from "../../common/components/roundloader";

const UsersRecap: FC = () => {

    const [users, setUsers] = useState<Array<UsersRecapType>>([]);
    const [loading, setIsLoading] = useState<boolean>(false);
    const [period, setPeriod] = useState<string>('week');
    const handleGetRecap = async (period: string) => {
        try {
            setIsLoading(true);
            const result = await getUsersRecapApi(period);
            setUsers(result.users);
        } catch (e) {

        } finally {
            setIsLoading(false);
        }
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
        {users.length > 0 &&
            <Box
                marginTop={2}
                marginX={"auto"}
                width={700}
                sx={{backgroundColor: "white", padding: '16px', borderRadius: "8px"}}
            >
                {users.map((user, index) => (
                    <Link to={''} key={user.name}>
                        <Box
                            display={'flex'}
                            justifyContent={'start'}
                            marginTop={index > 0 ? 2 : 0}
                            sx={{borderBottom: "1px solid darkgray", paddingBottom: '8px'}}
                        >
                            <Typography component={'span'}>{user.speciality}</Typography>
                            <Typography component={'span'} marginLeft={2}>{user.name}</Typography>
                            <Typography component={'span'} marginLeft={3} color={'primary'}
                                        fontWeight={'bold'}>{user.applications}</Typography>
                        </Box>
                    </Link>))}
            </Box>
        }

    </Box>
}

export default UsersRecap;