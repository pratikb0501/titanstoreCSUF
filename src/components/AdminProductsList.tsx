import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useDeleteProductMutation,
  useGetAdminProductsQuery,
  useGetAllProductsQuery,
} from "../redux/reducers/product/productApi";
import { UserReducerInitState } from "../redux/reducers/user/userTypes";
import {
  DeleteProductResponse,
  ProductResponse,
} from "../redux/reducers/product/productTypes";
import { useState } from "react";
import UpdateProduct from "./UpdateProduct";
import Fallback from "./Fallback";

function AdminProductsList() {
  const adminId = useSelector(
    (state: { userReducer: UserReducerInitState }) =>
      state.userReducer.user?._id
  );
  const {
    data: allProducts,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAdminProductsQuery();

  const [deleteProductById, { isSuccess: isDeleteSuccess }] =
    useDeleteProductMutation();
  const [isUpdate, setIsUpdate] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<ProductResponse | null>(
    null
  );

  const UpdateProductById = (product: ProductResponse) => {
    setCurrentProduct(product);
    setIsUpdate(!isUpdate);
  };

  const deleteProduct = async (productId: string) => {
    try {
      if (!adminId) {
        return;
      }
      const res: DeleteProductResponse = await deleteProductById({
        adminId,
        productId,
      }).unwrap();
      if (res.success) {
        toast.success("Product Deleted");
      }
    } catch (error) {
      toast.error("Product Deletion Failed");
    }
  };

  if (isLoading) {
    return <Fallback />;
  }
  if (isError) {
    toast.error("Error in fetching data");
  }
  if (isSuccess) {
    const { products } = allProducts;
    if (!isUpdate) {
      return (
        <div className="manage-products-container">
          <h1>Products List</h1>
          <div className="products-table">
            <table>
              <thead>
                <tr>
                  <th>Photo</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Manage</th>
                </tr>
              </thead>
              <tbody>
                {products?.map((product, index) => (
                  <tr key={index} className="table-row">
                    <td className="img-td">
                      <img
                        src={`${import.meta.env.VITE_API_SERVER_PHOTO_URL}/${
                          product.photo
                        }`}
                        alt="product-img"
                      />
                    </td>
                    <td>{product.name}</td>
                    <td>$ {product.price}</td>
                    <td>{product.stock}</td>
                    <td className="manage-td">
                      <div className="manage-div">
                        <p className="edit-td">
                          <img
                            src="/src/assets/edit.svg"
                            alt="edit"
                            title="edit product"
                            onClick={() => UpdateProductById(product)}
                          />
                        </p>
                        <p className="delete-td">
                          <img
                            src="/src/assets/delete.svg"
                            alt="delete"
                            title="delete product"
                            onClick={() => deleteProduct(product?._id)}
                          />
                        </p>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    } else {
      return (
        <UpdateProduct productDetails={currentProduct} setIsUpdate={setIsUpdate} isUpdate />
      );
    }
  }
}

export default AdminProductsList;
