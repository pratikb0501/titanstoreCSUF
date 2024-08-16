import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../redux/reducers/product/productApi";
import { skipToken } from "@reduxjs/toolkit/query";
import { SingleProduct } from "../redux/reducers/product/productTypes";
import { MouseEvent, useEffect, useState } from "react";
import Fallback from "./Fallback";
import { useDispatch, useSelector } from "react-redux";
import {
  addTocart,
  decreaseQuantityFromCart,
  removeFromCart,
} from "../redux/reducers/cart/cartReducer";
import { CartReducerInitialState } from "../redux/reducers/cart/cartTypes";
import { UserReducerInitState } from "../redux/reducers/user/userTypes";

function ProductDetails() {
  const params = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitState }) => state.userReducer
  );
  const { data, isLoading, isSuccess } = useGetProductByIdQuery(
    params.id ?? skipToken
  );
  const { cartItems } = useSelector(
    (state: { cartReducer: CartReducerInitialState }) => state.cartReducer
  );
  const [product, setProduct] = useState<SingleProduct>();
  const [productQuantity, setProductQuantity] = useState<number>(0);

  useEffect(() => {
    if (data) {
      setProduct(data.product);
    }
  }, [data]);

  useEffect(() => {
    for (let i = 0; i < cartItems.length; i++) {
      if (product?._id == cartItems[i].productId) {
        setProductQuantity(cartItems[i].quantity);
      }
    }
  }, [cartItems]);

  const handleAddTocart = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.stopPropagation();
    const cartItem = {
      productId: product?._id!,
      photo: product?.photo!,
      name: product?.name!,
      price: product?.price!,
      quantity: 1,
      category: product?.category!,
      stock: product?.stock!,
    };
    dispatch(addTocart(cartItem));
  };

  const reduceFromCart = (productId: string) => {
    if (productQuantity == 1) {
      dispatch(removeFromCart(productId));
      setProductQuantity(0);
    }
    dispatch(decreaseQuantityFromCart(productId));
  };

  return (
    <>
      {isLoading && <Fallback />}
      {isSuccess && (
        <section className="productDetails-container">
          <div className="productDetails-left">
            <div className="product-img">
              <img
                src={`${import.meta.env.VITE_API_SERVER_PHOTO_URL}/${
                  product?.photo
                }`}
                alt={product?.name}
              />
            </div>
          </div>
          <div className="productDetails-right">
            <div className="title">Product Details</div>
            <div className="product-name">{product?.name}</div>
            <div className="product-desp">{product?.description}</div>
            <div className="product-price">$ {product?.price}</div>
            {user?.role === "user" && (
              <div className="cart">
                <button
                  className="cart-btn"
                  disabled={!productQuantity}
                  onClick={() => reduceFromCart(product?._id!)}
                >
                  -
                </button>
                <div className="cart-quantity">{productQuantity}</div>
                <button
                  className="cart-btn"
                  disabled={productQuantity == product?.stock}
                  onClick={(e) => handleAddTocart(e)}
                >
                  +
                </button>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
}

export default ProductDetails;
