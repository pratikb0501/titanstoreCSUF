import { useDispatch, useSelector } from "react-redux";
import { ProductResponse } from "../redux/reducers/product/productTypes";
import { addTocart } from "../redux/reducers/cart/cartReducer";
import { toast } from "react-toastify";
import { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { UserReducerInitState } from "../redux/reducers/user/userTypes";

function ProductCard({ productDetails }: { productDetails: ProductResponse }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitState }) => state.userReducer
  );

  const handleAddTocart = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.stopPropagation();
    const cartItem = {
      productId: productDetails._id,
      photo:
        productDetails.photo instanceof File
          ? URL.createObjectURL(productDetails.photo)
          : productDetails.photo,
      name: productDetails.name,
      price: productDetails.price,
      quantity: 1,
      category: productDetails.category,
      stock: productDetails.stock,
    };
    dispatch(addTocart(cartItem));
    toast.success("Added to Cart");
  };

  return (
    <div
      className="product-container"
      onClick={() => navigate(`/products/${productDetails._id}`)}
    >
      <div className="image-container">
        <img
          className="card-image"
          src={`${import.meta.env.VITE_API_SERVER_PHOTO_URL}/${
            productDetails.photo
          }`}
          alt={productDetails.name}
        />
      </div>
      <div className="card-details">
        <div className="card-title">
          <p className="product-title">{productDetails.name}</p>
          <p>${productDetails.price}</p>
        </div>
        {user?.role != "admin" && (
          <p className="card-content">
            <button className="card-btn" onClick={(e) => handleAddTocart(e)}>
              Add to Cart
            </button>
          </p>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
