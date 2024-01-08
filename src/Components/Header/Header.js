import React from "react";
import { Navbar, NavbarBrand, Nav, NavItem } from "reactstrap";
import "./Header.css";
import Logo from "../../assets/logo.png";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
    return {
        token: state.token,
    };
};

const Header = (props) => {
    let links = null;
    if (props.token === null) {
        links = (
            <Nav className="mr-md-5">
                <NavItem>
                    <NavLink to="/login" className="Navlink fw-bold">
                        Login
                    </NavLink>
                </NavItem>
            </Nav>
        );
    } else {
        links = (
            <Nav className="me-md-2">
                <NavItem className="ms-4">
                    <NavLink to="/" className="Navlink fw-bold">
                        BurgerBuilder
                    </NavLink>
                </NavItem>
                <NavItem className="ms-4">
                    <NavLink to="/order" className="Navlink fw-bold">
                        Orders
                    </NavLink>
                </NavItem>
                <NavItem className="ms-4">
                    <NavLink to="/checkout" className="Navlink fw-bold">
                        Checkout
                    </NavLink>
                </NavItem>
                <NavItem className="ms-4">
                    <NavLink to="/logout" className="Navlink fw-bold">
                        Logout
                    </NavLink>
                </NavItem>
            </Nav>
        );
    }
    return (
        <div className="Navigation">
            <Navbar
                style={{
                    backgroundColor: "#d70f64",
                    paddingLeft: "60px",
                    paddingRight: "60px"
                }}
            >
                <NavbarBrand href="/" className="mr-auto ml-md-5">
                    <img src={Logo} className="" alt="Logo" width="80px" />
                </NavbarBrand>
                {links}
            </Navbar>
        </div>
    );
};

export default connect(mapStateToProps)(Header);
