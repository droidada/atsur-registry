import React, { useState, useEffect } from "react";
import Image from "next/image";

const LoadingScreen: React.FC<{ loading: boolean }> = ({ loading }) => {
  const [visible, setVisible] = useState(loading);

  useEffect(() => {
    if (loading) {
      setVisible(true);
    } else {
      const timer = setTimeout(() => setVisible(false), 500); // match the duration of the exit animation
      return () => clearTimeout(timer);
    }
  }, [loading]);

  return (
    <div
      className={`       fixed inset-0 bg-[#efefef] z-[9999] flex items-center justify-center transition-transform duration-500 ${
        loading ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <Image width={600} height={600} alt="loader" src={"/loader-gif.gif"} />
    </div>
  );
};

export default LoadingScreen;
