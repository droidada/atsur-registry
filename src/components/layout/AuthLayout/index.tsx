import Image from "next/image";
import React from "react";
import logo from "../../../../public/atsur-logo-black.png";
import Link from "next/link";

interface Props {
  children: React.ReactNode;
  image?: string;
  title: string;
  paragraph?: string;
  titleIsCenter?: boolean;
}
const AuthLayout: React.FC<Props> = ({
  children,
  image,
  title,
  paragraph,
  titleIsCenter,
}) => {
  return (
    <div className="flex ">
      <div className="lg:w-1/2 w-full flex flex-col gap-8 py-6 ">
        <Link href={"/"}>
          <Image width={200} height={100} src={logo} alt="atsur" />
        </Link>
        <div className="flex flex-col gap-6 items-center">
          <div className="max-w-[426px] w-full gap-12 flex-col flex ">
            <div className="flex flex-col gap-2">
              <h1
                className={`font-semibold text-2xl md:text-3xl lg:text-[45px] lg:leading-[40px] ${
                  titleIsCenter && "text-center"
                }`}
              >
                {title}
              </h1>
              <p className=" font-[300] text-lg md:text-[22px] md:leading-[40px]">
                {paragraph}
              </p>
            </div>

            <div className="w-full">{children}</div>
          </div>
        </div>
      </div>
      <div className="w-1/2 h-screen  sticky top-0 right-0 lg:block hidden">
        <Image
          src={image || "/images/atsur-login.png"}
          fill
          className="object-cover"
          alt=""
        />
      </div>
    </div>
  );
};

export default AuthLayout;
