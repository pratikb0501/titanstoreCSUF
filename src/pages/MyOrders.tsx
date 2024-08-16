import { skipToken } from "@reduxjs/toolkit/query";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Fallback from "../components/Fallback";
import { useMyOrdersQuery } from "../redux/reducers/order/orderApi";
import { OrderResponse } from "../redux/reducers/order/orderTypes";
import { UserReducerInitState } from "../redux/reducers/user/userTypes";

function MyOrders() {
  // const navigate = useNavigate();
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitState }) => state.userReducer
  );
  const { data,isLoading,isSuccess,isError } = useMyOrdersQuery(user?._id! ? user._id : skipToken);
  const [myOrders, setMyOrders] = useState<OrderResponse[]>([]);

  // useEffect(()=>{
  //   if(!user){
  //     navigate('/login');
  //   }
  // },[user])

  useEffect(() => {
    if (data) {
      setMyOrders(data.myOrders);
    }
  }, [data]);

  if(isLoading){
    return <Fallback />
  }

  if(isError){
    toast.error("Error occured")
  }

  if(isSuccess){
    return (
      <section className="myOrders-container">
        <div className="myOrders-title">
          <p>My Orders</p>
        </div>
        <div className="myOrder-details">
          <table className="myOrders-table">
            <thead>
              <tr>
                <th>Date</th>
                <th className="orderedItems-row">Ordered Items</th>
                <th>Subtotal</th>
                <th>Tax</th>
                <th>Discount</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {myOrders?.map((order) => {
                const dateObject = new Date(order.createdAt);
                const year = dateObject.getUTCFullYear();
                const month = dateObject.getUTCMonth() + 1;
                const day = dateObject.getUTCDate();
                return (
                  <tr key={order._id}>
                    <td>{`${month}/${day}/${year}`}</td>
                    <table className="myOrder-items">
                      {order.orderedItems?.map((item) => {
                        return (
                          <tr>
                            <td className="myOrder-img">
                              <img src={`${import.meta.env.VITE_API_SERVER_PHOTO_URL}/${item.photo}`} alt={item.name} />
                            </td>
                            <td>{item.name}</td>
                          </tr>
                        );
                      })}
                    </table>
                    <td>$ {order.subtotal}</td>
                    <td>$ {order.tax}</td>
                    <td>$ {order.discount}</td>
                    <td>$ {order.total}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    );
  }

}

export default MyOrders;
