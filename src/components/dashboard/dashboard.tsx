import React, {Fragment, useEffect} from "react";
import {Link, Redirect, Route, Switch, useHistory, useLocation} from "react-router-dom";
import ReportList from "../reportlist/reportlist";
import {Button, IconButton, Typography} from "@mui/material";
import './style.dash.scss'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {checkUser, logOutUser} from "../../actions/user";
import LogoutIcon from '@mui/icons-material/Logout';
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
import {saveStartTime} from "../../api/user";
import UserItemScreen from "../useritem/userItemScreen";
import {Analytics} from "@mui/icons-material";
import UsersRecap from "../analytics";
import AnalyticsItem from "../analyticsItem";
import FundWorkerList from "../fundWorkerList";
import FundTasks from "../FundTasks";
import {sessionHeartBit} from "../../common/api/api";
import MenuItem from "../menuItem";
import SummarizeIcon from "@mui/icons-material/Summarize";
import {PeopleAlt} from "@mui/icons-material";
import {setExpanded} from "../../reducers/ui";


const Dashboard = (): React.ReactElement => {
    const {user, hasSuperUser} = useSelector((state: RootState) => state.user)
    const {name, id} = user

    const rights = useSelector((state: RootState) => selectApplicationUserRights(state))
    const isAdmin = user.role === 'admin' || user.role === 'superadmin'
    const {isExpanded} = useSelector((state: RootState) => state.ui)
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
                sessionHeartBit(`/usdurhrtbt`, sessionId, 30000)
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
            <div className="dashboard-wrapper">
                <header className="header">
                    <div className="header__content-wrapper ">
                        <div className="header__left">
                            <div className="burger" onClick={() => dispatch(setExpanded(!isExpanded))}>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                            <Link to='' onClick={(e) => goToTab(e, '/main/table')}>
                                <img src={HopedocLogo} height={40} alt="Hopedoc"/>
                            </Link>
                        </div>
                        <div className="header__rigth">
                            <Typography>{name}</Typography>
                            <IconButton onClick={logOut}>
                                <LogoutIcon/>
                            </IconButton>
                        </div>
                    </div>
                </header>
                <div className={`left-menu ${isExpanded ? 'expanded' : ''}`}>
                    <div>
                        {rights.isApplicationOneRight &&
                            <MenuItem label={<SummarizeIcon/>} title={'Заключения'}
                                      onClick={(e: any) => goToTab(e, '/main/table')}/>}
                        {rights.isUsersOneRight &&
                            <Fragment>
                                <MenuItem
                                    label={<PeopleAlt/>}
                                    title={'Пользователи'}
                                    onClick={(e: any) => {
                                        e.preventDefault();
                                        setOpenDropDown({
                                            ...openDropDown,
                                            users: !openDropDown.users
                                        })
                                    }}
                                    after={<KeyboardArrowDownSharpIcon sx={{width: 30, height: 30}}/>}

                                />
                                {openDropDown.users &&
                                    <Fragment>
                                        <div className={'left-menu-sub-item'}><MenuItem
                                            onClick={(e: any) => goToTab(e, '/main/users')}
                                            title={'Консилиум'}/>
                                        </div>
                                        <div className={'left-menu-sub-item'}><MenuItem
                                            onClick={(e: any) => goToTab(e, '/main/fundworkers')}
                                            title={'Работники фондов'}/>
                                        </div>
                                    </Fragment>}
                            </Fragment>}
                        {rights.processedRights.smetas?.read && <MenuItem
                            title={'Сметы'}
                            label={<CalculateIcon/>}
                            onClick={(e: any) => goToTab(e, '/main/smetas')}
                        />
                        }
                        {isAdmin &&
                            <Fragment>
                                <MenuItem
                                    title={<span>Сметы на<br/>проверку</span>}
                                    label={<GradingIcon/>}
                                    onClick={(e: any) => goToTab(e, '/main/smetasoncheck')}
                                />
                                <MenuItem
                                    title={<span>Сметы на<br/>реализации</span>}
                                    label={<CheckCircleOutlineIcon/>}
                                    onClick={(e: any) => goToTab(e, '/main/smetasoncheck')}
                                />
                                <MenuItem
                                    title={'Аналитика'}
                                    label={<Analytics/>}
                                    onClick={(e: any) => goToTab(e, '/main/analytics')}
                                />
                                <MenuItem
                                    title={'Куратор'}
                                    label={<Analytics/>}
                                    onClick={(e: any) => goToTab(e, '/main/fundTasks')}
                                />
                            </Fragment>
                        }

                    </div>

                </div>
            </div>
            <div className="main-wrapper">
                <div className={`main-content ${isExpanded ? 'expanded' : ''}`}>
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