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
import { Document, Page, PDFViewer, Text, StyleSheet, View } from '@react-pdf/renderer'
import MyDoc from './components/applicationItem/pdfdoc/pdfdoc';


const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Oswald'
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    fontFamily: 'Oswald'
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'Times-Roman'
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
});

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
          <Route path='/flpdf/:id'>
            <MyDoc />
          </Route>
        </Switch>
      </div>
    </Router >
  );
}

export default App;
