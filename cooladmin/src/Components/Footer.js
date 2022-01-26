import React ,{useEffect} from "react";
import {useHistory } from "react-router-dom";

const Footer = () => {

    const history = useHistory();
    useEffect(() => {
        const userAuthData_ID = localStorage.getItem("_id");
        if (userAuthData_ID==null ||userAuthData_ID=='') {
            history.push('/');
        }

    },[]);
    const loginDate = localStorage.getItem("login_date");
    const d = new Date();
    d.getFullYear();

    return(
    <React.Fragment>
               <div class="row">
                            <div class="col-md-12">
                                <div class="copyright">
                                    <h5>Last Login Time: {loginDate} </h5>
                                    <p>Copyright © {d.getFullYear()} Colorlib. All rights reserved. Template by .</p>
                                </div>
                            </div>
                        </div>
    </React.Fragment>
    );
}

export default Footer;