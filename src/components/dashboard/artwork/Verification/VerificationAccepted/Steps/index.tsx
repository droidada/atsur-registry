import { Stack } from "@mui/material";
import { useState } from "react";
import VericationConfirmPreview from "./preview";
import GenerateQRCode from "./generate-qrcode";
import SignCertificate from "./sign-certificate";
import TokenizeCertificate from "./tokenize";

interface Props {
  artPiece: any;
}
const VerificationConfirmSteps: React.FC<Props> = ({ artPiece }) => {
  const [steps, setSteps] = useState([
    "preview",
    "generate qr code",
    "sign COA",
    "tokenize",
    "final preview",
  ]);
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <Stack spacing={4}>
      <h2 className="font-semibold capitalize text-xl md:text-2xl lg:text-[30px] lg:leading-[40px]">
        {steps[activeIndex]}
      </h2>
      <div className="overflow-x-auto flex gap-2 w-full ">
        {steps.map((item, index) => (
          <div
            key={`active-bar-${item}`}
            className="flex-shrink-0  flex flex-col max-w-[152px] w-full gap-2"
          >
            <span
              className={` capitalize text-[15px] leading-[17px] ${
                activeIndex === index ? "font-bold" : ""
              }`}
            >
              {item}
            </span>
            <span
              className={`h-[7px] w-full rounded-[23px]  ${
                activeIndex >= index
                  ? activeIndex == 2 && index == 2
                    ? "bg-[#00FF94]"
                    : "bg-primary"
                  : "bg-secondary"
              }`}
            />
          </div>
        ))}
      </div>
      {
        [
          <VericationConfirmPreview
            setActiveIndex={setActiveIndex}
            artPiece={artPiece}
            key={`verification-step-${1}`}
          />,
          <GenerateQRCode
            setActiveIndex={setActiveIndex}
            artPiece={artPiece}
            key={`verification-step-${2}`}
          />,
          <SignCertificate
            setActiveIndex={setActiveIndex}
            artPiece={artPiece}
            key={`verification-step-${3}`}
          />,
          <TokenizeCertificate
            setActiveIndex={setActiveIndex}
            artPiece={artPiece}
            key={`verification-step-${4}`}
          />,
        ][activeIndex]
      }
    </Stack>
  );
};

export default VerificationConfirmSteps;
