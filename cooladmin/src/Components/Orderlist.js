import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast,ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Orderlist = () => {

    const [Orders, setOrders] = useState([]);

    // ================FETCH ALL ORDER API CALL==============================
    useEffect(() => {
        async function getOrderList() {
            const response = await axios.get(process.env.REACT_APP_API_SERVER_PORT+'orders/',{headers: {"authorization" : `Bearer ${process.env.REACT_APP_API_TOKEN}` } });
            // console.log(response.data);
            if (response.data.status === 200) {
                // const orderArrCount = response.data.countOrder;
                console.log(response.data.orders);
                setOrders(response.data.orders);
            } else {
                console.log(response.data);
            }

        }
        getOrderList();
    }, []

    );

    // ========================DELETE ORDER API  CALL  =======================================
    const deleteOrder = (id) => {
        // alert(id);
      const   conDelBox = window.confirm("Do you want delete this order ?");
       if(conDelBox === true) {
            //  alert(id);
       async function deleteOrder() {
                const response =  await axios.delete(process.env.REACT_APP_API_SERVER_PORT+`orders/delete-orders/${id}`,{headers: {"authorization" : `Bearer ${process.env.REACT_APP_API_TOKEN}` } });
                console.log(response.data.status);
                if(response.data.status===200 && response.data.deletedCount===1 ) {
                    
                  const response = await axios.get(process.env.REACT_APP_API_SERVER_PORT+'orders/',{headers: {"authorization" : `Bearer ${process.env.REACT_APP_API_TOKEN}` } });
                  if (response.data.status === 200) {
                    setOrders(response.data.orders);
                } 
                  toast.error('Order deleted Successfully.' ,{position: toast.POSITION.TOP_CENTER} ,{autoClose:9000})

                } else {  return false; }
       }
       deleteOrder();

       }  else {
           return false;
       }

    }


    return (
        <React.Fragment>

            <div className="row">
                <div className="col-lg-12">
                    <ToastContainer style = {{marginTop:"10%", zIndex:999}} />  
                    <div className="overview-wrap float-right">
                        <Link to="/addorder" className="btn btn-info btn-md">
                            <i className="zmdi zmdi-plus"></i>Order Now</Link>
                    </div>
                    <h2 className="title-1 m-b-25 text-center">All Order List </h2>
                    <div className="table-responsive table--no-card m-b-40">
                        <table className="table table-borderless table-striped table-earning" >
                            <thead>

                                <tr>
                                    <th >S.No.</th>
                                    <th>Order ID</th>
                                    <th>Customer Name</th>
                                    <th className="text-right">Product Name</th>
                                    <th className="text-right">Quantity</th>
                                    <th className="text-right">Total Amount (RS.)</th>
                                    <th>View</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>

                            </thead>
                            <tbody>

                                {Orders.map((OrderData, i) => (
                                    <tr>
                                        <td>{(i++) + 1}</td>
                                        <td>{OrderData._id}</td>
                                        <td>{OrderData.name}</td>
                                        <td>{(OrderData.product ? OrderData.product.name : <span style={{ color: 'red' }}>NULL</span>)}</td>
                                        <td>{OrderData.quantity}</td>
                                        <td className="text-right">{(OrderData.product ? (OrderData.product.price * OrderData.quantity) + '- Rs.' : <span style={{ color: 'red' }}>NULL</span>)}</td>
                                        <td><button type="reset" className="btn btn-warning btn-sm">
                                            <i className="fa fa-eye"></i> view
                                        </button>
                                        </td>
                                        <td>
                                            <Link to={"editorder/"+OrderData._id} className="btn btn-info btn-sm">
                                                <i className="fa fa-pencil-square-o"></i>edit</Link>
                                        </td>
                                        <td><button type="button" className="btn btn-danger btn-sm" onClick={(e) => deleteOrder(OrderData._id)} >
                                            <i className="fa fa-times-circle-o"></i> delete
                                        </button></td>
                                    </tr>

                                ))}

                            </tbody>
                        </table>
                    </div>
                </div>

            </div>

        </React.Fragment>
    );

}
export default Orderlist;