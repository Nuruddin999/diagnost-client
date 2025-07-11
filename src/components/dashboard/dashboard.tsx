import React, {Fragment, useEffect} from "react";
import {Link, Redirect, Route, Switch, useHistory, useLocation} from "react-router-dom";
import ReportList from "../reportlist/reportlist";
import {Backdrop, Button, CircularProgress, IconButton, ListItemIcon, ListItemText, Typography} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import './style.dash.scss'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {checkUser, logOutUser} from "../../actions/user";
import SummarizeIcon from '@mui/icons-material/Summarize';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import CalculateIcon from '@mui/icons-material/Calculate';
import GradingIcon from '@mui/icons-material/Grading';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import KeyboardArrowDownSharpIcon from '@mui/icons-material/KeyboardArrowDownSharp';
import ApplicationItem from "../applicationItem";
import {Registration} from "../../common/components/registration/registration";
import UsersList from "../userslist/userslist";
import {selectApplicationUserRights} from "../../common/selectors/user";
import {RoundLoader} from "../../common/components/roundloader";
import Specialities from "../specialities/Specialities";
import Smetalist from "../smetalist/smetalist";
import SmetaItem from "../smetaItem";
import HopedocLogo from "../../hopedoc.png"
import BasicModal from "../../common/components/modal/ConsiliumModal";
import {saveEndTime, saveStartTime} from "../../api/user";
import UserItemScreen from "../useritem/userItemScreen";
import {Analytics} from "@mui/icons-material";
import UsersRecap from "../analytics";
import AnalyticsItem from "../analyticsItem";
import Box from "@mui/material/Box";
import FundWorkerList from "../fundWorkerList";
import FundTasks from "../FundTasks";
import {sessionHeartBit} from "../../common/api/api";


