import { FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import noImage from "../assets/no_image.svg";
import { useAddNewProductMutation } from "../redux/reducers/product/productApi";
import { DeleteProductResponse } from "../redux/reducers/product/productTypes";
import { UserReducerInitState } from "../redux/reducers/user/userTypes";

function AddNewProduct({ changeTab }: { changeTab: Function }) {
  const [newProduct] = useAddNewProductMutation();
  const [productName, setproductName] = useState<string>("");
  const [productDesp, setproductDesp] = useState<string>("");
  const [productImage, setProductImage] = useState<File>();
  const [productImageURL, setProductImageURL] = useState<string>("");
  const [productCategory, setProductCategory] = useState<string>("");
  const [productPrice, setProductPrice] = useState<number>(1);
  const [productStock, setProductStock] = useState<number>(1);
  const adminId = useSelector(
    (state: { userReducer: UserReducerInitState }) =>
      state.userReducer.user?._id
  );
  const firetoast = (name: string) => {
    toast.error(`${name} cannot be empty`);
  };

  const createNewProduct = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!adminId) return;
    const payload = {
      name: productName,
      category: productCategory!,
      description: productDesp!,
      price: productPrice,
      stock: productStock,
      photo: productImage!,
      adminId,
    };
    try {
      const res: DeleteProductResponse = await newProduct(payload).unwrap();
      if (res.success) {
        changeTab("all");
        toast.success(res.message);
      }
    } catch (error) {
      toast.error("Failed ! Please Try Again");
    }
  };

  return (
    <>
      <h1>Add New Product</h1>
      <div className="add-product-container">
        <div className="product-img">
          {productImage ? (
            <img src={productImageURL} alt="product_image" />
          ) : (
            <img src={noImage} alt="product_image" />
          )}
        </div>
        <div className="product-details">
          <form onSubmit={(e) => createNewProduct(e)}>
            <div className="product-input">
              <label>Product Image</label>
              <input
                type="file"
                name="productImage"
                accept="image/*"
                required
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
              <button type="submit">Add Product</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddNewProduct;
