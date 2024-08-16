import { skipToken } from "@reduxjs/toolkit/query";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as chartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { useGetBarStatsQuery } from "../redux/reducers/dashboard/dashboardApi";
import { UserReducerInitState } from "../redux/reducers/user/userTypes";
import {
  getLastSixMonths,
  getLastTwelveMonths,
  TITANBLUE,
  TITANORANGE,
} from "../utils";
import Fallback from "../components/Fallback";
import { toast } from "react-toastify";

function AdminBarChart() {
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitState }) => state.userReducer
  );
  const { data, isLoading, isSuccess, isError } = useGetBarStatsQuery(
    user?._id ? user._id : skipToken
  );
  const [orders, setOrders] = useState<number[]>([]);
  const [products, setProducts] = useState<number[]>([]);
  const [users, setUsers] = useState<number[]>([]);

  chartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
  );

  useEffect(() => {
    if (data) {
      setOrders(data.barChart.orders);
      setUsers(data.barChart.users);
      setProducts(data.barChart.products);
    }
  }, [data]);

  const SCALES = {
    x: {
      title: {
        display: true,
        text: "Month",
      },
    },
    y: {
      title: {
        display: true,
        text: "Count",
      },
    },
  };

  if (isLoading) {
    return <Fallback />;
  }

  if (isError) {
    toast.error("Error Occured ! Try Later");
  }

  if (isSuccess) {
    return (
      <section className="bar-container">
        <div>
          <Bar
            options={{
              plugins: {
                title: {
                  display: true,
                  text: "Users and products in last six months",
                  align: "center",
                },
              },
              scales: SCALES,
            }}
            data={{
              labels: getLastSixMonths(),
              datasets: [
                {
                  label: "Products",
                  data: products,
                  backgroundColor: TITANBLUE,
                },
                {
                  label: "Users",
                  data: users,
                  backgroundColor: TITANORANGE,
                },
              ],
            }}
          />
        </div>
        <div>
          <Bar
            options={{
              plugins: {
                title: {
                  display: true,
                  text: "Orders in last twelve months",
                  align: "center",
                },
              },
              scales: SCALES,
            }}
            data={{
              labels: getLastTwelveMonths(),
              datasets: [
                {
                  label: "Orders",
                  data: orders,
                  backgroundColor: TITANBLUE,
                },
              ],
            }}
          />
        </div>
      </section>
    );
  }
}

export default AdminBarChart;