const Dashboard = (): React.ReactElement => {
    const {user, hasSuperUser} = useSelector((state: RootState) => state.user)
    const {name, id} = user

    const rights = useSelector((state: RootState) => selectApplicationUserRights(state))
    const isAdmin = user.role === 'admin' || user.role === 'superadmin'
    const isCircular = useSelector((state: RootState) => state.ui.isCircular)
    const [isWarning, setIsWarning] = React.useState('');
    const [sessionId, setSessionId] = React.useState('');
    const [openDropDown, setOpenDropDown] = React.useState<{ users: boolean }>({users: false});
    const timeStartRef = React.useRef<number | null>(null);
    const passToCoordRef = React.useRef<string | null>(null);
    const applIdRef = React.useRef<number | null>(0);
    const heartBitTimerRef = React.useRef<any | null>(null);
    const dispatch = useDispatch()

    const logOut = async () => {
        dispatch(logOutUser())
    }

    const location = useLocation()
    const history = useHistory()

    useEffect(() => {
        dispatch(checkUser())
    }, [])

    const handleStartTime = async () => {
        const result = await saveStartTime()
        setSessionId(result.id)
    }

    useEffect(() => {
        let socket: WebSocket;
        if (id.trim() && id !== '0' && id !== 'undefined') {

            handleStartTime()
            socket = new WebSocket('ws://188.68.220.210:5000');

            socket.onopen = () => {
                socket.send(JSON.stringify({type: 'online', id}));
            };

        }


        return () => {
            if (socket) {
                socket.close();
            }
        };
    }, [id]);


    useEffect(() => {
        if (sessionId) {
            heartBitTimerRef.current = setInterval(() => {
                sessionHeartBit(`/usdurhrtbt`,sessionId, 30000)
            }, 30000)
        }
        return () => {
            if (heartBitTimerRef.current) {
                clearInterval(heartBitTimerRef.current)
                heartBitTimerRef.current = null;
            }
        };
    }, [sessionId]);

    const goToTab = (e: any, url: string) => {
        const pattern = /^\/main\/application\/\d+$/
        const smetaPattern = /^\/main\/smeta\/\d+$/
        e.preventDefault()
        if (pattern.test(location.pathname) || smetaPattern.test(location.pathname)) {
            setIsWarning(url);
        } else {
            history.push(url);
        }
    }


    return !hasSuperUser ? <Registration notHaveSuperUser/> : <div className="dashboard">

        {name === '' ? <RoundLoader/> : <div className="dashboard" data-testid='dashboard'>

            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={isCircular}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>
            <div className="dasheader">
                <img src={HopedocLogo} height={40} alt="Hopedoc"/>
                <div className='user-block'>
                    <Link to='/main/aboutme'>
                        <Typography variant="body1">
                            {name}
                        </Typography>
                    </Link>
                    <IconButton onClick={logOut}>
                        <LogoutIcon/>
                    </IconButton>
                </div>
            </div>
            <div className="main-wrapper">
                <div className="sidebar">
                    {rights.isApplicationOneRight && <div className='list-item'>
                        <Link to='' onClick={(e) => goToTab(e, '/main/table')}>
                            <ListItemIcon>
                                <SummarizeIcon/>
                            </ListItemIcon>
                        </Link>
                        <Link to='' onClick={(e) => goToTab(e, '/main/table')}>
                            <ListItemText>
                                Заключения
                            </ListItemText>
                        </Link>
                    </div>}
                    {rights.isUsersOneRight && <div className='list-item' onClick={(e) => setOpenDropDown({
                        ...openDropDown,
                        users: !openDropDown.users
                    })}>
                        <Box>
                            <ListItemIcon>
                                <PeopleAltIcon/>
                            </ListItemIcon>
                        </Box>
                        <Box>
                            <Box display="flex" justifyContent="space-between">
                                <Typography>Пользователи</Typography>
                                <KeyboardArrowDownSharpIcon/>
                            </Box>
                        </Box>
                    </div>}
                    {openDropDown.users &&
                        <Box display="flex" flexDirection="column" sx={{width: '95%', marginTop: "8px"}} gap={1}>
                            <Link to='' onClick={(e) => goToTab(e, '/main/users')} className={'drop-item'}>
                                <Box marginLeft={'auto'}>
                                    <Typography align={'right'}>Врачи Надежды</Typography>
                                </Box>
                            </Link>
                            <Link to='' onClick={(e) => goToTab(e, '/main/fundworkers')} className={'drop-item'}>
                                <Box marginLeft={'auto'}>
                                    <Typography align={'right'}>Благотворительные фонды</Typography>
                                </Box>
                            </Link>
                        </Box>}
                    <div className='list-item'>
                        <Link to='' onClick={(e) => goToTab(e, '/main/speciality')}>
                            <ListItemIcon>
                                <BusinessCenterIcon/>
                            </ListItemIcon>
                        </Link>
                        <Link to='' onClick={(e) => goToTab(e, '/main/speciality')}>
                            <ListItemText>
                                Специальности
                            </ListItemText>
                        </Link>
                    </div>
                    {rights.processedRights.smetas?.read && <div className='list-item'>
                        <Link to='' onClick={(e) => goToTab(e, '/main/smetas')}>
                            <ListItemIcon>
                                <CalculateIcon/>
                            </ListItemIcon>
                        </Link>
                        <Link to='' onClick={(e) => goToTab(e, '/main/smetas')}>
                            <ListItemText>
                                Сметы
                            </ListItemText>
                        </Link>
                    </div>}
                    {isAdmin && <div className='list-item'>
                        <Link to='' onClick={(e) => goToTab(e, '/main/smetasoncheck')}>
                            <ListItemIcon>
                                <GradingIcon/>
                            </ListItemIcon>
                        </Link>
                        <Link to='' onClick={(e) => goToTab(e, '/main/smetasoncheck')}>
                            <ListItemText>
                                Сметы на
                            </ListItemText>
                            <ListItemText>
                                проверку
                            </ListItemText>
                        </Link>
                    </div>}
                    {isAdmin &&
                        <Fragment>
                            <div className='list-item'>
                                <Link to='' onClick={(e) => goToTab(e, '/main/smetasonrealization')}>
                                    <ListItemIcon>
                                        <CheckCircleOutlineIcon/>
                                    </ListItemIcon>
                                </Link>
                                <Link to='' onClick={(e) => goToTab(e, '/main/smetasonrealization')}>
                                    <ListItemText>
                                        Сметы на
                                    </ListItemText>
                                    <ListItemText>
                                        реализации
                                    </ListItemText>
                                </Link>
                            </div>
                            <div className='list-item'>
                                <Link to='' onClick={(e) => goToTab(e, '/main/analytics')}>
                                    <ListItemIcon>
                                        <Analytics/>
                                    </ListItemIcon>
                                </Link>
                                <Link to='' onClick={(e) => goToTab(e, '/main/analytics')}>
                                    <ListItemText>
                                        Аналитика
                                    </ListItemText>
                                </Link>
                            </div>
                            <div className='list-item'>
                                <Link to='' onClick={(e) => goToTab(e, '/main/fundTasks')}>
                                    <ListItemIcon>
                                        <Analytics/>
                                    </ListItemIcon>
                                </Link>
                                <Link to='' onClick={(e) => goToTab(e, '/main/fundTasks')}>
                                    <ListItemText>
                                        Куратор
                                    </ListItemText>
                                </Link>
                            </div>
                        </Fragment>}

                </div>
                <div className="main-content">
                    <Switch>
                        {rights.processedRights.applications?.read && <Route exact path='/main/table'>
                            <ReportList/>
                        </Route>}
                        <Route path='/main/application/:id'>
                            {rights.processedRights.applications?.read ?
                                <ApplicationItem
                                    passToCoordRef={passToCoordRef}
                                    timeStartRef={timeStartRef}
                                    applIdRef={applIdRef}
                                /> :
                                <div className="no-rights"><Typography align='center'>Недостаточно прав</Typography>
                                </div>}
                        </Route>
                        <Route path='/main/user/:id'>
                            {rights.processedRights.users?.read ? <UserItemScreen onClose={() => {
                                }}/> :
                                <Typography className="no-rights" align='center'>Недостаточно прав</Typography>}
                        </Route>
                        <Route path='/main/newuser'>
                            {rights.processedRights.users?.create ? <Registration/> :
                                <Typography className="no-rights" align='center'>Недостаточно прав</Typography>}
                        </Route>
                        <Route path='/main/users'>
                            {rights.processedRights.users?.read ? <UsersList/> :
                                <Typography className="no-rights" align='center'>Недостаточно прав</Typography>}
                        </Route>
                        <Route path='/main/fundworkers'>
                            {rights.processedRights.users?.read ? <FundWorkerList/> :
                                <Typography className="no-rights" align='center'>Недостаточно прав</Typography>}
                        </Route>
                        <Route path='/main/speciality'>
                            {rights.processedRights.applications?.read ? <Specialities/> :
                                <Typography className="no-rights" align='center'>Недостаточно прав</Typography>}
                        </Route>
                        <Route path='/main/aboutme'>
                            <UserItemScreen onClose={() => {
                            }} isProfile/>
                        </Route>
                        <Route path='/main/smetas'>
                            {rights.processedRights.smetas?.read ? <Smetalist status={'rework'}/> :
                                <div className="no-rights"><Typography align='center'>Недостаточно прав</Typography>
                                </div>}
                        </Route>
                        <Route path='/main/smeta/:id'>
                            {rights.processedRights.smetas?.read ? <SmetaItem/> :
                                <div className="no-rights"><Typography align='center'>Недостаточно прав</Typography>
                                </div>}
                        </Route>
                        <Route path='/main/smetasoncheck'>
                            {isAdmin ? <Smetalist status={'oncheck'}/> :
                                <div className="no-rights"><Typography align='center'>Недостаточно прав</Typography>
                                </div>}
                        </Route>
                        <Route path='/main/smetasonrealization'>
                            {isAdmin ? <Smetalist status={'realization'}/> :
                                <div className="no-rights"><Typography align='center'>Недостаточно прав</Typography>
                                </div>}
                        </Route>
                        <Route path='/main/analytics'>
                            {isAdmin ? <UsersRecap/> :
                                <div className="no-rights"><Typography align='center'>Недостаточно прав</Typography>
                                </div>}
                        </Route>
                        <Route path='/main/analytics-item/:id'>
                            {isAdmin ? <AnalyticsItem/> :
                                <div className="no-rights"><Typography align='center'>Недостаточно прав</Typography>
                                </div>}
                        </Route>
                        <Route path='/main/fundTasks/'>
                            {isAdmin ? <FundTasks/> :
                                <div className="no-rights"><Typography align='center'>Недостаточно прав</Typography>
                                </div>}
                        </Route>
                    </Switch>
                </div>
            </div>
            {name === 'empty' && <Redirect to='/auth'/>}
            <BasicModal
                open={isWarning.length > 0}
                onClose={() => setIsWarning('')}
                body={<div>
                    <Typography color={'primary'}>Вы уверены, что хотите закрыть заключение/смету ?</Typography>
                    <p>Если вы изменяли данные в заключении/смете и не нажали кнопку Сохранить - изменения не
                        сохранятся</p>
                    <Button onClick={() => {
                        history.push(isWarning)
                        setIsWarning('')
                    }}>Да, уверен</Button>
                    <Button color={'error'} onClick={() => setIsWarning('')}>Нет</Button>
                </div>}/>
        </div>}
    </div>
}
export default Dashboard