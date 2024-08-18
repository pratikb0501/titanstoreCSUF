import { skipToken } from "@reduxjs/toolkit/query";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import viewLogo from "../assets/view.svg";
import {
  useAllOrdersQuery,
  useUpdateOrderStatusMutation,
} from "../redux/reducers/order/orderApi";
import { OrderResponse } from "../redux/reducers/order/orderTypes";
import { UserReducerInitState } from "../redux/reducers/user/userTypes";
import Fallback from "./Fallback";

function AdminTransactions() {
  const adminId = useSelector(
    (state: { userReducer: UserReducerInitState }) =>
      state.userReducer.user?._id
  );
  const { data, isLoading, isError, isSuccess } = useAllOrdersQuery(
    adminId ?? skipToken
  );
  const [transactionsList, setTransactionsList] = useState<OrderResponse[]>([]);
  const [isViewDetails, setIsViewDetails] = useState<boolean>(false);
  const [currentTrans, setCurrentTrans] = useState<OrderResponse | null>(null);
  const [updateStatus] = useUpdateOrderStatusMutation();

  useEffect(() => {
    if (data) {
      setTransactionsList(data.allOrders);
    }
  }, [data]);

  const viewDetails = (transaction: OrderResponse) => {
    setIsViewDetails(!isViewDetails);
    setCurrentTrans(transaction);
  };

  const processOrder = async (orderId: string, status: string) => {
    if (status == "Delivered") {
      toast.warn("Order already delivered");
    } else {
      const res = await updateStatus({ adminId: adminId!, orderId }).unwrap();
      if (res.success) {
        toast.success("Status Changed");
      } else {
        toast.error("Please try again later");
      }
    }
  };

  if (isLoading) {
    return <Fallback />;
  }

  if (isError) {
    toast.error("Error Occured");
  }

  if (isSuccess) {
    return (
      <>
        {!isViewDetails && (
          <section className="coupon-container">
            <div className="add-coupon">
              <h1>Transactions</h1>
            </div>
            <div className="display-coupon">
              {!transactionsList.length ? (
                <div className="no-coupons">
                  <h1>No Transactions</h1>
                </div>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Amount</th>
                      <th>Discount</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactionsList?.map((t) => (
                      <tr key={t._id}>
                        <td>{t.user.name}</td>
                        <td>$ {t.total}</td>
                        <td>$ {t.discount}</td>
                        <td
                          className={t.status}
                          style={{ cursor: "pointer" }}
                          title="Change status"
                          onClick={() => processOrder(t._id, t.status)}
                        >
                          {t.status}
                        </td>
                        <td>
                          <p className="delete-td">
                            <img
                              src={viewLogo}
                              alt="delete"
                              title="View Details"
                              onClick={() => viewDetails(t)}
                            />
                          </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </section>
        )}
        {isViewDetails && (
          <section className="coupon-container">
            <div className="add-coupon">
              <div className="create-coupon">
                <h1>Order Details</h1>
                <div className="coupon-btn">
                  <button
                    type="button"
                    style={{ margin: 0 }}
                    onClick={() => {
                      setIsViewDetails(!isViewDetails);
                    }}
                  >
                    Go back
                  </button>
                </div>
              </div>
            </div>
            <div className="display-coupon">
              <table>
                <thead>
                  <tr>
                    <th>Ordered Items</th>
                    <th>Shipping Address</th>
                    <th>Change Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <table>
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Price per Item</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentTrans?.orderedItems.map((item) => (
                            <tr key={item.productId}>
                              <td>{item.name}</td>
                              <td>{item.quantity}</td>
                              <td>{item.price}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                    <td>
                      {`${currentTrans?.shippingInfo.address}, ${currentTrans?.shippingInfo.state}, ${currentTrans?.shippingInfo.city}, ${currentTrans?.shippingInfo.country}, ${currentTrans?.shippingInfo.zipcode}`}
                    </td>
                    <td
                      title="change status"
                      className={currentTrans?.status}
                      style={{ cursor: "pointer" }}
                    >
                      {currentTrans?.status}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        )}
      </>
    );
  }
}

export default AdminTransactions;
