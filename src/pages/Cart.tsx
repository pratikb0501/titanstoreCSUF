import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "../hooks";
import {
  addTocart,
  applyDiscount,
  calculatePrice,
  decreaseQuantityFromCart,
  removeFromCart,
} from "../redux/reducers/cart/cartReducer";
import {
  CartItem,
  CartReducerInitialState,
} from "../redux/reducers/cart/cartTypes";
import { verifyCoupon } from "../redux/reducers/coupon/couponApi";
import { verifyCouponResponse } from "../redux/reducers/coupon/couponTypes";
import { Link, useNavigate } from "react-router-dom";

function Cart() {
  const dispatch = useDispatch();
  const { cartItems, shippingCharges, tax, subtotal, discount, total } =
    useSelector(
      (state: { cartReducer: CartReducerInitialState }) => state.cartReducer
    );
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState<string>("");
  // const [isCouponCorrect, setIsCouponCorrect] = useState<boolean>(false);
  const [isValidCoupon, setIsValidCoupon] = useState<boolean>(false);
  const [validMsg, setValidMsg] = useState<string>("");
  const debounce = useDebounce(couponCode);
  // const checkCoupon = async (code:string) =>{
  //   try {
  //     const {discount}:verifyCouponResponse= await verifyCoupon(code);
  //     setIsValidCoupon(true)
  //     setValidMsg("Applied Coupon Code")
  //     dispatch(applyDiscount(discount))
  //     dispatch(calculatePrice())
  //   } catch (error) {
  //     setIsValidCoupon(false)
  //     setValidMsg("Invalid Coupon Code");
  //     dispatch(applyDiscount(0))
  //     dispatch(calculatePrice())
  //   }
  // }
  // useEffect(() => {
  //   const timer = setTimeout(async()=>{
  //     if(couponCode){
  //       try {
  //         const {discount}:verifyCouponResponse= await verifyCoupon(couponCode);
  //         setIsValidCoupon(true)
  //         setValidMsg("Applied Coupon Code")
  //         dispatch(applyDiscount(discount))
  //         dispatch(calculatePrice())
  //       } catch (error) {
  //         setIsValidCoupon(false)
  //         setValidMsg("Invalid Coupon Code");
  //         dispatch(applyDiscount(0))
  //         dispatch(calculatePrice())
  //       }
  //     }else{
  //       setIsValidCoupon(false)
  //       setValidMsg("");
  //     }
  //   },500)

  //   return () => {
  //     clearTimeout(timer)
  //   }
  // }, [couponCode])

  useEffect(() => {
    if (debounce) {
      const checkCoupon = async () => {
        try {
          const response: verifyCouponResponse = await verifyCoupon(couponCode);
          dispatch(applyDiscount(response.discount));
          setIsValidCoupon(true);
          setValidMsg("Applied Coupon Code");
          dispatch(calculatePrice());
        } catch (error) {
          dispatch(applyDiscount(0));
          setIsValidCoupon(false);
          setValidMsg("Invalid Coupon Code");
          dispatch(calculatePrice());
        }
      };
      checkCoupon();
    } else {
      setIsValidCoupon(false);
      setValidMsg("");
      dispatch(applyDiscount(0));
    }
  }, [debounce]);

  useEffect(() => {
    dispatch(calculatePrice());
  }, [cartItems]);

  const deleteItem = (productId: string) => {
    dispatch(removeFromCart(productId));
  };

  const handleAddTocart = (productDetails: CartItem) => {
    dispatch(addTocart(productDetails));
  };

  const reduceFromCart = (productId: string) => {
    dispatch(decreaseQuantityFromCart(productId));
  };

  return (
    <div className="cart-container">
      <div className="cart-products">
        {cartItems &&
          cartItems.map((item) => (
            <div className="cart-product" key={item.productId}>
              <div className="cart-prod-img">
                <img
                  src={`${import.meta.env.VITE_API_SERVER_PHOTO_URL}/${
                    item.photo
                  }`}
                  alt={item.name}
                />
              </div>
              <div className="prod-desp">
                <p
                  className="prod-name"
                  onClick={() => navigate(`/products/${item.productId}`)}
                >
                  {item.name}
                </p>
                <p className="prod-price">$ {item.price}</p>
              </div>
              <div className="cart-quantity">
                <button
                  className="prod-decrease"
                  onClick={() => reduceFromCart(item.productId)}
                >
                  -
                </button>
                <p className="product-quantity">{item.quantity}</p>
                <button
                  className="prod-increase"
                  onClick={() => handleAddTocart(item)}
                >
                  +
                </button>
              </div>
              <div className="delete-product">
                <img
                  src="/src/assets/delete.svg"
                  alt=""
                  onClick={() => deleteItem(item.productId)}
                />
              </div>
            </div>
          ))}
        {cartItems && !cartItems.length && (
          <div className="cart-empty">
            <h3>No Items in the cart</h3>
          </div>
        )}
      </div>
      <div className="cart-amount">
        <div className="cart-title">
          <p>Cart Total</p>
        </div>
        <div className="payment-container">
          <div className="payment-info">
            <div>Subtotal:</div>
            <div>$ {subtotal}</div>
          </div>
          <div className="payment-info">
            <div>Shipping Charges:</div>
            <div>$ {shippingCharges}</div>
          </div>
          <div className="payment-info">
            <div>Tax (10%):</div>
            <div>$ {tax}</div>
          </div>
          <div className="payment-info discount">
            <div>Discount:</div>
            <div>-$ {discount}</div>
          </div>
          <hr />
          <div className="payment-info total">
            <div>Total:</div>
            <div>$ {total}</div>
          </div>
          <div className="checkout">
            <input
              type="text"
              name="couponCode"
              placeholder="Coupon Code"
              disabled={!cartItems.length}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            {isValidCoupon && validMsg && (
              <p className="coupon-msg valid">{validMsg}</p>
            )}
            {!isValidCoupon && validMsg && (
              <p className="coupon-msg invalid">{validMsg}</p>
            )}
            <Link to="/shipping">
              <button disabled={!cartItems.length}>Checkout</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
