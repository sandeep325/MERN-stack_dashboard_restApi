import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const history = useHistory();
    useEffect(() => {

        const userAuthData_ID = localStorage.getItem("_id");
        if (userAuthData_ID) {
            history.push('/dashboard');
        }

    }

        , []);

    const initialLoginValue = {
        email: '',
        password: ''
    }

    const LogValidationSchema = Yup.object({
        email: Yup.string().email("Please enter valid email.").required("Email must be require."),
        password: Yup.string().max(15, 'Password should be 6-15 charecter long.').min(6, 'Password should be 6-15 charecter long.').required("Password must be require."),


    });


    // delta timeout fun=====
    function delay(t, v) {
        return new Promise(function (resolve) {
            setTimeout(resolve.bind(null, v), t)
        });
    }


    const formHandlingAction = (value) => {
        async function varifyLogin() {
            try {
                const response = await axios.post(`${process.env.REACT_APP_API_SERVER_PORT}user/userlogin`, value)
                // console.log(response);
                if (response.data.status === 200) {
                    // console.log(response.data.data);
                    toast.success("User logedIn successfully.", { autoClose: 9000, position: toast.POSITION.TOP_CENTER });
                    // setLoginCridential(response.data.data);

                    // localStorage.setItem("userinfo", JSON.stringify(response.data.data));
                    Object.keys(response.data.data).forEach(function (key) {
                        console.log('Key : ' + key + ', Value : ' + response.data.data[key])
                        localStorage.setItem(key, response.data.data[key]);
                        localStorage.setItem("login_date", new Date());
                    })

                    return delay(1800).then(function () {
                        history.push('/dashboard')
                    });

                }

            } catch (error) {
                // console.log(error.response);
                if (error.response.data.status === 401) {
                    toast.error(error.response.data.message, { autoClose: 9000, position: toast.POSITION.TOP_CENTER });

                }

            }
            // return false;

        }
        varifyLogin();


    }

    return (

        <>
            <div className="page-wrapper">
                <div className="page-container">
                    <div className="container-fluid">
                        <ToastContainer style={{ marginTop: "10%", zIndex: 999 }} />

                        <div class="col-lg-2"></div>
                        <div class="col-lg-8 mt-4">
                            <div class="card">
                                <div class="card-header">Please Login here</div>
                                <div class="card-body">
                                    <div class="card-title">
                                        <h3 class="text-center title-2" style={{ color: "blue" }}>LOGIN</h3>
                                    </div>
                                    <Formik enableReinitialize={true} initialValues={initialLoginValue} validationSchema={LogValidationSchema} onSubmit={value => formHandlingAction(value)} >
                                        <Form method="post">
                                            <div className="form-group">
                                                <label>Email :</label>
                                                <div className="input-group">
                                                    <Field type="email" id="email" name="email" placeholder="Enter your email" className="form-control" autoComplete="off" />
                                                </div>
                                                <span style={{ color: "red" }} ><ErrorMessage name="email" /></span>
                                            </div>
                                            <div className="form-group">
                                                <label>Password :</label>
                                                <div className="input-group">
                                                    <Field type="password" id="password" name="password" placeholder="Enter your password" className="form-control" autoComplete="off" />
                                                </div>
                                                <span style={{ color: "red" }}><ErrorMessage name="password" /></span>
                                            </div>

                                            <button type="submit" class="btn btn-md btn-primary col-lg-12">Log In</button>
                                            <h5 class="mt-2 col-lg-12"> If you don't have an account <Link to="/register">Register  here !</Link></h5>

                                        </Form>
                                    </Formik>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-2"></div>
                    </div></div></div>
        </>
    );
}
export default Login;