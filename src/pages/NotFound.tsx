import notFound from "../assets/404.png";

function NotFound() {
  return (
    <section className="notfound-error">
      <p>
        <img src={notFound} alt="404_Image" />
      </p>
    </section>
  );
}

export default NotFound;
