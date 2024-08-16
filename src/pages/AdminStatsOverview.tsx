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
import { Bar, Chart, Doughnut } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Fallback from "../components/Fallback";
import { useGetDashboardStatsQuery } from "../redux/reducers/dashboard/dashboardApi";
import { LatestTransaction } from "../redux/reducers/dashboard/dashboardTypes";
import { UserReducerInitState } from "../redux/reducers/user/userTypes";
import { getLastSixMonths, TITANBLUE, TITANORANGE } from "../utils";

function AdminStatsOverview() {
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitState }) => state.userReducer
  );
  const { data, isLoading, isError, isSuccess } = useGetDashboardStatsQuery(
    user?._id ? user._id : skipToken
  );
  const [transactCount, setTransactCount] = useState<number[]>([]);
  const [revenueCount, setRevenueCount] = useState<number[]>([]);
  const [categoryCount, setCategoryCount] = useState<Record<string, number>[]>(
    []
  );
  const [transaction, setTransaction] = useState<LatestTransaction[]>([]);
  const [userRatio, setUserRatio] = useState({
    male: 0,
    female: 0,
  });
  const [countChange, setCountChange] = useState<Record<string, number>[]>([]);
  const [percentChange, setPercentChange] = useState<Record<string, number>[]>([]);

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
      setRevenueCount(data?.dashboardStats?.stats?.chart?.revenue);
      setTransactCount(data?.dashboardStats?.stats?.chart?.order);
      setUserRatio(data?.dashboardStats?.stats?.userRatio);
      setCategoryCount(data?.dashboardStats?.stats?.categoryCount);
      setTransaction(data?.dashboardStats?.stats?.latestTransaction);
      setCountChange(data?.dashboardStats?.stats?.counts);
      setPercentChange(data?.dashboardStats?.stats?.percentChange)
    }
  }, [data]);



  if (isLoading) {
    return <Fallback />;
  }

  if (isError) {
    toast.error("Failed ! Try again later!");
  }

  if (isSuccess) {
    return (
      <section className="overview-container">
        <div className="change-stats">
          <Chart
            type="bar"
            data={{
              labels: Object.keys(percentChange),
              datasets: [
                {
                  type: "line",
                  label: "Percent Change",
                  data: Object.values(percentChange),
                  borderColor: TITANORANGE,
                },
                {
                  type: "bar",
                  label: "Count",
                  data: Object.values(countChange),
                  backgroundColor: TITANBLUE,
                  borderColor: "rgba(153, 102, 255, 1)",
                },
              ],
            }}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: "Monthly Count and Percentage Change: Current vs. Previous Month",
                  align: "center",
                },
              },
              scales: {
                y: {
                  title: {
                    display: true,
                    text: "Count/Percent",
                  },
                },
              },
            }}
          />
        </div>
        <div className="revenue">
          <Bar
            options={{
              plugins: {
                title: {
                  display: true,
                  text: "Last six months sales and revenue",
                  align: "center",
                },
              },
              scales: {
                x: {
                  title: {
                    display: true,
                    text: "Month",
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: "Percent",
                  },
                },
              },
            }}
            data={{
              labels: getLastSixMonths(),
              datasets: [
                {
                  label: "Revenue",
                  data: revenueCount,
                  backgroundColor: TITANBLUE,
                },
                {
                  label: "Trasaction",
                  data: transactCount,
                  backgroundColor: TITANORANGE,
                },
              ],
            }}
          />
        </div>
        <div className="circle-charts">
          <div className="doughnut">
            <Doughnut
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: "Gender Ratio",
                    align: "center",
                  },
                },
                // cutout:100
              }}
              data={{
                labels: ["Male", "Female"],
                datasets: [
                  {
                    label: "Gender Ratio",
                    data: [userRatio.male, userRatio.female],
                    backgroundColor: [TITANBLUE, TITANORANGE],
                  },
                ],
              }}
            />
          </div>
          <div className="inventory">
            <Bar
              options={{
                indexAxis: "y",
                plugins: {
                  title: {
                    display: true,
                    text: "Distribution of Inventory",
                    align: "center",
                  },
                },
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: "Percentage",
                    },
                  },
                  y: {
                    title: {
                      display: true,
                      text: "Category",
                    },
                  },
                },
              }}
              data={{
                labels: categoryCount.map((cat) => Object.keys(cat)).flat(),
                datasets: [
                  {
                    label: "Category",
                    data: categoryCount.map((cat) => Object.values(cat)).flat(),
                    backgroundColor: TITANORANGE,
                  },
                ],
              }}
            />
          </div>
        </div>
        <div className="transactions">
          <h2>Top Transactions</h2>
          {!transaction.length && <div>No Transactions available</div>}
          {transaction.length && (
            <table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Quantity</th>
                  <th>Discount</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {transaction.map((item) => (
                  <tr key={item._id}>
                    <td>{item._id}</td>
                    <td>{item.quantity}</td>
                    <td>$ {item.discount}</td>
                    <td>$ {item.amount}</td>
                    <td className={item.status}>{item.status}</td>
                  </tr>
                ))}
              </tbody>
              <thead></thead>
            </table>
          )}
        </div>
      </section>
    );
  }
}

export default AdminStatsOverview;
