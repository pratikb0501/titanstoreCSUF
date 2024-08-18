import { signOut } from "firebase/auth";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import cart from "../assets/cart.svg";
import titanLogo from "../assets/logo.svg";
import { CartReducerInitialState } from "../redux/reducers/cart/cartTypes";
import { UserReducerInitState } from "../redux/reducers/user/userTypes";
import { auth } from "./Firebase";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  // const paths = new Set(["/login"])
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitState }) => state.userReducer
  );
  const { cartItems } = useSelector(
    (state: { cartReducer: CartReducerInitialState }) => state.cartReducer
  );

  const logoutHandler = async () => {
    try {
      await signOut(auth);
      toast.success("Signed Out Successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Failed to Sign out");
    }
  };

  return (
    <nav className="navbar">
      <Link to="/">
        <div className="nav-left">
          <img src={titanLogo} alt="titan_logo" />
        </div>
      </Link>
      <div className="nav-right">
        <Link to="/cart">
          <div className="cart">
            {cartItems && cartItems.length > 0 && (
              <div className="cart-quantity">
                <div>{cartItems.length > 10 ? "10+" : cartItems.length}</div>
              </div>
            )}
            <img src={cart} className="cart-img" alt="cart_logo" />
          </div>
        </Link>
        <Link to="/login">
          {location.pathname != "/login" && !user && (
            <div className="nav-right-fonts">Login</div>
          )}
        </Link>
        {/* <Link to="/register">
          {location.pathname != "/register" && (
            <div className="nav-right-fonts">Register</div>
          )}
        </Link> */}
        {user?.role == "admin" && (
          <Link to="/admin/products">
            <div className="nav-right-fonts">Dashboard</div>
          </Link>
        )}
        {user?.role == "user" && (
          <Link to="/myorders">
            <div className="nav-right-fonts">My Orders</div>
          </Link>
        )}
        {user && (
          <div className="nav-right-fonts" onClick={logoutHandler}>
            Logout
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
