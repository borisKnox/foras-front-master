import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

// API
import session from '../services/session.service';

// Home Page
import Home from '../views/home';
// Individual Pages
import IndividualList from '../views/individuals/list';
import IndividualFavorites from '../views/individuals/favorites';
import IndividualDetail from '../views/individuals/detail';
// Corporate Pages
import CorporatesList from '../views/corporates/list';
import CorporatesFavorites from '../views/corporates/favorites';
import CorporateDetail from '../views/corporates/detail';
// Map Page
import Map from '../views/map';
// Jobs Pages
import ForasJobs from '../views/jobs/list';
import JobPost from '../views/jobs/post';
import JobDetail from '../views/jobs/detail';
// ContactUs Page
import ContactUs from '../views/contact-us';
// Profile Page
import Profile from '../views/profile';
import ProfileEdit from '../views/profile/edit';
import { LinkedInPopUp } from 'react-linkedin-login-oauth2';

class WebRoute extends React.Component {
  constructor(props) {
    super();
    this.state = {
      isAdminPath: false,
    }
  }
  componentDidMount() {
    const isAdminPath = window.location.href.includes('admin');
    this.setState({isAdminPath: isAdminPath});
  }

  render() {
    const isLoggedIn = session.get('foras-user') ? true : false;
    return (
        <Switch>
            <Route exact path="/linkedin" component={LinkedInPopUp} />
            <Route path="/contact-us">
                <ContactUs />
            </Route>
            <Route exact path="/">
                <Home />
            </Route>
            <Route exact path="/map">
                {isLoggedIn ? <Map /> : <Redirect exact to="/" />}
            </Route>
            <Route path="/jobs">
                {isLoggedIn ? <Jobs /> : <Redirect exact to="/" />}
            </Route>
            <Route path="/individuals">
                {isLoggedIn ? <Individuals /> : <Redirect exact to="/" />}
            </Route>
            <Route path="/corporates">
                {isLoggedIn ? <Corporates /> : <Redirect exact to="/" />}
            </Route>
            <Route exact path="/profile">
                {isLoggedIn ? <Profile /> : <Redirect exact to="/" />}
            </Route>
            <Route exact path="/profile/edit">
                {isLoggedIn ? <ProfileEdit /> : <Redirect exact to="/" />}
            </Route>
            <Route exact path="/job-post">
                {isLoggedIn ? <JobPost /> : <Redirect exact to="/" />}
            </Route>
        </Switch>
    );
  }
}

export default WebRoute;

function Individuals() {
  // let match = useRouteMatch();

  return (
    <Switch>
      <Route exact path="/individuals">
        <IndividualList />
      </Route>
      <Route exact path="/individuals/favorites">
        <IndividualFavorites />
      </Route>
      <Route exact path="/individuals/:id" component={IndividualDetail}>
        <IndividualDetail />
      </Route>
    </Switch>
  );
}

function Corporates() {
  // let match = useRouteMatch();

  return (
    <Switch>
      <Route exact path="/corporates">
        <CorporatesList />
      </Route>
      <Route exact path="/corporates/favorites">
        <CorporatesFavorites />
      </Route>
      <Route exact path="/corporates/:id">
        <CorporateDetail />
      </Route>
    </Switch>
  );
}

function Jobs() {
  // let match = useRouteMatch();

  return (
    <Switch>
      <Route exact path="/jobs">
        <ForasJobs />
      </Route>
      <Route exact path="/jobs/:id">
        <JobDetail />
      </Route>
    </Switch>
  );
}
