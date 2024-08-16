import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "./reducers/product/productApi";
import { userApi } from "./reducers/user/userApi";
import { userReducer } from "./reducers/user/userReducer";
import { couponApi } from "./reducers/coupon/couponApi";
import { cartReducer } from "./reducers/cart/cartReducer";
import { orderApi } from "./reducers/order/orderApi";
import { paymentApi } from "./reducers/payment/paymentApi";
import { dashboardApi } from "./reducers/dashboard/dashboardApi";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [userReducer.reducerPath]: userReducer.reducer,
    [cartReducer.reducerPath]: cartReducer.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [couponApi.reducerPath]: couponApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      productApi.middleware,
      couponApi.middleware,
      orderApi.middleware,
      paymentApi.middleware,
      dashboardApi.middleware
    ),
});


export type StoreRootState = ReturnType<typeof store.getState>