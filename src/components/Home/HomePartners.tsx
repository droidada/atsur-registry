import React from "react";

const HomePartners = () => {
  return (
    <section className="bg-primary text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-center text-4xl font-bold mb-8" data-aos="fade-up">
          Our Partners
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          {[...Array(6)].map((_, index) => (
            <div
              key={`partners-${index}`}
              className="w-[60px] h-[60px] rounded-full flex items-center justify-center bg-white bg-opacity-20 border border-white"
              data-aos="fade-up"
              data-aos-delay={`${index * 150}`}
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomePartners;
