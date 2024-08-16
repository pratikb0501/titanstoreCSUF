// const Banner = lazy(()=>import("./components/Banner"))
// const Caraousel = lazy(()=>import("./components/Caraousel"))
// const Categories = lazy(()=>import("./components/Categories"))
// const VisitUs = lazy(()=>import("./components/VisitUs"))

import Banner from "../components/Banner";
import Caraousel from "../components/Caraousel";
import Categories from "../components/Categories";
import DisplayProducts from "../components/DisplayProducts";
import VisitUs from "../components/VisitUs";

function Homepage() {
  return (
    <main className="homepage">
      <Caraousel />
      <Banner displayText="Our Latest Products" />
      <DisplayProducts productsPerRow={5} />
      <Banner displayText="Explore Our Categories" />
      <Categories />
      <VisitUs />
      
    </main>
  );
}

export default Homepage;
