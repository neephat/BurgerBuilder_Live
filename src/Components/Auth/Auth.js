import React, { Component } from "react";
import { Formik } from "formik";
import { Button } from "reactstrap";
import { auth } from "../../redux/authActionCreators";
import { connect } from "react-redux";
import Spinner from "../Spinner/Spinner";
import { Alert } from "reactstrap";

const mapDispatchToProps = (dispatch) => {
    return {
        auth: (name, email, password, mode) =>
            dispatch(auth(name, email, password, mode)),
    };
};

const mapStateToProps = (state) => {
    return {
        authLoading: state.authLoading,
        authFailedMsg: state.authFailedMsg,
    };
};

class Auth extends Component {
    state = {
        mode: "Sign Up",
    };
    switchModeHandler = () => {
        this.setState({
            mode: this.state.mode === "Sign Up" ? "Login" : "Sign Up",
        });
    };
    render() {
        let err = null;
        if (this.props.authFailedMsg !== null) {
            err = <Alert color="danger">{this.props.authFailedMsg}</Alert>;
        }

        let form = null;
        if (this.props.authLoading) {
            form = <Spinner />;
        } else {
            form = (
                <Formik
                    initialValues={{
                        name: "",
                        email: "",
                        password: "",
                        passwordConfirm: "",
                    }}
                    onSubmit={(values) => {
                        this.props.auth(
                            values.name,
                            values.email,
                            values.password,
                            this.state.mode
                        );
                    }}
                    validate={(values) => {
                        const errors = {};
                        if (!values.name) {
                            errors.name = "Required";
                        }

                        if (!values.email) {
                            errors.email = "Required";
                        } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                                values.email
                            )
                        ) {
                            errors.email = "Invalid email address";
                        }

                        if (!values.password) {
                            errors.password = "Required";
                        } else if (values.password.length < 4) {
                            errors.password = "Must be atleast 4 characters";
                        }

                        if (this.state.mode === "Sign Up") {
                            if (!values.passwordConfirm) {
                                errors.passwordConfirm = "Required";
                            } else if (
                                values.password !== values.passwordConfirm
                            ) {
                                errors.passwordConfirm =
                                    "Password field does not match";
                            }
                        }
                        // console.log("Errors: ", errors);
                        return errors;
                    }}
                >
                    {({ values, handleChange, handleSubmit, errors }) => (
                        <div
                            style={{
                                border: "1px solid grey",
                                padding: "15px",
                                borderRadius: "7px",
                            }}
                        >
                            <button
                                style={{
                                    width: "100%",
                                    backgroundColor: "#d70f64",
                                    color: "white",
                                }}
                                className="btn btn-lg"
                                onClick={this.switchModeHandler}
                            >
                                Switch to{" "}
                                {this.state.mode === "Sign Up"
                                    ? "Login"
                                    : "Sign Up"}
                            </button>
                            <br />
                            <br />
                            <form onSubmit={handleSubmit}>
                                <input
                                    name="name"
                                    placeholder="Name"
                                    className="form-control"
                                    value={values.name}
                                    onChange={handleChange}
                                />
                                <br />
                                <input
                                    name="email"
                                    placeholder="Email"
                                    className="form-control"
                                    value={values.email}
                                    onChange={handleChange}
                                />
                                <span style={{ color: "red" }}>
                                    {errors.email}
                                </span>
                                <br />
                                <input
                                    name="password"
                                    placeholder="Password"
                                    className="form-control"
                                    value={values.password}
                                    onChange={handleChange}
                                />
                                <span style={{ color: "red" }}>
                                    {errors.password}
                                </span>
                                <br />
                                {this.state.mode === "Sign Up" ? (
                                    <div>
                                        <input
                                            name="passwordConfirm"
                                            placeholder="Confirm Password"
                                            className="form-control"
                                            value={values.passwordConfirm}
                                            onChange={handleChange}
                                        />
                                        <span style={{ color: "red" }}>
                                            {errors.passwordConfirm}
                                        </span>
                                        <br />
                                    </div>
                                ) : null}
                                <Button
                                    type="submit"
                                    className="btn btn-success"
                                >
                                    {this.state.mode === "Sign Up"
                                        ? "Sign Up"
                                        : "Login"}
                                </Button>
                            </form>
                        </div>
                    )}
                </Formik>
            );
        }
        return (
            <div>
                {err}
                {form}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);

//! -------- Original ---------------------

