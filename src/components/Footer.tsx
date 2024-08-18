import linkedIn from "../assets/linkedin.png"

function Footer({title,subtitle,link}:{
  title:string;
  subtitle:string;
  link:string;
}) {
  return (
    <section className="footer">
      <div className="footer-row1">{title}</div>
      <div className="footer-row2">
        <a href={link} target="_blank">
          {subtitle}
          <img src={linkedIn} alt="linkedIn" />
        </a>
      </div>
    </section>
  );
}

export default Footer;
