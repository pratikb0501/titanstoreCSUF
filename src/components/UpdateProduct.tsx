import { FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  ProductResponse,
  UpdateProductPayload,
  UpdateProductResponse
} from "../redux/reducers/product/productTypes";
import { UserReducerInitState } from "../redux/reducers/user/userTypes";
import { useUpdateProductMutation } from "../redux/reducers/product/productApi";

function UpdateProduct({
  productDetails,
  setIsUpdate,
  isUpdate,
}: {
  productDetails: ProductResponse | null;
  setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  isUpdate: boolean;
}) {
  const adminId = useSelector(
    (state: { userReducer: UserReducerInitState }) =>
      state.userReducer.user?._id
  );
  const [updateProductById] = useUpdateProductMutation();
  const [productName, setproductName] = useState<string>(productDetails!.name);
  const [productDesp, setproductDesp] = useState<string>(
    productDetails!.description
  );
  const [productImage, setProductImage] = useState<File>();
  const [productImageURL, setProductImageURL] = useState<string>(
    `${import.meta.env.VITE_API_SERVER_PHOTO_URL}/${productDetails!.photo}`
  );
  const [productCategory, setProductCategory] = useState<string>(
    productDetails!.category
  );
  const [productPrice, setProductPrice] = useState<number>(
    productDetails!.price
  );
  const [productStock, setProductStock] = useState<number>(
    productDetails!.stock
  );

  const firetoast = (name: string) => {
    toast.error(`${name} cannot be empty`);
  };

  const updateProduct = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let payload: UpdateProductPayload = {
      _id: productDetails!._id,
      name: productName,
      price: productPrice,
      stock: productStock,
      category: productCategory,
      description: productDesp,
      photo : productImage ? productImage : productImageURL,
      createdAt: productDetails!.createdAt,
      updatedAt: productDetails!.updatedAt,
      adminId:adminId!
    };
    try {
      const res:UpdateProductResponse = await updateProductById(payload).unwrap();
      if(res.success){
        setIsUpdate(!isUpdate)
        toast.success(res.message);
      };
    } catch (error) {
      toast.error("Failed ! Please Try Again");
    }

  };

  return (
    <>
      <h1>Update Product</h1>
      <div className="add-product-container">
        <div className="product-img">
          {productImage || productImageURL ? (
            <img src={productImageURL} alt="product_image" />
          ) : (
            <img src="/src/assets/no_image.svg" alt="product_image" />
          )}
        </div>
        <div className="product-details">
          <form onSubmit={(e) => updateProduct(e)}>
            <div className="product-input">
              <label>Product Image</label>
              <input
                type="file"
                name="productImage"
                accept="image/*"
                onChange={(e) => {
                  setProductImage(e.target.files![0]);
                  setProductImageURL(URL.createObjectURL(e.target.files![0]));
                }}
              />
            </div>
            <div className="product-input">
              <label>Name</label>
              <input
                type="text"
                placeholder="Enter Product Name"
                name="name"
                required
                value={productName}
                onChange={(e) => setproductName(e.target.value)}
                onBlur={(e) => {
                  if (!productName) firetoast(e.target.name);
                }}
              />
            </div>
            <div className="product-input">
              <label>Description</label>
              <textarea
                rows={5}
                name="description"
                placeholder="Enter Product Description"
                required
                value={productDesp}
                onChange={(e) => setproductDesp(e.target.value)}
                onBlur={(e) => {
                  if (!productDesp) firetoast(e.target.name);
                }}
              />
            </div>
            <div className="product-input">
              <label>Price</label>
              <input
                type="number"
                name="price"
                min={1}
                max={100000}
                step={0.01}
                placeholder="Enter Product Price"
                required
                value={productPrice}
                onChange={(e) => {
                  if (!e.target.value) return;
                  const price: number = Number(
                    Number(e.target.value).toFixed(2)
                  );
                  setProductPrice(price);
                }}
                onBlur={(e) => {
                  const price: number = Number(
                    Number(e.target.value).toFixed(2)
                  );
                  if (price < 1) {
                    toast.error("Price should be positive");
                  }
                }}
              />
            </div>
            <div className="product-input">
              <label>Stock</label>
              <input
                type="number"
                name="stock"
                min={1}
                value={productStock}
                required
                placeholder="Enter Product Count in Stock"
                onChange={(e) => {
                  if (!e.target.value) return;
                  const stock: number = Number(
                    Number(e.target.value).toFixed(2)
                  );
                  setProductStock(stock);
                }}
                onBlur={(e) => {
                  const stock: number = Number(
                    Number(e.target.value).toFixed(2)
                  );
                  if (stock < 1) {
                    toast.error("Quantity should be positive");
                  }
                }}
              />
            </div>
            <div className="product-input">
              <label>Category</label>
              <input
                type="text"
                name="category"
                required
                placeholder="Enter Product Category"
                value={productCategory}
                onChange={(e) => setProductCategory(e.target.value)}
                onBlur={(e) => {
                  if (!productCategory) firetoast(e.target.name);
                }}
              />
            </div>
            <div className="submit-btn">
              <button type="submit">Update Product</button>
              <button
                className="cancel-btn"
                onClick={() => setIsUpdate(!isUpdate)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default UpdateProduct;
