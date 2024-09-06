import React from "react";

const DigitalCataloging = () => {
  return (
    <section
      className="bg-primary flex flex-wrap justify-center text-white py-12 px-4 gap-6 items-center"
      data-aos="fade-up"
    >
      <h2
        className="text-center lg:text-right font-bold text-4xl"
        data-aos="fade-right"
        data-aos-delay="200"
      >
        Digital <br />
        <span>Cataloging</span>
      </h2>
      <p
        className="text-center lg:text-left text-lg"
        data-aos="fade-left"
        data-aos-delay="300"
      >
        We collaborate with artists and <br /> galleries to:
      </p>
    </section>
  );
};

export default DigitalCataloging;
