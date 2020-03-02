import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import ReactNotifications from 'react-notifications-component';

/**************************************/
/*************** Layouts **************/
/**************************************/
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

/**************************************/ 
/************** Routes ****************/ 
/**************************************/ 
import WebRoute from './routes/WebRoute';
import AdminRoute from './routes/AdminRoute';

/**************************************/
/**************** API *****************/
/**************************************/
import session from './services/session.service';

/*************************************/
import { EventEmitter } from './services/events';
import { css } from "@emotion/core";
// First way to import
import { ClipLoader } from "react-spinners";
 
// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  position: absolute;
  width: 120px;
  height: 120px;
  top: calc(50% - 60px);
  left: calc(50% - 60px);
  transform: translate(-50%, -50%);
  border-width: 10px;
`;

class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      isAdminPath: false,
      loading: false
    }

    EventEmitter.subscribe('loader', (event) => this.setState({loading: event}))
  }
  componentDidMount() {
    const isAdminPath = window.location.href.includes('admin');
    this.setState({isAdminPath: isAdminPath});
  }

  render() {
    return (
      <Router>
        <div>
          <ReactNotifications />
          {this.state.loading && <div className="foras-loading">
            <ClipLoader
              css={override}
              color={"#8c2703"}
              loading={this.state.loading}
            />
          </div>}
          {!this.state.isAdminPath && <Header props={this.props} />}
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            {this.state.isAdminPath ? <AdminRoute /> : <WebRoute />}
          </Switch>
          {!this.state.isAdminPath && <Footer />}
        </div>
      </Router>
    );
  }
}

export default App;