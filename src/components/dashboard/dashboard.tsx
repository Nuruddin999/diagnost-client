import React, {useEffect} from "react";
import {Link, Redirect, Route, Switch,} from "react-router-dom";
import ReportList from "../reportlist/reportlist";
import {Backdrop, CircularProgress, IconButton, ListItemIcon, ListItemText, Typography} from "@mui/material";
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
import ApplicationItem from "../applicationItem";
import {Registration} from "../../common/components/registration/registration";
import UsersList from "../userslist/userslist";
import UserItem from "../useritem";
import {selectApplicationUserRights} from "../../common/selectors/user";
import {RoundLoader} from "../../common/components/roundloader";
import Specialities from "../specialities/Specialities";
import Smetalist from "../smetalist/smetalist";
import SmetaItem from "../smetaItem";


const Dashboard = (): React.ReactElement => {
    const {user, hasSuperUser} = useSelector((state: RootState) => state.user)
    const {name} = user
    const rights = useSelector((state: RootState) => selectApplicationUserRights(state))
    const isAdmin = user.role === 'admin' || user.role === 'superadmin'
    const isCircular = useSelector((state: RootState) => state.ui.isCircular)
    const dispatch = useDispatch()
    const logOut = () => dispatch(logOutUser())

    useEffect(() => {
        dispatch(checkUser())
    }, [])
    return !hasSuperUser ? <Registration notHaveSuperUser/> : <div className="dashboard">

        {name === '' ? <RoundLoader/> : <div className="dashboard" data-testid='dashboard'>

            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={isCircular}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>
            <div className="dasheader">
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
                        <Link to='/main/table'>
                            <ListItemIcon>
                                <SummarizeIcon/>
                            </ListItemIcon>
                        </Link>
                        <Link to='/main/table'>
                            <ListItemText>
                                Заключения
                            </ListItemText>
                        </Link>
                    </div>}
                    {rights.isUsersOneRight && <div className='list-item'>
                        <Link to='/main/users'>
                            <ListItemIcon>
                                <PeopleAltIcon/>
                            </ListItemIcon>
                        </Link>
                        <Link to='/main/users'>
                            <ListItemText>
                                Пользователи
                            </ListItemText>
                        </Link>
                    </div>}
                    <div className='list-item'>
                        <Link to='/main/speciality'>
                            <ListItemIcon>
                                <BusinessCenterIcon/>
                            </ListItemIcon>
                        </Link>
                        <Link to='/main/speciality'>
                            <ListItemText>
                                Специальности
                            </ListItemText>
                        </Link>
                    </div>
                    {rights.processedRights.smetas?.read && <div className='list-item'>
                        <Link to='/main/smetas'>
                            <ListItemIcon>
                                <CalculateIcon/>
                            </ListItemIcon>
                        </Link>
                        <Link to='/main/smetas'>
                            <ListItemText>
                                Сметы
                            </ListItemText>
                        </Link>
                    </div>}
                    {isAdmin && <div className='list-item'>
                        <Link to='/main/smetas'>
                            <ListItemIcon>
                                <GradingIcon/>
                            </ListItemIcon>
                        </Link>
                        <Link to='/main/smetasoncheck'>
                            <ListItemText>
                                Сметы на
                            </ListItemText>
                            <ListItemText>
                                проверку
                            </ListItemText>
                        </Link>
                    </div>}
                    {isAdmin && <div className='list-item'>
                        <Link to='/main/smetas'>
                            <ListItemIcon>
                                <CheckCircleOutlineIcon/>
                            </ListItemIcon>
                        </Link>
                        <Link to='/main/smetasonrealization'>
                            <ListItemText>
                                Сметы на
                            </ListItemText>
                            <ListItemText>
                                реализации
                            </ListItemText>
                        </Link>
                    </div>}
                </div>
                <div className="main-content">
                    <Switch>
                        {rights.processedRights.applications?.read && <Route exact path='/main/table'>
                            <ReportList/>
                        </Route>}
                        <Route path='/main/application/:id'>
                            {rights.processedRights.applications?.read ? <ApplicationItem/> :
                                <div className="no-rights"><Typography align='center'>Недостаточно прав</Typography>
                                </div>}
                        </Route>
                        <Route path='/main/user/:id'>
                            {rights.processedRights.users?.read ? <UserItem/> :
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
                        <Route path='/main/speciality'>
                            {rights.processedRights.applications?.read ? <Specialities/> :
                                <Typography className="no-rights" align='center'>Недостаточно прав</Typography>}
                        </Route>
                        <Route path='/main/aboutme'>
                            <UserItem isProfile/>
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
                            {isAdmin ?  <Smetalist status={'oncheck'}/>   :
                                <div className="no-rights"><Typography align='center'>Недостаточно прав</Typography>
                                </div>}
                        </Route>
                        <Route path='/main/smetasonrealization'>
                            {isAdmin ?  <Smetalist status={'realization'}/>   :
                                <div className="no-rights"><Typography align='center'>Недостаточно прав</Typography>
                                </div>}
                        </Route>
                    </Switch>
                </div>
            </div>
            {name === 'empty' && <Redirect to='/auth'/>}
        </div>}
    </div>
}
export default Dashboard