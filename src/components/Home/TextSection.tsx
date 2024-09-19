import Image from "next/image";
import React from "react";

const TextSection = () => {
  return (
    <div className="bg-primary">
      <div
        className="page-container flex flex-wrap px-6 py-12 items-center justify-between max-w-[80%] w-full "
        data-aos="fade-up" // Entire section animates upward
      >
        <div
          data-aos="fade-right" // Image fades in from the right
          data-aos-delay="200" // Delayed slightly for smooth transition
        >
          <Image
            src={"/assets/images/home/home-about.jpeg"}
            alt=""
            width={400}
            height={400}
          />
        </div>
        <p
          className="text-white text-center md:text-left flex-1 max-w-[450px]"
          data-aos="fade-left" // Text fades in from the left
          data-aos-delay="300" // Further delay to create staggered effect
        >
          Atsur provides a secure and transparent platform for artists to
          showcase their work and collectors to invest with confidence. Our
          blockchain-based authentication and user-friendly interface make it
          easy for everyone involved.
        </p>
      </div>
    </div>
  );
};

export default TextSection;
