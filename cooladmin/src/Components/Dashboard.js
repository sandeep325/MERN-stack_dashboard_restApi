import axios from "axios";
import React , {useState,useEffect} from "react";
// import React from "react";
import {useHistory } from "react-router-dom";

const Dashboard = () => {


    const history = useHistory();
    useEffect(() => {
        const userAuthData_ID = localStorage.getItem("_id");
        if (userAuthData_ID==null ||userAuthData_ID=='') {
            history.push('/');
        }

    }

        );

     const [Countorders , setCountorders]  = useState();
     const [Products , setProducts]  = useState();
   useEffect( () => {
        const userAuthData_Token = localStorage.getItem("token");          
    async function getOrders() {

        const response = await axios.get(`${process.env.REACT_APP_API_SERVER_PORT}orders/`,{headers: {"authorization" : `Bearer ${userAuthData_Token}` } });
        // console.log(response.data);
        if(response.data.status === 200) {
        setCountorders(response.data.countOrder);
        }
    }

    getOrders();

   } ,[]);




   useEffect( () => {
        const userAuthData_Token = localStorage.getItem("token");
          
    async function getProduct() {
        const response = await axios.get(`${process.env.REACT_APP_API_SERVER_PORT}products`,{headers: {"authorization" : `Bearer ${userAuthData_Token}` } });
        // console.log(response.data);
        if(response.data.status === 200) {
            setProducts(response.data.countproduct);
        }
    }

    getProduct();

   } ,[]);


    return (
     <React.Fragment>
     <div className="row">
                            <div className="col-md-12">
                                <div className="overview-wrap text-center">
                                    <h2 className="title-1 ">Dashboard</h2>
                                </div>
                            </div>
                        </div>
                        <div className="row m-t-25">

                        <div className="col-sm-8 col-lg-2">
                            </div>


                            <div className="col-sm-8 col-lg-4">
                                <div className="overview-item overview-item--c1">
                                    <div className="overview__inner">
                                        <div className="overview-box clearfix">
                                            <div className="icon">
                                                <i className="zmdi zmdi-account-o"></i>
                                            </div>
                                            <div className="text">
                                                <h2 className="text-center">{Countorders}</h2>
                                                <span>NO OF ORDER'S</span>
                                            </div>
                                        </div>
                                        <div className="overview-chart">
                                            <canvas id="widgetChart1"></canvas>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-8 col-lg-4">
                                <div className="overview-item overview-item--c2">
                                    <div className="overview__inner">
                                        <div className="overview-box clearfix">
                                            <div className="icon">
                                                <i className="zmdi zmdi-shopping-cart"></i>
                                            </div>
                                            <div className="text">
                                                <h2 className="text-center">{Products}</h2>
                                                <span>TOTAL PRODUCT'S</span>
                                            </div>
                                        </div>
                                        <div className="overview-chart">
                                            <canvas id="widgetChart2"></canvas>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-8 col-lg-2">
                            </div>

                            {/* <div className="col-sm-6 col-lg-3">
                                <div className="overview-item overview-item--c3">
                                    <div className="overview__inner">
                                        <div className="overview-box clearfix">
                                            <div className="icon">
                                                <i className="zmdi zmdi-calendar-note"></i>
                                            </div>
                                            <div className="text">
                                                <h2>1,086</h2>
                                                <span>this week</span>
                                            </div>
                                        </div>
                                        <div className="overview-chart">
                                            <canvas id="widgetChart3"></canvas>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            {/* <div className="col-sm-6 col-lg-3">
                                <div className="overview-item overview-item--c4">
                                    <div className="overview__inner">
                                        <div className="overview-box clearfix">
                                            <div className="icon">
                                                <i className="zmdi zmdi-money"></i>
                                            </div>
                                            <div className="text">
                                                <h2>$1,060,386</h2>
                                                <span>total earnings</span>
                                            </div>
                                        </div>
                                        <div className="overview-chart">
                                            <canvas id="widgetChart4"></canvas>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                        
                        <div className="row">
                            <div className="col-lg-12">
                                {/* <h2 className="title-1 m-b-25 text-center">users</h2> */}
                                <div className="table-responsive table--no-card m-b-40">
                                    {/* <table className="table table-borderless table-striped table-earning">
                                        <thead>
                                            <tr>
                                                <th>S.No.</th>
                                                <th>Customer Name</th>
                                                <th>Email</th>
                                                <th className="text-right">CustomerId</th>
                                                <th className="text-right">Mobile</th>
                                                <th className="text-right">City</th>
                                            </tr>
                                        </thead>
                                        <tbody> */}
                                            
                                            {/* {Customers.map((Customer,i) =>( 
                                                <tr>
                                                   <td>{(i++)+1}</td>  
                                                   <td>{Customer.name}</td>
                                                <td>{Customer.email}</td>
                                                <td className="text-right">{Customer.id}</td>
                                                <td className="text-right">{Customer.mobile}</td>
                                                <td className="text-right">{Customer.city}</td>
                                                </tr>
                                                
                                            ) )} */}
       
                                        {/* </tbody>
                                    </table> */}
                                </div>
                            </div>
                            
                        </div>
                        

     </React.Fragment>

    );
}
export default Dashboard;