import React,{useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const Registration = () => {
    const history = useHistory();


    useEffect(() => {
        const userAuthData_ID = localStorage.getItem("_id");
        if (userAuthData_ID) {
            history.push('/dashboard');
        }

    },[]);

    const InitialValuesReg = {
        name: '',
        email: '',
        password: '',
        conpassword: ''

    }

    const RegValidationSchema = Yup.object({
        name: Yup.string().max(30, 'Name is too long.').min(2, 'Name is too short').required("Name must be require."),
        email: Yup.string().email("Please enter valid email.").required("Email must be require."),
        password: Yup.string().max(15, 'Password should be 6-15 charecter long.').min(6, 'Password should be 6-15 charecter long.').required("Password must be require."),
        conpassword: Yup.string().required("confirm password must be require.").oneOf([Yup.ref('password'), null], 'Passwords must match')

    });

    // ===========================form submition action here =========================================

    const formHandlingAction = (value) => {
        // console.log(value);
        const params = {
            name: value.name,
            email: value.email,
            password: value.password
        }

        function delay(t, v) {
            return new Promise(function (resolve) {
                setTimeout(resolve.bind(null, v), t)
            });
        }

        async function signupAction() {

            try {
                const response = await axios.post(`${process.env.REACT_APP_API_SERVER_PORT}user/signup`, params);
                if (response.data.status === 201) {
                    toast.success(response.data.message, { autoClose: 9000, position: toast.POSITION.TOP_CENTER });
                    // setTimeout(() => history.push('/'), 1300)
                    // history.push('/');

                    return delay(1800).then(function () {
                        history.push('/')
                    });

                }


            } catch (error) {

                if (error.response.data.status === 409) {
                    toast.warning(error.response.data.message, { autoClose: 9000, position: toast.POSITION.TOP_CENTER });

                }

            }

        }
        signupAction();

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
                                <div class="card-header">Please Register here !</div>
                                <div class="card-body">
                                    <div class="card-title">
                                        <h3 class="text-center title-2" style={{ color: "blue" }}>Register</h3>
                                    </div>
                                    <Formik enableReinitialize={true} initialValues={InitialValuesReg} validationSchema={RegValidationSchema} onSubmit={value => formHandlingAction(value)}>
                                        <Form method="post">
                                            <div className="form-group">
                                                <label>Name :</label>
                                                <div className="input-group">
                                                    <Field type="text" id="name" name="name" placeholder="Enter your name" className="form-control" autoComplete="off" />
                                                </div>
                                                <span style={{ color: "red" }}><ErrorMessage name="name" /></span>
                                            </div>
                                            <div className="form-group">
                                                <label>Email :</label>
                                                <div className="input-group">
                                                    <Field type="email" id="email" name="email" placeholder="Enter your email" className="form-control" autoComplete="off" />
                                                </div>
                                                <span style={{ color: "red" }}><ErrorMessage name="email" /></span>
                                            </div>
                                            <div className="form-group">
                                                <label>Password :</label>
                                                <div className="input-group">
                                                    <Field type="password" id="password" name="password" placeholder="Create password" className="form-control" autoComplete="off" />
                                                </div>
                                                <span style={{ color: "red" }}><ErrorMessage name="password" /></span>
                                            </div>

                                            <div className="form-group">
                                                <label> Confirm Password :</label>
                                                <div className="input-group">
                                                    <Field type="password" id="conpassword" name="conpassword" placeholder="Confirm your password" className="form-control" autoComplete="off" />
                                                </div>
                                                <span style={{ color: "red" }}><ErrorMessage name="conpassword" /></span>
                                            </div>
                                            <button type="submit" class="btn btn-md btn-primary col-lg-12">Register</button>
                                            <h5 class="mt-2 col-lg-12"> If you already have an account <Link to="/">Login here !</Link></h5>

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
export default Registration;