// import React, { Component } from "react";
// import { Formik } from "formik";
// import { Button } from "reactstrap";
// import { auth } from "../../redux/authActionCreators";
// import { connect } from "react-redux";
// import Spinner from "../Spinner/Spinner";
// import { Alert } from "reactstrap";

// const mapDispatchToProps = (dispatch) => {
//     return {
//         auth: (email, password, mode) => dispatch(auth(email, password, mode)),
//     };
// };

// const mapStateToProps = (state) => {
//     return {
//         authLoading: state.authLoading,
//         authFailedMsg: state.authFailedMsg,
//     };
// };

// class Auth extends Component {
//     state = {
//         mode: "Sign Up",
//     };
//     switchModeHandler = () => {
//         this.setState({
//             mode: this.state.mode === "Sign Up" ? "Login" : "Sign Up",
//         });
//     };
//     render() {
//         let err = null;
//         if (this.props.authFailedMsg !== null) {
//             err = <Alert color="danger">{this.props.authFailedMsg}</Alert>;
//         }

//         let form = null;
//         if (this.props.authLoading) {
//             form = <Spinner />;
//         } else {
//             form = (
//                 <Formik
//                     initialValues={{
//                         email: "",
//                         password: "",
//                         passwordConfirm: "",
//                     }}
//                     onSubmit={(values) => {
//                         this.props.auth(
//                             values.email,
//                             values.password,
//                             this.state.mode
//                         );
//                     }}
//                     validate={(values) => {
//                         const errors = {};

//                         if (!values.email) {
//                             errors.email = "Required";
//                         } else if (
//                             !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
//                                 values.email
//                             )
//                         ) {
//                             errors.email = "Invalid email address";
//                         }

//                         if (!values.password) {
//                             errors.password = "Required";
//                         } else if (values.password.length < 4) {
//                             errors.password = "Must be atleast 4 characters";
//                         }

//                         if (this.state.mode === "Sign Up") {
//                             if (!values.passwordConfirm) {
//                                 errors.passwordConfirm = "Required";
//                             } else if (
//                                 values.password !== values.passwordConfirm
//                             ) {
//                                 errors.passwordConfirm =
//                                     "Password field does not match";
//                             }
//                         }
//                         // console.log("Errors: ", errors);
//                         return errors;
//                     }}
//                 >
//                     {({ values, handleChange, handleSubmit, errors }) => (
//                         <div
//                             style={{
//                                 border: "1px solid grey",
//                                 padding: "15px",
//                                 borderRadius: "7px",
//                             }}
//                         >
//                             <button
//                                 style={{
//                                     width: "100%",
//                                     backgroundColor: "#d70f64",
//                                     color: "white",
//                                 }}
//                                 className="btn btn-lg"
//                                 onClick={this.switchModeHandler}
//                             >
//                                 Switch to{" "}
//                                 {this.state.mode === "Sign Up"
//                                     ? "Login"
//                                     : "Sign Up"}
//                             </button>
//                             <br />
//                             <br />
//                             <form onSubmit={handleSubmit}>
//                                 <input
//                                     name="email"
//                                     placeholder="Email"
//                                     className="form-control"
//                                     value={values.email}
//                                     onChange={handleChange}
//                                 />
//                                 <span style={{ color: "red" }}>
//                                     {errors.email}
//                                 </span>
//                                 <br />
//                                 <input
//                                     name="password"
//                                     placeholder="Password"
//                                     className="form-control"
//                                     value={values.password}
//                                     onChange={handleChange}
//                                 />
//                                 <span style={{ color: "red" }}>
//                                     {errors.password}
//                                 </span>
//                                 <br />
//                                 {this.state.mode === "Sign Up" ? (
//                                     <div>
//                                         <input
//                                             name="passwordConfirm"
//                                             placeholder="Confirm Password"
//                                             className="form-control"
//                                             value={values.passwordConfirm}
//                                             onChange={handleChange}
//                                         />
//                                         <span style={{ color: "red" }}>
//                                             {errors.passwordConfirm}
//                                         </span>
//                                         <br />
//                                     </div>
//                                 ) : null}
//                                 <Button
//                                     type="submit"
//                                     className="btn btn-success"
//                                 >
//                                     {this.state.mode === "Sign Up"
//                                         ? "Sign Up"
//                                         : "Login"}
//                                 </Button>
//                             </form>
//                         </div>
//                     )}
//                 </Formik>
//             );
//         }
//         return (
//             <div>
//                 {err}
//                 {form}
//             </div>
//         );
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Auth);
