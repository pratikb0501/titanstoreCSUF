import { Link } from "react-router-dom";
import allproducts from "../assets/categories/allproducts.jpg";
import electronics from "../assets/categories/electronics.jpeg";
import frame from "../assets/categories/frame.jpg";
import jacket from "../assets/categories/jacket.png";
import jersey from "../assets/categories/jersey.jpg";
import merch from "../assets/categories/merch.jpg";
import sweatshirt from "../assets/categories/sweatshirt.jpg";
import tshirt from "../assets/categories/tshirt.jpg";

const categoryList = [
  {
    category: "All Products",
    imagePath: allproducts,
    routeTo: "/products/all",
  },
  {
    category: "T-shirts",
    imagePath: tshirt,
    routeTo: "/products/tshirts",
  },
  {
    category: "Sweatshirts",
    imagePath: sweatshirt,
    routeTo: "/products/sweatshirts",
  },
  {
    category: "Jackets",
    imagePath: jacket,
    routeTo: "/products/jackets",
  },
  {
    category: "Merchandise",
    imagePath: merch,
    routeTo: "/products/merchandise",
  },
  {
    category: "Electronics",
    imagePath: electronics,
    routeTo: "/products/electronics",
  },
  {
    category: "Frames",
    imagePath: frame,
    routeTo: "/products/frames",
  },
  {
    category: "Jerseys",
    imagePath: jersey,
    routeTo: "/products/jerseys",
  },
];

function Categories() {
  return (
    <section className="category-container">
      {categoryList.map((item, index) => {
        return (
          <Link to={item.routeTo} key={index}>
            <div
              className="card-container"
              key={index}
              title={`Buy ${item.category}`}
            >
              <img
                src={item.imagePath}
                alt={item.category}
                className="category-img"
              />
              <div className="card-text">
                <p>{item.category}</p>
              </div>
            </div>
          </Link>
        );
      })}
    </section>
  );
}

export default Categories;
