import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
    <React.Fragment>
        <header class="header-desktop">
                <div class="section__content section__content--p30">
                    <div class="container-fluid">
                        <div class="header-wrap">
                            <form class="form-header" action="" method="POST">
                                <input class="au-input au-input--xl" type="text" name="search" placeholder="Search for datas &amp; reports..." />
                                <button class="au-btn--submit" type="submit">
                                    <i class="zmdi zmdi-search"></i>
                                </button>
                            </form>
                            <div class="header-button float-right">
                                <div class="noti-wrap">
                                   
                                   
                                </div>
                                <div class="account-wrap">
                                    <div class="account-item clearfix js-item-menu">
                                        <div class="image">
                                            <img src="images/icon/avatar-01.jpg" alt="John Doe" />
                                        </div>
                                        <div class="content">
                                            <Link class="js-acc-btn" to="">john doe</Link>
                                        </div>
                                        <div class="account-dropdown js-dropdown">
                                            <div class="info clearfix">
                                                <div class="image">
                                                    <Link to="">
                                                        <img src="images/icon/avatar-01.jpg" alt="John Doe" />
                                                    </Link>
                                                </div>
                                                <div class="content">
                                                    <h5 class="name">
                                                        <Link to="">john doe</Link>
                                                    </h5>
                                                    <span class="email">johndoe@example.com</span>
                                                </div>
                                            </div>
                                            <div class="account-dropdown__body">
                                                <div class="account-dropdown__item">
                                                    <Link to="">
                                                        <i class="zmdi zmdi-account"></i>Account</Link>
                                                </div>
                                                <div class="account-dropdown__item">
                                                    <Link to="">
                                                        <i class="zmdi zmdi-settings"></i>Setting</Link>
                                                </div>
                                                <div class="account-dropdown__item">
                                                    <Link to="">
                                                        <i class="zmdi zmdi-money-box"></i>Billing</Link>
                                                </div>
                                            </div>
                                            <div class="account-dropdown__footer">
                                                <Link to="">
                                                    <i class="zmdi zmdi-power"></i>Logout</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
    </React.Fragment>
    );
}
export default Header;
