import React, { useState, useEffect } from "react";
import { useParams, useHistory } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const Editproduct = () => {

    const history = useHistory();
    useEffect(() => {
        const userAuthData_ID = localStorage.getItem("_id");
        if (userAuthData_ID == null || userAuthData_ID == '') {
            history.push('/');
        }

    }, []);

    const { id } = useParams();
    const [productD, setproductD] = useState([]);

    useEffect(() => {
        const userAuthData_Token = localStorage.getItem("token");
        async function getProductByID() {
            const response = await axios.get(`${process.env.REACT_APP_API_SERVER_PORT}products/${id}`, { headers: { "authorization": `Bearer ${userAuthData_Token}` } });
            //   console.log(response.data);
            if (response.data.status === 200) {
                //   console.log(response.data.products);
                const productDataById = response.data.products;
                setproductD(productDataById);
                //   console.log("inside "+productD.name);
            } else {

                console.log(response);

            }
        }
        getProductByID();

    }, []);



    var pname = productD.name;
    var pprice = productD.price;
    const initialData = {
        name: pname,
        price: pprice,
    }

    const validateData = Yup.object({
        name: Yup.string().max(30, 'Must be 30 characters or less').required("Product name must be required."),
        price: Yup.number().typeError('Please enter valid amount.').required("Price  must be required"),
        // password: Yup.string().required("Password must be required.").max(12, "Password should be less than or eqal to 12 char.")
    })

    const formSubmitAction = (values) => {
        // console.log(values);
        const param = [
            { "propName": "name", "value": values.name },
            { "propName": "price", "value": values.price },
        ];
        async function editProductData() {
            const userAuthData_Token = localStorage.getItem("token");
            try {
                const response = await axios.put(process.env.REACT_APP_API_SERVER_PORT + `products/update-product/${id}`, param, { headers: { "authorization": `Bearer ${userAuthData_Token}` } });
                if (response.data.status === 200) {
                    toast.success('Product Update  Successfully.', { autoClose: 9000 })

                }

            } catch (error) {
                //  console.log(error.response);
                if (error.response.data.status === 401 ||error.response.data.status === 409 ) {
                    toast.warning(error.response.data.message, { autoClose: 9000 })

                }

            }

        }

        editProductData();

    }
    return (
        <React.Fragment>
            <div className="col-lg-12">

                <div className="card">
                    <ToastContainer style={{ marginTop: "10%", zIndex: 999 }} />
                    <div className="card-header text-center">Edit Product <span style={{ color: "blue" }}>{pname}</span></div>
                    <div className="card-body card-block">
                        <Formik enableReinitialize={true} initialValues={initialData} onSubmit={value => { formSubmitAction(value) }} validationSchema={validateData}>
                            <Form action="" method="post" className="" >

                                <div className="form-group">
                                    <div className="input-group">
                                        <Field type="text" id="name" name="name" placeholder="Product Name" className="form-control" autoComplete="off" />
                                    </div>
                                    <span style={{ color: "red" }}> <ErrorMessage name="name" /></span>
                                </div>

                                <div className="form-group">
                                    <div className="input-group">
                                        <Field type="text" id="price" name="price" placeholder="Product price (in Rupees)" className="form-control" autoComplete="off" />
                                    </div>
                                    <span style={{ color: "red" }}> <ErrorMessage name="price" /></span>
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
export default Editproduct;


