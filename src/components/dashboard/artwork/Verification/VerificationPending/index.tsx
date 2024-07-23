import { Button } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { GrCheckmark } from "react-icons/gr";

interface Props {
  artPiece: any;
}
const VerificationPending: React.FC<Props> = ({ artPiece }) => {
  const router = useRouter();

  console.log(artPiece);

  return (
    <div className="flex lg:flex-nowrap justify-center  items-center mt-6 flex-wrap md:gap-8">
      <div
        style={{ aspectRatio: "1/1" }}
        className="relative md:w-[330px] w-[250px] bg-secondary rounded-full overflow-hidden"
      >
        <Image
          src={"/images/atsur-login.png"}
          alt=""
          fill
          className="object-cover"
        />
      </div>
      {/* <div className="flex items-center  gap-8"> */}
      <div className="flex max-w-[266px] w-full  flex-col gap-4">
        <h2 className="text-3xl text-[#4C4C4C] md:text-[57px] font-bold">
          Pending
        </h2>
        <p className="w-full   text-justify text-[17px] leading-[20px] font-[300]">
          Your artwork will be verified in the next 15 Days. Thank you
        </p>
        <Button
          // onClick={() => setActiveIndex(0)}
          variant="contained"
          className="w-full bg-primary"
        >
          Verify Now
        </Button>
      </div>
      <div className=" flex flex-col  ">
        {[
          "Personal KYC",
          "Business KYC",
          "Physical Verification",
          "Complete",
        ].map((step) => (
          <div key={step} className="flex items-center gap-8">
            <div className="relative flex items-center justify-center">
              <span className="w-[35px] h-[35px] absolute left-[50%] translate-x-[-50%] rounded-full bg-secondary flex items-center justify-center">
                <GrCheckmark />
              </span>
              <span className="h-[80px] w-[1px] bg-primary  "></span>
            </div>
            <span>{step}</span>
          </div>
        ))}
      </div>
      {/* </div> */}
    </div>
  );
};

export default VerificationPending;
