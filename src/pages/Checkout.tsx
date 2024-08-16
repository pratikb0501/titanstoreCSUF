import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { resetCart } from "../redux/reducers/cart/cartReducer";
import { useCreateNewOrderMutation } from "../redux/reducers/order/orderApi";
import { NewOrderRequest } from "../redux/reducers/order/orderTypes";
import { StoreRootState } from "../redux/store";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [newOrder] = useCreateNewOrderMutation();
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const { user } = useSelector((state: StoreRootState) => state.userReducer);
  const {
    shippingInfo,
    cartItems,
    subtotal,
    tax,
    discount,
    shippingCharges,
    total,
  } = useSelector((state: StoreRootState) => state.cartReducer);


  const submitPayment = async (e: FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setIsProcessing(true);

    const orderData: NewOrderRequest = {
      shippingInfo,
      orderedItems: cartItems,
      subtotal,
      tax,
      discount,
      shippingCharges,
      total,
      user: user?._id!,
    };

    const { paymentIntent, error } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: window.location.origin },
      redirect: "if_required",
    });
    if (error) {
      setIsProcessing(false);
      return toast.error(error.message || "Something went wrong");
    }
    if (paymentIntent.status === "succeeded") {
      const response = await newOrder(orderData);
      toast.success(response.data?.message)
      dispatch(resetCart());
      navigate("/myorders");
    }
    setIsProcessing(false);
  };
  return (
    <div className="checkout-container">
      <div className="checkout-main">
        <form onSubmit={submitPayment}>
          <PaymentElement />
          <button type="submit" disabled={isProcessing}>
            {isProcessing ? "Processing..." : "Pay"}
          </button>
          <p>
            Tip: Use test cards mentioned{" "}
            <a href="https://docs.stripe.com/testing" target="_blank">
              Here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

function Checkout() {
  const location = useLocation();
  const clientSecret: string | undefined = location.state;
  if (!clientSecret) {
    return <Navigate to={"/shipping"} />;
  }
  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
      }}
    >
      <CheckoutForm />
    </Elements>
  );
}

export default Checkout;
