import React from "react";

const HomeAbout = () => {
  return (
    <section className="bg-secondary py-12">
      <div className="page-container flex justify-center gap-8 items-center flex-wrap">
        <h2 className="font-bold text-6xl text-primary" data-aos="fade-up">
          100,000+
        </h2>
        <p
          className="max-w-[525px] lg:text-left text-center w-full"
          data-aos="fade-up"
          data-aos-delay="150"
        >
          ATSUR Africa’s Indigenous Art Registry… Our Goal is to Catalog and
          Archive at Least 100,000 thousand pieces before December 2026.
        </p>
      </div>
    </section>
  );
};

export default HomeAbout;
