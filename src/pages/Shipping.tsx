import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { saveShippingInfo } from "../redux/reducers/cart/cartReducer";
import { CartReducerInitialState } from "../redux/reducers/cart/cartTypes";
import { useCreateNewPaymentMutation } from "../redux/reducers/payment/paymentApi";
import { StoreRootState } from "../redux/store";

function Shipping() {
  const { cartItems, total } = useSelector(
    (state: { cartReducer: CartReducerInitialState }) => state.cartReducer
  );
  const { user } = useSelector((state: StoreRootState) => state.userReducer);
  const navigate = useNavigate();
  const [newPayment] = useCreateNewPaymentMutation();
  const dispatch = useDispatch();

  const [address, setAddress] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [zipcode, setZipcode] = useState<string>("");

  useEffect(() => {
    if (!user) {
      toast.warn("Please login !")
      navigate("/login");
    }
  }, []);
  useEffect(() => {
    if (!cartItems.length) {
      navigate("/cart");
    }
  }, [cartItems]);

  const submitAddress = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!address || !city || !state || !country || !zipcode) {
      toast.error("Please fill all the details");
    }
    dispatch(
      saveShippingInfo({
        address,
        city,
        state,
        country,
        zipcode,
      })
    );
    try {
      const { success, clientSecret } = await newPayment(total).unwrap();
      if (success) {
        navigate("/pay", {
          state: clientSecret,
        });
      }
    } catch (error) {
      toast.error("Error occured ! Please try again");
    }
  };

  return (
    <div className="shipping-container">
      <div className="shipping-main">
        <div className="shipping-title">SHIPPING ADDRESS</div>
        <form onSubmit={submitAddress}>
          <div className="shipping-input">
            <input
              type="text"
              name="address"
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter address"
              required
            />
            <input
              type="text"
              name="city"
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city"
              required
            />
            <input
              type="text"
              name="state"
              onChange={(e) => setState(e.target.value)}
              placeholder="Enter state"
              required
            />
            <select required onChange={(e) => setCountry(e.target.value)}>
              <option value="">Choose Country</option>
              <option value="India">India</option>
              <option value="USA">USA</option>
            </select>
            <input
              type="text"
              name="zipCode"
              onChange={(e) => setZipcode(e.target.value)}
              placeholder="Enter zipcode"
              required
            />
          </div>
          <div className="shipping-btn">
            <button>PAY NOW</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Shipping;
