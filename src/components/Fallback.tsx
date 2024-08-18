import spinningWheel from "../assets/loading.svg";

function Fallback() {
  return (
    <div className="fallback">
      <img src={spinningWheel} alt="loader" />
    </div>
  );
}

export default Fallback;
