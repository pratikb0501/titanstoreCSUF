import { skipToken } from "@reduxjs/toolkit/query";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Filler
} from "chart.js";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { useGetLineStatsQuery } from "../redux/reducers/dashboard/dashboardApi";
import { UserReducerInitState } from "../redux/reducers/user/userTypes";
import { getLastTwelveMonths, TITANBLUE, TITANORANGE } from "../utils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function AdminLineChart() {
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitState }) => state.userReducer
  );
  const { data } = useGetLineStatsQuery(user?._id ? user._id : skipToken);
  const [discounts, setDiscounts] = useState<number[]>([]);
  const [products, setProducts] = useState<number[]>([]);
  const [revenue, setRevenue] = useState<number[]>([]);
  const [users, setUsers] = useState<number[]>([]);
  const twelveMonthsList = getLastTwelveMonths();

  useEffect(() => {
    if (data) {
      setDiscounts(data.lineChart.discount);
      setProducts(data.lineChart.products);
      setRevenue(data.lineChart.revenue);
      setUsers(data.lineChart.users);
    }
  }, [data]);

  return (
    <section className="line-container">
      <div>
        <Line
          data={{
            labels: twelveMonthsList,
            datasets: [
              {
                label: "Discount",
                data: discounts,
                borderColor: TITANORANGE,
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                fill: false,
              },
              {
                label: "Revenue",
                data: revenue,
                borderColor: TITANBLUE,
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                fill: true,
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: true,
                text: "Monthly Discount and Revenue Overview",
              },
            },
          }}
        />
      </div>
      <div>
        <Line
          data={{
            labels: twelveMonthsList,
            datasets: [
              {
                label: "Users",
                data: users,
                borderColor: TITANORANGE,
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                fill: false,
              },
              {
                label: "Products",
                data: products,
                borderColor: TITANBLUE,
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                fill: true,
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: true,
                text: "Monthly Users and Products Overview",
              },
            },
          }}
        />
      </div>
    </section>
  );
}

export default AdminLineChart;
