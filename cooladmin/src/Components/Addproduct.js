import React,{useEffect} from "react";
import axios from "axios";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const Addproduct = () => {

    const history = useHistory();
    useEffect(() => {
        const userAuthData_ID = localStorage.getItem("_id");
        if (userAuthData_ID == null || userAuthData_ID == '') {
            history.push('/');
        }

    }, []);

    const formInitialschema = {
        name: '',
        price: '',
        // productImage: '',

    }
    const validate = Yup.object({
        name: Yup.string().max(30, 'Must be 15 characters or less').required("Product name must be required."),
        price: Yup.number().typeError('Please enter valid amount.').required("Price  must be required"),
        // password: Yup.string().required("Password must be required.").max(12, "Password should be less than or eqal to 12 char.")
    })

    const formHandelingFun = (value) => {
        const params = value;
        // console.log(params); return false;
        async function addNewproduct() {
            try{
                const userAuthData_Token = localStorage.getItem("token");
                const response = await axios.post(process.env.REACT_APP_API_SERVER_PORT+`products/addproducts`, params ,{headers: {"authorization" : `Bearer ${userAuthData_Token}` } });
            if (response.data.status === 201) {
                console.log(response.data);
                toast.success('New  Product Added Successfully.', { autoClose: 9000 })

            } else {
                console.log(response.error);
            }

            } catch(error) {  
                console.log(error.response);
            }
            
        }
        addNewproduct();
        // toast.success('User add successfully.' , {autoClose:false})
        // toast.success(' User add successfully.' , {autoClose:9000})
        // console.log(value.name);
        // if(value != '') {

        // }
    }

    return (
        <React.Fragment>
            <div className="col-lg-12">

                <div className="card">
                    <ToastContainer style={{ marginTop: "10%", zIndex: 999 }} />
                    <div className="card-header text-center">Add New Product</div>
                    <div className="card-body card-block">
                        <Formik initialValues={formInitialschema} onSubmit={value => { formHandelingFun(value) }} validationSchema={validate}>
                            <Form action="" method="post" className="" >
                                <div className="form-group">
                                    <div className="input-group">
                                        <Field type="text" id="name" name="name" placeholder="Product Name" className="form-control" autoComplete="off" />
                                    </div>
                                    <span style={{ color: "red" }}><ErrorMessage name="name" /></span>
                                </div>

                                <div className="form-group">
                                    <div className="input-group">
                                        <Field type="text" id="price" name="price" placeholder=" Product price (in Rupees)" className="form-control" />
                                    </div>
                                    <span style={{ color: "red" }}><ErrorMessage name="price" /></span>
                                </div>

                                {/* <div className="form-group">
                                    <div className="input-group">
                                        <Field  type="file" name="productImage" />
                                        <input id="file" name="file" type="file" accept="image/*"/>
                                        
                                    </div>
                                </div> */}

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
export default Addproduct;