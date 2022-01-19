import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <React.Fragment>
            <aside className="menu-sidebar d-none d-lg-block">
                <div className="logo">
                    <Link to="/">
                        {/* <img src="images/icon/logo.png" alt="Cool Admin" /> */}
                        <h3>{process.env.REACT_APP_MY_PROJECT_LOGO_NAME} </h3>
                    </Link>
                </div>
                <div className="menu-sidebar__content js-scrollbar1">
                    <nav className="navbar-sidebar">
                        <ul className="list-unstyled navbar__list">
                            <li className="active has-sub">
                                <Link className="js-arrow" to="">
                                    <i className="fas fa-tachometer-alt"></i>Dashboard  </Link>

                            </li>
                            <li>
                                <Link to="/productlist">
                                    <i className="fas fa-chart-bar"></i>Product List</Link>
                            </li>
                            <li>
                                <Link to="/addproduct">
                                    <i className="fas fa-table"></i>Add New Product</Link>
                            </li>
                            <li>
                                <Link to="/orderlist">
                                    <i className="fas fa-chart-bar"></i>Order List</Link>
                            </li>

                            <li>
                                <Link to="/addorder">
                                    <i className="fas fa-table"></i>Add New Order</Link>
                            </li>


                        </ul>
                    </nav>
                </div>
            </aside>
        </React.Fragment>
    );
}
export default Sidebar;