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
const App = () => {
  return (
    <React.Fragment>
      <Router>
        <div className="page-wrapper">
          <div className="page-container">
            <Header />,
            <Sidebar />,
            <div className="main-content">
              <div className="section__content section__content--p30">
                <div className="container-fluid">

                  <Switch>
                    <Route exact path="/" component={Dashboard} />
                    <Route exact path="/productlist" component={Productlist} />
                    <Route exact path="/addproduct" component={Addproduct} />
                    <Route exact path="/editproduct/:id" component={Editproduct} />
                    <Route exact path = "/orderlist"   component={Orderlist} />
                    <Route exact path = "/addorder" component={Addorder} />
                  </Switch>

                  {/* <Dashboard/>,  */}

                </div>
              </div>
            </div>

            <Footer />
          </div>
        </div>
      </Router>
    </React.Fragment>
  );
}

export default App;
