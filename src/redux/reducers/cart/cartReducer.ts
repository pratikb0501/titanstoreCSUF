import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, CartReducerInitialState, ShippingInfo } from "./cartTypes";

const initialState: CartReducerInitialState = {
  loading: false,
  cartItems: [],
  subtotal: 0,
  tax: 0,
  shippingCharges: 0,
  discount: 0,
  total: 0,
  category:"",
  shippingInfo: {
    address: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
  },
};

export const cartReducer = createSlice({
  name: "cartReducer",
  initialState,
  reducers: {
    addTocart: (state, action: PayloadAction<CartItem>) => {
      state.loading = true;
      const index = state.cartItems.findIndex(
        (item) => item.productId === action.payload.productId
      );
      if (index !== -1) {
        if (state.cartItems[index].stock > state.cartItems[index].quantity) {
          state.cartItems[index].quantity++;
        }
      } else {
        state.cartItems.push(action.payload);
      }
      state.loading = false;
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.cartItems = state.cartItems.filter(
        (item) => item.productId != action.payload
      );
      state.loading = false;
    },
    decreaseQuantityFromCart: (state, action: PayloadAction<string>) => {
      const index = state.cartItems.findIndex(
        (item) => item.productId === action.payload
      );
      if (index !== -1) {
        if (state.cartItems[index].quantity > 1) {
          state.cartItems[index].quantity--;
        }
      }
    },
    calculatePrice: (state) => {
      const total = state.cartItems.reduce((total, currentItem) => {
        return total + currentItem.price * currentItem.quantity;
      }, 0);
      state.subtotal = Number(total.toFixed(2));
      state.shippingCharges = state.subtotal > 50 ? 0 : 5;
      state.tax = Number((state.subtotal * 0.1).toFixed(2));
      state.total = Number(
        (
          state.subtotal +
          state.tax +
          state.shippingCharges -
          state.discount
        ).toFixed(2)
      );
    },
    applyDiscount: (state, action: PayloadAction<number>) => {
      state.discount = action.payload;
    },
    saveShippingInfo:(state,action:PayloadAction<ShippingInfo>)=>{
      state.shippingInfo=action.payload;
    },
    resetCart:()=>initialState
  },
});

export const {
  addTocart,
  removeFromCart,
  decreaseQuantityFromCart,
  calculatePrice,
  applyDiscount,
  saveShippingInfo,
  resetCart
} = cartReducer.actions;
