import React, { useState, useEffect } from "react";

const textArray = ["Creativity", "Passion", "Inspiration", "Expression"];

const SliderAbout = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === textArray.length - 1 ? 0 : prevIndex + 1,
        );
        setFade(true);
      }, 1000);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-primary text-white py-10">
      <div className="page-container flex justify-center  gap-4 items-center">
        <h5 className="text-4xl ">Art is…</h5>
        <p
          className={`text-4xl font-bold transition ${
            fade ? "fade-in" : "fade-out"
          }`}
        >
          {textArray[currentIndex]}
        </p>
      </div>
    </section>
  );
};

export default SliderAbout;
