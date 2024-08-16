import { Link } from "react-router-dom";

const categoryList = [
  {
    category: "All Products",
    imagePath: "src/assets/categories/allproducts.jpg",
    routeTo: "/products/all",
  },
  {
    category: "T-shirts",
    imagePath: "src/assets/categories/tshirt.jpg",
    routeTo: "/products/tshirts",
  },
  {
    category: "Sweatshirts",
    imagePath: "src/assets/categories/sweatshirt.jpg",
    routeTo: "/products/sweatshirts",
  },
  {
    category: "Jackets",
    imagePath: "src/assets/categories/jacket.png",
    routeTo: "/products/jackets",
  },
  {
    category: "Merchandise",
    imagePath: "src/assets/categories/merch.jpg",
    routeTo: "/products/merchandise",
  },
  {
    category: "Electronics",
    imagePath: "src/assets/categories/electronics.jpeg",
    routeTo: "/products/electronics",
  },
  {
    category: "Frames",
    imagePath: "src/assets/categories/frame.jpg",
    routeTo: "/products/frames",
  },
  {
    category: "Jerseys",
    imagePath: "src/assets/categories/jersey.jpg",
    routeTo: "/products/jerseys",
  }
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
