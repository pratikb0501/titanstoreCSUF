import { toast } from "react-toastify";
import { useGetLatestProductsQuery } from "../redux/reducers/product/productApi";
import ProductCard from "./ProductCard";
import Fallback from "./Fallback";
const DisplayProducts = ({ productsPerRow }: { productsPerRow: number }) => {
  const {
    data: productsList,
    isError,
    isLoading,
    isSuccess,
  } = useGetLatestProductsQuery();
  let gridStyle = "1fr 1fr 1fr 1fr";
  if (productsPerRow == 5) {
    gridStyle += " 1fr";
  }
  if (isError) {
    toast.error("Error in fetching data");
  }
  if (isLoading) {
    return <Fallback />;
  }
  if (isSuccess) {
    const { latestProducts } = productsList;
    return (
      <section
        className="displayProducts"
        style={{ gridTemplateColumns: gridStyle }}
      >
        {latestProducts && latestProducts?.map((product) => (
          <ProductCard
            key={product._id}
            productDetails={product}
          />
        ))}
      </section>
    );
  }
};

export default DisplayProducts;
