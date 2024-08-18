import TitansLogo from "../assets/TitansLogo.png";
function VisitUs() {
  return (
    <section className="visit-container">
      <div className="address">
        <p className="add-p1">
          Visit Our Store: <u>Titan Shop</u>
        </p>
        <p className="add-p2">
          800 N. State College Blvd. | Commons 2 Dock | Fullerton,CA 92831
        </p>
      </div>
      <div className="titans-logo">
        <img src={TitansLogo} alt="titans_logo" />
      </div>
    </section>
  );
}

export default VisitUs;
