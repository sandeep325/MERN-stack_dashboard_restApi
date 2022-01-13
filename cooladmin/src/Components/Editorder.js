import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useParams } from 'react-router-dom';
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";


const Editorder = () => {

    const { id } = useParams();
    const [Order, setOrder] = useState([]);
    // ========================Fetch order by id API call========================
    useEffect( ()=>{
        async function getOrderById() {

            const response = await axios.get(`http://localhost:8080/orders/${id}`);
            //   console.log(response.data);
            if (response.data.status === 200) {
                setOrder(response.data.order);
            } else if(response.data.status === 404) {
                console.log(response.data.message);

            } else {
                console .log(response);
            }

        }
        getOrderById();
         
    },[] );


    const initialValuesOfOrder = {
        name: Order.name,
        product: Order.product,
        quantity: Order.quantity,
    }

    const validateOrderSchema = Yup.object({
        name: Yup.string().max(50, 'Must be 50 charecter or less.').required("Customer name must be required."),
        product: Yup.string().required("Product can not be NULL."),
        quantity: Yup.number().required("Please select atleast one."),

    })

    // ===================================CALL UPDATE ORDER API ===============================================
    const orderOrderAction = (values) => {

    }

    return (
        <React.Fragment>
            <div className="col-lg-12">

                <div className="card">
                    <ToastContainer style={{ marginTop: "10%", zIndex: 999 }} />
                    <div className="card-header text-center">Update <span style={{color:"blue"}}>{Order.name}</span> order</div>
                    <div className="card-body card-block">
                        <Formik enableReinitialize={true} initialValues={initialValuesOfOrder} onSubmit={value => { orderOrderAction(value) }} validationSchema={validateOrderSchema} >
                            <Form action="" method="post" className="" >

                                <div className="form-group">
                                    <label>Customer  Name :</label>
                                    <div className="input-group">
                                        <Field type="text" id="name" name="name" placeholder="Enter your name" className="form-control" autoComplete="off" />
                                    </div>
                                    <span style={{ color: "red" }}> <ErrorMessage name="name" /></span>
                                </div>

                                <div className="form-group">
                                    <label>Product (product ID) :</label>
                                    <div className="input-group">
                                        <Field type="text" id="product" name="product" placeholder="Enter Product ID " className="form-control" autoComplete="off" />
                                    </div>
                                    <span style={{ color: "red" }}> <ErrorMessage name="product" /></span>
                                </div>

                                <div className="form-group">
                                    <label>Quantity :</label>
                                    <div className="input-group">
                                        <Field as="select" name="quantity" className="form-control">
                                            <option value="" >--select quantity--</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                            <option value="10">10</option>
                                        </Field>
                                    </div>
                                    <span style={{ color: "red" }}><ErrorMessage name="quantity" /></span>
                                </div>

                                <div className="form-actions form-group float-right">
                                    <button type="submit" className="btn btn-success btn-sm">Submit</button>
                                </div>
                            </Form>

                        </Formik>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );

}
export default Editorder;