import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Fallback from "../components/Fallback";
import ListAllProducts from "../components/ListAllProducts";
import { useDebounce } from "../hooks";
import {
  useGetAllCategoriesQuery,
  useSearchProductsQuery,
} from "../redux/reducers/product/productApi";
import { ProductResponse } from "../redux/reducers/product/productTypes";

function DisplayAllProducts({ categoryProp }: { categoryProp: string }) {
  const [priceRange, setPriceRange] = useState(10000);
  const { data } = useGetAllCategoriesQuery();
  const [categoriesList, setCategoriesList] = useState<string[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductResponse[]>(
    []
  );
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentCategory, setCurrentCategory] = useState<string>(categoryProp);
  const [searchByName, setSearchByName] = useState<string>("");
  const [sort, setSort] = useState<string>("");
  const debounceSearch = useDebounce(searchByName);
  const debouncePriceRange = useDebounce(priceRange)
  const {
    data: searchedProducts,
    isLoading,
    isError,
    isSuccess,
  } = useSearchProductsQuery({
    price: debouncePriceRange,
    category: currentCategory,
    page: currentPage,
    search: debounceSearch,
    sort,
  });

  useEffect(() => {
    if (data) {
      setCategoriesList(data?.categories);
    }
  }, [data]);

  useEffect(() => {
    if (searchedProducts) {
      setFilteredProducts(searchedProducts?.products);
      setTotalPages(searchedProducts.totalPages);
      // setCurrentPage(1);
    }
  }, [searchedProducts]);

  if (isError) {
    // const searchError = error as
    toast.error("Error occured! Please try again");
  }

  const showNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  const showPrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <section className="display-prod-container">
      <div className="filter-box">
        <p className="filter-title">FILTERS</p>
        <div className="sort-box">
          <p>SORT</p>
          <select
            name="sort"
            value={sort}
            onChange={(e) => {
              setSort(e.target.value)
              setCurrentPage(1);
            }}
          >
            <option value="">None</option>
            <option value="asc">Price(Low to High)</option>
            <option value="desc">Price(High to Low)</option>
          </select>
        </div>
        <div className="sort-box">
          <p>Max Price : {priceRange}</p>
          <input
            type="range"
            name="priceRange"
            min="1"
            max="10000"
            step={1}
            value={priceRange}
            onChange={(e) => {
              setPriceRange(Number(e.target.value));
              setCurrentPage(1);
            }}
          />
          <div></div>
        </div>
        <div className="sort-box">
          <p>CATEGORY</p>
          <select
            name="category"
            value={currentCategory}
            onChange={(e) => {
              setCurrentCategory(e.target.value)
              setCurrentPage(1);
            }}
          >
            <option value="">ALL</option>
            {categoriesList?.map((category, index) => (
              <option key={index} value={category}>
                {category.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
        <div className="sort-box">
          <p>SEARCH</p>
          <input
            type="text"
            name="search"
            onChange={(e) => {
              setSearchByName(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        {totalPages > 1 && (
          <div className="page-box">
            <p>PAGES</p>
            <div className="page-btns">
              <button
                disabled={currentPage == 1}
                onClick={() => showPrevPage()}
              >
                Prev
              </button>
              <p>
                {currentPage} of {totalPages}
              </p>
              <button
                disabled={currentPage == totalPages}
                onClick={() => showNextPage()}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="products-box">
        <p className="product-category">
          {currentCategory ? currentCategory : "all products"}
        </p>
        {isLoading && <Fallback />}
        {isSuccess && (
          <ListAllProducts productsPerRow={4} productsList={filteredProducts} />
        )}
      </div>
    </section>
  );
}

export default DisplayAllProducts;
