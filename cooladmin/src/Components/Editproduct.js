import React ,{useState,useEffect} from "react";
import { useParams } from 'react-router-dom';
// import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
// import { toast,ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const Editproduct = () => {

    const { id } = useParams();
const [productD , setproductD] = useState([]);

  useEffect( () => {
      async function getProductByID() {
          const response = await axios.get(`http://localhost:8080/products/${id}`);
        //   console.log(response.data);
        if(response.data.status===200) {
        //   console.log(response.data.products);
           const productDataById = response.data.products;
           setproductD(productDataById);
//   console.log("inside "+productD.name);



        } else {

            console.log(response);

        }
      }
      getProductByID();

  },[]

  );
//   console.log("outside "+productD.name);

const pname =  productD.name;
const pprice =  productD.price;
const initialData = {
    // productD.map
    name: pname,
    price:pprice,
}


const validateData = Yup.object({
    name: Yup.string().max(30, 'Must be 15 characters or less').required("Product name must be required."),
    price: Yup.number().typeError('Please enter valid amount.').required("Price  must be required"),
    // password: Yup.string().required("Password must be required.").max(12, "Password should be less than or eqal to 12 char.")
})

const formSubmitAction = (values) => {
console.log(values);
}
return (
        <React.Fragment>
            <div className="col-lg-12">
          
                <div className="card">
                 {/* <ToastContainer style = {{marginTop:"10%", zIndex:999}} />    */}
                    <div className="card-header text-center">Edit Product {id}</div>
                    <div className="card-body card-block">
                       <Formik initialValues={initialData} onSubmit={value=>{formSubmitAction(value)}} validationSchema={validateData}>
                       <Form action="" method="post" className="" >
                        
                       <div className="form-group">
                                    <div className="input-group">
                                        <Field type="text" id="name" name="name" placeholder="Product Name" className="form-control"  autoComplete="off" />
                                    </div>
                                    <span style={{ color: "red" }}> <ErrorMessage name = "name"/></span>
                                    </div>

                                    <div className="form-group">
                                    <div className="input-group">
                                        <Field type="text" id="price" name="price" placeholder="Product price (in Rupees)" className="form-control"  autoComplete="off" />
                                    </div>
                                    <span style={{ color: "red" }}> <ErrorMessage name = "price"/></span>
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


