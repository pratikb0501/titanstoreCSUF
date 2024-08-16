function Banner({ displayText }: { displayText: string }) {
  return (
    <section className="banner">
      <div>{displayText}</div>
    </section>
  );
}

export default Banner;
