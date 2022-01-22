import React from "react";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const Login = () => {
const initialLoginValue = {
    email:'',
    password:''
}

const LogValidationSchema = Yup.object({
    email: Yup.string().email("Please enter valid email.").required("Email must be require."),
    password: Yup.string().max(15, 'Password should be 6-15 charecter long.').min(6, 'Password should be 6-15 charecter long.').required("Password must be require."),


});

const formHandlingAction = (value)=> {
console.log(value);
}

    return (
        <>
            <div className="page-wrapper">
                <div className="page-container">
                    <div className="container-fluid">

                        <div class="col-lg-2"></div>
                        <div class="col-lg-8 mt-4">
                            <div class="card">
                                <div class="card-header">Please Login here !</div>
                                <div class="card-body">
                                    <div class="card-title">
                                        <h3 class="text-center title-2" style={{ color: "blue" }}>LOGIN</h3>
                                    </div>
                                    <Formik enableReinitialize={true} initialValues={initialLoginValue} validationSchema= {LogValidationSchema} onSubmit={value => formHandlingAction(value)} >
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
                                                    <Field type="password" id="password" name="password" placeholder="Enter your name" className="form-control" autoComplete="off" />
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