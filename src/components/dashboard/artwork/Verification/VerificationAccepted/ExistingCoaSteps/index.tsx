import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import VericationConfirmPreview from "./preview";
import GenerateQRCode from "./generate-qrcode";
import SignCertificate from "./sign-certificate";
import TokenizeCertificate from "./tokenize";
import FinalPreview from "./final-preview";

interface Props {
  artPiece: any;
  activeIndex: number;
  setActiveIndex: (args: number) => void;
}
const NewCoa_Steps: React.FC<Props> = ({
  artPiece,
  activeIndex,
  setActiveIndex,
}) => {
  const [steps, setSteps] = useState([
    "preview",
    "generate qr code",
    "sign COA",
    "tokenize",
    "final preview",
  ]);
  const [signatureImage, setSignatureImage] = useState<string>("");
  const [qrImage, setQrImage] = useState("");
  const [coaImg, setCoaImg] = useState(null);

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
              className={`h-[7px] w-full rounded-[23px]
               ${
                 activeIndex >= index
                   ? activeIndex === index
                     ? "bg-primary-green"
                     : "bg-primary"
                   : "bg-secondary"
                 // ? activeIndex == 2 && index == 2
                 //   ? "bg-[#00FF94]"
                 //   : "bg-primary"
                 // : "bg-secondary"
               }

              `}
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
            coaImg={coaImg}
            setCoaImg={setCoaImg}
          />,
          <GenerateQRCode
            setActiveIndex={setActiveIndex}
            artPiece={artPiece}
            key={`verification-step-${2}`}
            qrImage={qrImage}
            setQrImage={setQrImage}
          />,
          <SignCertificate
            setActiveIndex={setActiveIndex}
            artPiece={artPiece}
            qrImage={qrImage}
            key={`verification-step-${3}`}
            coaImg={coaImg}
            signatureImage={signatureImage}
            setSignatureImage={setSignatureImage}
          />,
          <TokenizeCertificate
            setActiveIndex={setActiveIndex}
            artPiece={artPiece}
            coaImg={coaImg}
            qrImage={qrImage}
            signatureImage={signatureImage}
            key={`verification-step-${4}`}
          />,
          <FinalPreview
            setActiveIndex={setActiveIndex}
            artPiece={artPiece}
            qrImage={qrImage}
            coaImg={coaImg}
            signatureImage={signatureImage}
            key={`verification-step-${4}`}
          />,
        ][activeIndex]
      }
    </Stack>
  );
};

export default NewCoa_Steps;
