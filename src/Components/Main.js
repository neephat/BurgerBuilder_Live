import BurgerBuilder from "./BurgerBuilder/BurgerBuilder";
import Header from "./Header/Header";
import { Route, Routes } from "react-router-dom";
import Order from "./Order/Order";
import Checkout from "./Order/Checkout/Checkout.js";
import Auth from "./Auth/Auth";
import { connect } from "react-redux";
import { authCheck } from "../redux/authActionCreators";
import { Component } from "react";
import Logout from "./Auth/Logout";

const mapStateToProps = (state) => {
    return {
        token: state.token,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        authCheck: () => dispatch(authCheck()),
    };
};

class Main extends Component {
    componentDidMount() {
        this.props.authCheck();
    }
    render() {
        let routes = null;

        // const navigate = useNavigate();
        // useEffect(() => {
        //     // Perform navigation based on the token value
        //     if (props.token === null) {
        //         navigate("/login");
        //     } else {
        //         navigate("/");
        //     }
        // }, [props.token, navigate]);

        // const history = useHistory();
        // useEffect(() => {
        //     // Perform navigation based on the token value
        //     if (props.token === null) {
        //         history.push("/login");
        //     } else {
        //         history.push("/");
        //     }
        // }, [props.token, history]);

        if (this.props.token === null) {
            routes = (
                <Routes>
                    <Route path="/login" element={<Auth />}></Route>
                    <Route path="/" element={<Auth />}></Route>
                </Routes>
            );
        } else {
            routes = (
                <Routes>
                    <Route path="*" element={<BurgerBuilder />}></Route>
                    <Route path="/order" element={<Order />}></Route>
                    <Route path="/checkout" element={<Checkout />}></Route>
                    <Route path="/logout" element={<Logout />}></Route>
                    {/* <Route path="*" element={<Auth />}></Route> */}
                </Routes>
            );
        }
        return (
            <div>
                <Header />
                <div className="container">{routes}</div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
