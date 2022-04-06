import './App.css';
import React, { useEffect } from "react";
import { Auth } from './components/auth/auth';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import Dashboard from './components/dashboard/dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './app/store';
import { checkUser, TYPES } from './actions/user';
import CircularProgress from '@mui/material/CircularProgress';
import ReportList from './components/reportlist/reportlist';



function App() {
  const { isLoading, reqStatus, name } = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()

  return (
    <Router>
      <div className="App">
        {/* <Auth /> */}
        <Switch>
          <Route exact path="/">
          <Redirect to='/main' />
          </Route>
          <Route path="/auth">
            <Auth />
          </Route>
          <Route path="/main">
            <Dashboard />
          </Route>
        </Switch>
      </div>
    </Router >
  );
}

export default App;
