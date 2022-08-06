import React, { useEffect } from "react";
import {
   Switch,
   Route,
   Link,
   Redirect,
   useRouteMatch
} from "react-router-dom";
import ReportList from "../reportlist/reportlist";
import { ListItemText, IconButton, Typography, CircularProgress, ListItemIcon, Button } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import './style.dash.scss'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { checkUser, logOutUser } from "../../actions/user";
import SummarizeIcon from '@mui/icons-material/Summarize';
import ApplicationItem from "../applicationItem";
import { Registration } from "../auth/registration";


const Dashboard = (): React.ReactElement => {
   const { name, isLoading, role, hasSuperUser } = useSelector((state: RootState) => state.user)
   let match = useRouteMatch();
   const dispatch = useDispatch()
   const logOut = () => dispatch(logOutUser())
   useEffect(() => {
      dispatch(checkUser())
   }, [])
   return !hasSuperUser ? <Registration notHaveSuperUser /> :  name === '' ? <CircularProgress /> : <div className="dashboard">
      <div className="dasheader">
         <div className='user-block'>
            <Typography variant="body1" >
               {name}
            </Typography>
            <IconButton onClick={logOut}>
               <LogoutIcon />
            </IconButton>
         </div>
      </div>
      <div className="main-wrapper">
         <div className="sidebar">
            <div className='list-item'>
               <Link to='/main/table'>
                  <ListItemIcon>
                     <SummarizeIcon />
                  </ListItemIcon>
               </Link>
               <Link to='/main/table'>
                  <ListItemText>
                     Заключения
                  </ListItemText>
               </Link>
            </div>
            {role !== 'doctor' && <div className='list-item'>
               <Link to='/main/newuser'>
                  <Button size='small' color='inherit'>
                     Новый пользователь
                  </Button>
               </Link>
            </div>}
         </div>
         <div className="main-content">
            <Switch>
               <Route exact path='/main/table'>
                  <ReportList />
               </Route>
               <Route path='/main/application/:id'>
                  <ApplicationItem />
               </Route>
               <Route path='/main/newuser'>
                  {role !== 'doctor' ? <Registration /> : <Typography align='center'>Недостаточно прав</Typography>}
               </Route>
            </Switch>
         </div>
      </div>
      {name === 'empty' && <Redirect to='/auth' />}
   </div>
}
export default Dashboard