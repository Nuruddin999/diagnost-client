import { Auth } from './components/auth/auth';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  HashRouter
} from "react-router-dom";
import Dashboard from './components/dashboard/dashboard';
import MyDoc from './components/applicationItem/pdfdoc/pdfdoc';

function App() {

  return (
    <HashRouter basename='/'>
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
    </HashRouter >
  );
}

export default App;
