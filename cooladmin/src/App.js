import React from 'react';
import { BrowserRouter as Router, Route, Switch , } from 'react-router-dom';
// import './App.css';
import Sidebar from './Components/Sidebar';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Dashboard from './Components/Dashboard';
import Productlist from './Components/Productlist';
import Addproduct from './Components/Addproduct';
import Editproduct from './Components/Editproduct';
import Orderlist from './Components/Orderlist';
import Addorder from './Components/Addorder';
import Editorder from './Components/Editorder';
import PageNotFound from './Components/PageNotFound';
import Registration from './Components/Auth/Registration';
import Login from './Components/Auth/Login';
const App = () => {
  return (
    <React.Fragment>
      <Router>
      <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/register" component={Registration} />
      <Route  component={PageNotFound} />

        <div className="page-wrapper">
          <div className="page-container">
            <Header />,
            <Sidebar />,
            <div className="main-content">
              <div className="section__content section__content--p30">
                <div className="container-fluid">
                    <Route exact path="/dashboard" component={Dashboard} />
                    <Route exact path="/productlist" component={Productlist} />
                    <Route exact path="/addproduct" component={Addproduct} />
                    <Route exact path="/editproduct/:id" component={Editproduct} />
                    <Route exact path = "/orderlist"   component={Orderlist} />
                    <Route exact path = "/addorder" component={Addorder} />
                    <Route exact path = "/editorder/:id" component={Editorder} />
                  {/* <Dashboard/>,  */}

                </div>
              </div>
            </div>

            <Footer />
          </div>
        </div>
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
