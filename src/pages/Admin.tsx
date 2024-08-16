import { useSelector } from "react-redux";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { UserReducerInitState } from "../redux/reducers/user/userTypes";
import { useEffect } from "react";

function Admin() {
  const tabName = useLocation().pathname.split("/")[2];
  const navigate = useNavigate();
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitState }) => state.userReducer
  );

  useEffect(() => {
    if (user && user.role == "user") {
      navigate("/login");
    }
  }, [user]);

  return (
    <div className="admin-container">
      <div className="admin-left">
        <div className="tab-container">
          <p className="tab-title">General</p>
          <div className="tab-content">
            <ul>
              <Link to="products">
                <li className={tabName === "products" ? "selected" : ""}>
                  Products
                </li>
              </Link>
              <Link to="customers">
                <li className={tabName === "customers" ? "selected" : ""}>
                  Customers
                </li>
              </Link>
              <Link to="transactions">
                <li className={tabName === "transactions" ? "selected" : ""}>
                  Transactions
                </li>
              </Link>
              <Link to="coupons">
                <li className={tabName === "coupons" ? "selected" : ""}>
                  Coupons
                </li>
              </Link>
            </ul>
          </div>
        </div>
        <div className="tab-container">
          <p className="tab-title">Statistics</p>
          <div className="tab-content">
            <ul>
              <Link to="overview">
                <li className={tabName === "overview" ? "selected" : ""}>
                  Overview
                </li>
              </Link>
              <Link to="line">
                <li className={tabName === "line" ? "selected" : ""}>
                  Line Chart
                </li>
              </Link>
              <Link to="bar">
                <li className={tabName === "bar" ? "selected" : ""}>
                  Bar Chart
                </li>
              </Link>
              <Link to="pie">
                <li className={tabName === "pie" ? "selected" : ""}>
                  Pie Chart
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
      <div className="void"></div>
      <div className="admin-right">
        <Outlet />
      </div>
    </div>
  );
}

export default Admin;
