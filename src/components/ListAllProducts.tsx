import {
  ProductResponse
} from "../redux/reducers/product/productTypes";
import ProductCard from "./ProductCard";
const ListAllProducts = ({
  productsPerRow,
  productsList,
}: {
  productsPerRow: number;
  productsList: ProductResponse[];
}) => {
  // const {
  //   data: productsList,
  //   isError,
  //   isLoading,
  //   isSuccess,
  // } = useGetAllProductsQuery();
  let gridStyle = "1fr 1fr 1fr 1fr";
  if (productsPerRow == 5) {
    gridStyle += " 1fr";
  }

  return (
    <section
      className="displayProducts"
      style={{ gridTemplateColumns: gridStyle }}
    >
      {productsList &&
        productsList?.map((product) => (
          <ProductCard
            key={product._id}
            productDetails={product}
          />
        ))}
        {
          !productsList.length && <h3>No products</h3>
        }
    </section>
  );
};

export default ListAllProducts;
