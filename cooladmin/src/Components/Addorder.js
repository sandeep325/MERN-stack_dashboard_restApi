import React, { useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
const Addorder = () => {

    const history = useHistory();
    useEffect(() => {
        const userAuthData_ID = localStorage.getItem("_id");
        if (userAuthData_ID == null || userAuthData_ID == '') {
            history.push('/');
        }

    }, []);

    const initialValuesOfOrder = {
        name: '',
        product: '',
        quantity: '',
    }

    const validateOrderSchema = Yup.object({
        name: Yup.string().max(50, 'Must be 50 charecter or less.').required("Customer name must be required."),
        product: Yup.string().required("Product can not be NULL."),
        quantity: Yup.number().required("Please select atleast one."),

    })

    // ======================CALL POST API FOR ADD ORDER ===================================================
    const orderhendlerAction = (values) => {
        // console.log(values);
        const params = {
            name: values.name,
            productId: values.product,
            quantity: values.quantity,
        }
        async function postOrder() {
            try {
                const userAuthData_Token = localStorage.getItem("token");
                const response = await axios.post(process.env.REACT_APP_API_SERVER_PORT + 'orders/addorders', params, { headers: { "authorization": `Bearer ${userAuthData_Token}` } });
                if (response.data.status === 201) {
                    console.log(response.data);
                    toast.success(response.data.message, { autoClose: 9000 })
    
                } else {
                    console.log(response.error);
                }
            } catch (error) {
                console.log(error.response); return false;

            }
            //     const userAuthData_Token = localStorage.getItem("token");
            // const response =   await axios.post(process.env.REACT_APP_API_SERVER_PORT+'orders/addorders',params,{headers: {"authorization" : `Bearer ${userAuthData_Token}` } }); 
            // if(response.data.status===201) {
            //     toast.success(response.data.message , {autoClose:9000});

            // } else {
            //     console.log(response); return false;
            // }
        }
        postOrder();

    }



    return (
        <React.Fragment>
            <div className="col-lg-12">

                <div className="card">
                    <ToastContainer style={{ marginTop: "10%", zIndex: 999 }} />
                    <div className="card-header text-center">Order Now </div>
                    <div className="card-body card-block">
                        <Formik enableReinitialize={true} initialValues={initialValuesOfOrder} onSubmit={value => { orderhendlerAction(value) }} validationSchema={validateOrderSchema} >
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
export default Addorder;