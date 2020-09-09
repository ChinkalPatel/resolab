import React from 'react';
import {Link,Route,Switch} from "react-router-dom";
import {Navbar,Nav} from "react-bootstrap";
import Cookies from "universal-cookie";


import Homepage from './components/Homepage';
import ErrorPage from './components/ErrorPage';
import LogOut from './components/Logout';
import SignUpForm from './components/SignUp'
import LoginForm from './components/Login';
import People from './components/Resources';
import ServicesPage from './components/Services';
import SeekerForm from './components/Seeker';
import ProviderForm from './components/Provider';
import LoadingElement from './components/Loader';
import SeekerDetails from './components/SeekerDetails';
import ProviderDetails from './components/ProviderDetails';
import ResetPassword from './components/ResetPassword';
import PricingPage from './components/Payment';
import Form1 from './components/InnerForm1';
import Form2 from './components/InnerForm2';
import Form3 from './components/InnerForm3';

import AdvisoryProviderForm from './components/ServicesForm/AdvisoryProvider';
import AdvisorySeekerForm from './components/ServicesForm/AdvisorySeeker';
import AllProviderForm from './components/ServicesForm/AlliedProvider';
import AlliedSeekerForm from './components/ServicesForm/AdvisorySeeker';
import InfraProviderForm from './components/ServicesForm/InfraProvider';
import InfraSeekerForm from './components/ServicesForm/InfraSeeker';

import AlliedProviderDetails from './components/ServicesDetails/AlliedProviderDetails';
import InfraProviderDetails from './components/ServicesDetails/InfraProviderDetails';
import AlliedSeekerDetails from './components/ServicesDetails/AlliedSeekerDetails';
import InfraSeekerDetails from './components/ServicesDetails/InfraSeekerDetails';

import './style/css/App.css';

function App() {
  const cookies = new Cookies();
  return (
    <div className="App">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
        <Navbar.Brand className="App-header">Resolab</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link className="App-link" eventKey="1" as={Link} to="/">Home</Nav.Link>
            <Nav.Link className="App-link" eventKey="2" as={Link} to="/people">People</Nav.Link>
            <Nav.Link className="App-link" eventKey="3" as={Link} to="/emodules">E-modules</Nav.Link>
            <Nav.Link className="App-link" eventKey="4" as={Link} to="/services">Services</Nav.Link>
            <Nav.Link  className="App-link" eventKey="5" as={Link} to="/contact">Contact</Nav.Link>
          </Nav>
          <Nav>
            
            {cookies.get("token")?
            <Nav.Link className="App-link" eventKey="8" as={Link} to="/form1">Profile</Nav.Link>
              : <Nav.Link className="App-link" eventKey="7" as={Link} to="/login">Login</Nav.Link>}
            {cookies.get("token")?
            <Nav.Link className="App-link" eventKey="9" as={Link} to="/logout">Logout</Nav.Link>
              : <Nav.Link className="App-link" eventKey="6" as={Link} to="/signup">Sign Up</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Switch>
        <Route exact path="/" component={Homepage}/>
        <Route path="/signup" component={SignUpForm}/>
        <Route path="/login" component={LoginForm}/>
        <Route path="/people" component={People}/>
        <Route path="/services" component={ServicesPage}/>
        <Route path="/seeker" component={SeekerForm} />
        <Route path="/provider" component={ProviderForm} />
        <Route path="/loader" component={LoadingElement}/>
        <Route path="/seekerdetails" component={SeekerDetails}/>
        <Route path="/providerdetails" component={ProviderDetails}/>
        <Route path="/rpassword" component={ResetPassword}/>
        <Route path="/logout" component={LogOut}/>
        <Route path="/payment" component={PricingPage}/>

        <Route path="/form1" component={Form1}/>
        <Route path="/form2" component={Form2}/>
        <Route path="/form3" component={Form3}/>

        <Route path="/adpf" component={AdvisoryProviderForm}/>
        <Route path="/adsf" component={AdvisorySeekerForm}/>

        <Route path="/alpf" component={AllProviderForm}/>
        <Route path="/alsf" component={AlliedSeekerForm}/>

        <Route path="/ipf" component={InfraProviderForm}/>
        <Route path="/isf" component={InfraSeekerForm}/>

        <Route path="/apd" component={AlliedProviderDetails}/>
        <Route path="/ipd" component={InfraProviderDetails}/>
        <Route path="/asd" component={AlliedSeekerDetails}/>
        <Route path="/isd" component={InfraSeekerDetails}/>
        
        <Route component={ErrorPage} />
      </Switch>
    </div>
  );
}

export default App;