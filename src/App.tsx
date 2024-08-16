import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./app.scss";
import AdminCoupon from "./components/AdminCoupon";
import AdminTransactions from "./components/AdminTransactions";
import { auth } from "./components/Firebase";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ProductDetails from "./components/ProductDetails";
import Admin from "./pages/Admin";
import AdminBarChart from "./pages/AdminBarChart";
import AdminCustomers from "./pages/AdminCustomers";
import AdminLineChart from "./pages/AdminLineChart";
import AdminPieChart from "./pages/AdminPieChart";
import AdminProducts from "./pages/AdminProducts";
import AdminStatsOverview from "./pages/AdminStatsOverview";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import DisplayAllProducts from "./pages/DisplayAllProducts";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import MyOrders from "./pages/MyOrders";
import NotFound from "./pages/NotFound";
import Shipping from "./pages/Shipping";
import { getUserById } from "./redux/reducers/user/userApi";
import { userDoesNotExist, userExist } from "./redux/reducers/user/userReducer";

// const Footer = lazy(() => import("./components/Footer"));
// const Navbar = lazy(() => import("./components/Navbar"));
// const Homepage = lazy(() => import("./pages/Homepage"));
// const Login = lazy(() => import("./pages/Login"));
// const Register = lazy(() => import("./pages/Register"));
// const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  const dispatch = useDispatch();
  // const { user, loading } = useSelector(
  //   (state: { userReducer: UserReducerInitState }) => state.userReducer
  // );

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const currentUser = await getUserById(user.uid);
        dispatch(userExist(currentUser.user));
      } else {
        console.log("Not logged in");
        dispatch(userDoesNotExist());
      }
    });
  }, []);

  return (
    <BrowserRouter>
      <div className="main-container">
        <div className="main-content">
          <Navbar />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            {/* <Route
              path="register"
              element={
                  <Register />
              }
            /> */}
            <Route path="/products">
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route
                path="all"
                element={<DisplayAllProducts categoryProp="" />}
              />
              <Route
                path="tshirts"
                element={<DisplayAllProducts categoryProp="tshirts" />}
              />
              <Route
                path="sweatshirts"
                element={<DisplayAllProducts categoryProp="sweatshirts" />}
              />
              <Route
                path="jackets"
                element={<DisplayAllProducts categoryProp="jackets" />}
              />
              <Route
                path="jerseys"
                element={<DisplayAllProducts categoryProp="jerseys" />}
              />
              <Route
                path="merchandise"
                element={<DisplayAllProducts categoryProp="merchandise" />}
              />
              <Route
                path="electronics"
                element={<DisplayAllProducts categoryProp="electronics" />}
              />
              <Route
                path="frames"
                element={<DisplayAllProducts categoryProp="frames" />}
              />
              <Route
                path="uscape"
                element={<DisplayAllProducts categoryProp="uscape" />}
              />
              <Route
                path="vintage"
                element={<DisplayAllProducts categoryProp="vintage" />}
              />
            </Route>

            <Route path="/cart" element={<Cart />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/pay" element={<Checkout />} />
            <Route path="/myorders" element={<MyOrders />} />

            <Route path="/admin" element={<Admin />}>
              <Route path="products" element={<AdminProducts />} />
              <Route path="customers" element={<AdminCustomers />} />
              <Route path="transactions" element={<AdminTransactions />} />
              <Route path="coupons" element={<AdminCoupon />} />
              <Route path="line" element={<AdminLineChart />} />
              <Route path="overview" element={<AdminStatsOverview />} />
              <Route path="bar" element={<AdminBarChart />} />
              <Route path="pie" element={<AdminPieChart />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <div className="main-footer">
          <Footer
            title="Created By:"
            subtitle="Pratik S. Bagmare"
            link="https://www.linkedin.com/in/pratikbagmare/"
          />
        </div>
        <ToastContainer position="bottom-right" />
      </div>
    </BrowserRouter>
  );
}

export default App;
