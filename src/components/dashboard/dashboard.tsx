import React, { useState, useEffect } from "react";
import {
   BrowserRouter as Router,
   Switch,
   Route,
   Link,
   Redirect,
   useRouteMatch
} from "react-router-dom";
import ReportList from "../reportlist/reportlist";
import { List, ListItem, ListItemText, IconButton, Typography, CircularProgress } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import './style.dash.scss'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { checkUser, logOutUser } from "../../actions/user";
import SummarizeIcon from '@mui/icons-material/Summarize';
import ApplicationItem from "../applicationItem";
import { Document, Page, PDFViewer, PDFDownloadLink } from '@react-pdf/renderer'


const Dashboard = (): React.ReactElement => {
   const { name, isLoading } = useSelector((state: RootState) => state.user)
   let match = useRouteMatch();
   const dispatch = useDispatch()
   const logOut = () => dispatch(logOutUser())
   useEffect(() => {
       ('use effect')
      dispatch(checkUser())
   }, [])
   return name === '' ? <CircularProgress /> : <div className="dashboard">
      <div className="dasheader">
         <div className='user-block'>
            <Typography variant="body1" color="initial">
               {name}
            </Typography>
            <IconButton onClick={logOut}>
               <LogoutIcon />
            </IconButton>
         </div>
      </div>
      <div className="main-wrapper">
         <div className="sidebar">
            <List>
               <ListItem>
                  <div className="list-item">
                     <SummarizeIcon />
                     <Link to='/main/table'>
                        <ListItemText>
                           Заключения
                        </ListItemText>
                     </Link>
                  </div>
               </ListItem>
               <ListItem>
                  <div className="list-item">
                     <SummarizeIcon />
                     <Link to='/main/words'>
                        <ListItemText>
                           words
                        </ListItemText>
                     </Link>
                  </div>
               </ListItem>
            </List>
         </div>
         <div className="main-content">
            <Switch>
               <Route exact path='/main/table'>
                  <ReportList />
               </Route>
               <Route path='/main/application/:id'>
                  <ApplicationItem />
               </Route>
            </Switch>
         </div>
      </div>
      {name === 'empty' && <Redirect to='/auth' />}
   </div>
}
export default Dashboard