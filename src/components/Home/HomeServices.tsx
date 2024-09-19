import Image from "next/image";
import Link from "next/link";
import React from "react";

const items = [
  {
    title: "Secure Your Legacy",
    content: "Protect your artwork's authenticity with blockchain technology.",
    img: "/assets/images/home/home-service-section/legacy.svg",
  },
  {
    title: "Global Exposure",
    content: "Showcase your art to a worldwide audience of collectors.",
    img: "/assets/images/home/home-service-section/global-network.svg",
  },
  {
    title: "Simplified Transactions",
    content: "Enjoy seamless buying and selling experiences.",
    img: "/assets/images/home/home-service-section/legacy.svg",
  },
  {
    title: "Join the Community",
    content: "Connect with passionate art enthusiasts and fellow artists",
    img: "/assets/images/home/home-service-section/communities.svg",
  },
];

const HomeServices = () => {
  return (
    <section className="bg-white py-12 px-8">
      <div className="max-w-[1200px] mx-auto flex flex-wrap gap-6 justify-center items-stretch">
        {items.map((item, index) => (
          <div
            key={item?.title}
            className="border border-primary shadow-md flex flex-col md:flex-row justify-between w-full max-w-[552px] p-6 bg-white "
            data-aos="fade-up"
            data-aos-delay={`${index * 200}`}
          >
            <div className="flex flex-col gap-6 md:gap-8 w-full md:w-2/3">
              <h5 className="text-2xl font-semibold text-gray-800">
                {item?.title}
              </h5>
              <p className="text-gray-600">{item?.content}</p>
            </div>
            <div className="w-full md:w-1/3 flex justify-center items-center">
              <Image
                width={141}
                height={141}
                src={item?.img}
                alt={item?.title}
              />
            </div>
          </div>
        ))}
      </div>
      <div
        className="mt-12 text-center"
        data-aos="fade-up"
        data-aos-delay="800"
      >
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Atsur was born..
        </h2>
        <p className="text-lg text-gray-600 max-w-4xl mx-auto">
          out of a passion for African Arts and Culture, integrating with
          innovative technology solutions to transform how African art is being
          perceived. We recognize the untapped potential within the African art
          market hindered by issues like lack of transparency and limited access
          to capital… <br />
          <Link href="#" className=" ">
            {" "}
            Learn More
          </Link>
        </p>
      </div>
    </section>
  );
};

export default HomeServices;
