import React , {useState,useEffect}  from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast,ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ProductList = () => {

// const Api_Server_Port = "http://localhost:8080/";

    const [Products , setproducts]  = useState([]);
    useEffect( () => {
           
     async function getProduct() {
 
         const response = await axios.get(process.env.REACT_APP_API_SERVER_PORT+"products");
        //  console.log(response.data.status);
         if(response.data.status === 200) {
        //  console.log(response.data.products);
         const productList = response.data.products;
         setproducts(productList);
 
         }
     } 
     getProduct();
 
    } , [] 
    
    );

    function deleteCustomer(id) {
      var confirmBox =   window.confirm(
            "Do you really want to delete this Product ?"
          )
          if (confirmBox === true) {
            async function delCustomer() {
                const response = await axios.delete(process.env.REACT_APP_API_SERVER_PORT+`products/delete-products/${id}`);
                if(response.data.status === 200) {
                    const response = await axios.get(process.env.REACT_APP_API_SERVER_PORT+'products');
                    // console.log(response.data);
                    if(response.data.status === 200) {
                    // console.log(response.data.products);
                    const productList = response.data.products;
                    setproducts(productList);
                toast.error('product deleted Successfully.' ,{position: toast.POSITION.TOP_CENTER} ,{autoClose:9000})

                    }
              
                }
            }
    
            delCustomer();
    
          } else {
              return false;
          }
    
    }

    return (
        <React.Fragment>

            <div className="row">
                <div className="col-lg-12">
                <ToastContainer style = {{marginTop:"10%", zIndex:999}} />  
                <div className="overview-wrap float-right">
                        <Link to="/addproduct" className="btn btn-info btn-md">
                            <i className="zmdi zmdi-plus"></i>add product</Link>
                    </div>
                    <h2 className="title-1 m-b-25 text-center">All Product List</h2>
                    <div className="table-responsive table--no-card m-b-40">
                        <table className="table table-borderless table-striped table-earning">
                            <thead>
                                
                            <tr>
                               <th>S.No.</th>
                               <th>Product ID</th>
                               <th>Product Name</th>
                               {/* <th>Product Image</th> */}
                               <th className="text-right">Product Price</th>
                               <th>View</th>
                                <th>Edit</th>
                                 <th>Delete</th>               
                                </tr>

                            </thead>
                            <tbody>
                             
                            {Products.map((Product,i) =>( 
                                <tr>
                                    <td>{(i++)+1}</td>  
                                     <td>{Product._id}</td>
                                     <td>{Product.name}</td>
                                     {/* <td>{(Product.productImage  ? <img src= {Api_Server_Port+Product.productImage} alt="product image"/> : <span style={{ color: 'red' }}>NULL</span>)}</td> */}
                                     <td className="text-right">{Product.price}/Rs.</td>
                                    <td><button type="reset" className="btn btn-warning btn-sm">
                                    <i className="fa fa-eye"></i> view
                                        </button>
                                        </td>
                                    <td>
                                        <Link to= {"/editproduct/"+Product._id} params={Product._id}  className="btn btn-info btn-sm">
                                            <i className="fa fa-pencil-square-o"></i>edit</Link>
                                            </td>   
                                    <td><button type="button" className="btn btn-danger btn-sm" onClick={(e)=>deleteCustomer(Product._id)}  >
                                            <i className="fa fa-times-circle-o"></i> delete
                                        </button></td>
                                </tr>

                               ) )}

                            </tbody>
                        </table>
                    </div>
                </div>

            </div>

        </React.Fragment>
    );
}
export default ProductList;
