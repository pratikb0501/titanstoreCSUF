import { skipToken } from "@reduxjs/toolkit/query";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetPieStatsQuery } from "../redux/reducers/dashboard/dashboardApi";
import { UserReducerInitState } from "../redux/reducers/user/userTypes";
import {
  ArcElement,
  CategoryScale,
  Chart as chartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import {
  OrderFullFillment,
  StockAvailability,
  userAgeDistribution,
  UserDistribution,
} from "../redux/reducers/dashboard/dashboardTypes";
import Fallback from "../components/Fallback";
import { TITANBLUE, TITANORANGE } from "../utils";

function AdminPieChart() {
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitState }) => state.userReducer
  );
  const { data, isLoading, isSuccess } = useGetPieStatsQuery(
    user?._id ? user._id : skipToken
  );
  const [orderFullFillment, setOrderFullFillment] = useState<OrderFullFillment>(
    {
      delivered: 0,
      processing: 0,
      shipped: 0,
    }
  );

  const [userDistribution, setUserDistribution] = useState<UserDistribution>({
    admin: 0,
    customer: 0,
  });
  const [stock, setStock] = useState<StockAvailability>({
    inStock: 0,
    outOfStock: 0,
  });
  const [ageDistribution, setAgeDistribution] = useState<userAgeDistribution>({
    teen: 0,
    adult: 0,
    old: 0,
  });
  const [revenue, setRevenue] = useState({
    discount: 0,
    marketingCost: 0,
    netMargin: 0,
    shippingCost: 0,
    tax: 0,
  });
  chartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
  );
  useEffect(() => {
    if (data) {
      setOrderFullFillment(data.pieCharts.orderFullFillment);
      setUserDistribution(data.pieCharts.adminCustomer);
      setStock(data.pieCharts.stockAvailability);
      setAgeDistribution(data.pieCharts.usersAgeGroup);
      setRevenue(data.pieCharts.revenueDistribution);
    }
  }, [data]);

  if (isLoading) {
    return <Fallback />;
  }

  if (isSuccess) {
    return (
      <section>
        <div className="pie-container">
          <div>
            <Pie
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: "Order Status",
                    align: "center",
                  },
                },
                // cutout:100
              }}
              data={{
                labels: Object.keys(orderFullFillment),
                datasets: [
                  {
                    label: "Order status",
                    data: Object.values(orderFullFillment),
                    backgroundColor: ["red", "#f7941f", "green"],
                    borderColor: ["red", "#f7941f", "green"],
                  },
                ],
              }}
            />
          </div>
          <div>
            <Pie
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: "User Distribution",
                    align: "center",
                  },
                },
              }}
              data={{
                labels: Object.keys(userDistribution),
                datasets: [
                  {
                    label: "User",
                    data: Object.values(userDistribution),
                    backgroundColor: [TITANBLUE, TITANORANGE],
                    borderColor: [TITANBLUE, TITANORANGE],
                  },
                ],
              }}
            />
          </div>
          <div>
            <Pie
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: "Stock Status",
                    align: "center",
                  },
                },
                // cutout:100
              }}
              data={{
                labels: ["Out of Stock","In Stock"],
                datasets: [
                  {
                    label: "Stock",
                    data: Object.values(stock),
                    backgroundColor: ["red", "green"],
                    borderColor: ["red", "green"],
                  },
                ],
              }}
            />
          </div>
          <div>
            <Pie
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: "Customer Age Group",
                    align: "center",
                  },
                },
                // cutout:100
              }}
              data={{
                labels: Object.keys(ageDistribution),
                datasets: [
                  {
                    label: "Customer Age Group",
                    data: Object.values(ageDistribution),
                    backgroundColor: ["red", "#f7941f", "green"],
                    borderColor: ["red", "#f7941f", "green"],
                  },
                ],
              }}
            />
          </div>
          <div>
            <Pie
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: "Revenue Distibution",
                    align: "center",
                  },
                },
                // cutout:100
              }}
              data={{
                labels: Object.keys(revenue),
                datasets: [
                  {
                    label: "Revenue",
                    data: Object.values(revenue),
                    backgroundColor: ["red", TITANORANGE, "green",TITANBLUE,"grey"],
                    borderColor: ["red", TITANORANGE, "green",TITANBLUE,"grey"],
                  },
                ],
              }}
            />
          </div>
        </div>
        {/* </div> */}
      </section>
    );
  }
}

export default AdminPieChart;
