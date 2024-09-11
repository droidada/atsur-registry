import { Avatar, Rating } from "@mui/material";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Testimonials data
const testimonials = [
  {
    name: "John Doe",
    text: "Atsur is a revolutionary web app that's set to redefine the art verification process.",
    img: "/path-to-image.jpg", // Ensure that this path exists in your public folder
    rating: 5,
  },
  {
    name: "Jane Smith",
    text: "I had an amazing experience using Atsur. It's a game changer for artists.",
    img: "/path-to-image-2.jpg",
    rating: 4,
  },
  {
    name: "Samuel Green",
    text: "Highly recommended! Atsur is the best in the industry for art verification.",
    img: "/path-to-image-3.jpg",
    rating: 5,
  },
];

const HomeTestimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatically slide to the next testimonial after a delay
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000); // Auto-slide every 5 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [currentIndex]);

  // Function to handle the next slide
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1,
    );
  };

  const renderStars = (rating) => {
    return (
      Array(rating)
        // @ts-ignore
        .fill()
        .map((_, i) => <i key={i} className="fas fa-star text-yellow-400"></i>)
    );
  };

  return (
    <div
      style={{
        background: "url(/beautiful-cubism-graffiti.png)",
        position: "relative",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="py-12 px-6"
    >
      <div className="absolute top-0 left-0 bg-[#ac2e2ef1] w-full h-full z-0"></div>

      <div className="relative z-10">
        <div className="flex justify-center overflow-x-hidden items-center">
          <div
            onClick={handlePrev}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer"
          >
            <FaChevronLeft className="text-white text-2xl" />
            {/* <i className="fas fa-chevron-left text-white text-2xl"></i> */}
          </div>

          <div className="w-[80%] overflow-x-hidden">
            <div
              className=" mx-auto gap-5  flex    text-white transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 gap-8 flex flex-wrap justify-center p-12 items-center bg-white text-primary w-full"
                >
                  <div className="flex justify-center">
                    <Avatar
                      className="w-20 h-20"
                      src={testimonial.img}
                      alt={testimonial.name}
                    />
                  </div>
                  <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                    <p className="font-bold text-xl mb-2">{testimonial.name}</p>
                    <p className="w-full max-w-[501px]">{testimonial.text}</p>
                    {/* <div className="flex justify-center mt-2"> */}
                    <Rating value={testimonial.rating} readOnly />
                    {/* </div> */}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            onClick={handleNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer"
          >
            <FaChevronRight className="text-white text-2xl" />
            {/* <i className="fas fa-chevron-right text-white text-2xl"></i> */}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-4">
          {testimonials.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 mx-2 rounded-full duration-500 cursor-pointer ${
                currentIndex === index ? "bg-primary" : "bg-white"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeTestimonial;
