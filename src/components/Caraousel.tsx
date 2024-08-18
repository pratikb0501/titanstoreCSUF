import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import uscape from "../assets/uscape.png";
import vintage from "../assets/vintage.png";

interface CaraouselImage {
  id: number;
  name: string;
  path: string;
}

// const rootPath: string = "src/assets/";

const imagesList: CaraouselImage[] = [
  {
    id: 1,
    name: uscape,
    path: "/products/uscape",
  },
  {
    id: 2,
    name: vintage,
    path: "/products/vintage",
  },
];

const rArrowPath: string = "/src/assets/rightArrow.svg";
const lArrowPath: string = "/src/assets/leftArrow.svg";

function Caraousel() {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      handleClick("right");
    }, 7000);
    return () => {
      clearInterval(interval);
    };
  }, [slide]);

  function handleClick(button: "right" | "left") {
    if (button == "right") {
      setSlide(slide == imagesList.length - 1 ? 0 : slide + 1);
    } else {
      setSlide(slide == 0 ? imagesList.length - 1 : slide - 1);
    }
  }

  return (
    <section className="caraousal">
      <span>
        <img
          src={`${lArrowPath}`}
          className="arrow left-arrow"
          onClick={() => handleClick("left")}
          alt="left-arrow"
        />
      </span>
      {imagesList.map((image, index) => {
        return (
          <Link to={image.path} key={index}>
            <div
              className={slide == index ? "slide slide-active" : "slide"}
              key={image.id}
            >
              {slide == index && (
                <img
                  key={image.id}
                  src={`${image.name}`}
                  alt={image.name}
                  className="active-img"
                />
              )}
            </div>
          </Link>
        );
      })}
      <span>
        <img
          src={`${rArrowPath}`}
          className="arrow right-arrow"
          onClick={() => handleClick("right")}
          alt="right-arrow"
        />
      </span>
      <span className="indicators">
        {imagesList.map((image, index) => {
          return (
            <button
              key={image.id}
              className={
                slide == index ? "indicator-btn btn-active" : "indicator-btn"
              }
              onClick={() => setSlide(index)}
            />
          );
        })}
      </span>
    </section>
  );
}

export default Caraousel;
