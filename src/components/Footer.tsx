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
          <img src="/src/assets/linkedin.png" alt="linkedIn" />
        </a>
      </div>
    </section>
  );
}

export default Footer;
