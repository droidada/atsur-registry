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
  coaType: "new" | "existing";
}

const NewCoa_Steps: React.FC<Props> = ({
  artPiece,
  activeIndex,
  setActiveIndex,
  coaType,
}) => {
  const role = artPiece?.custodian.role;
  const [steps, setSteps] = useState<string[]>([]);
  const [signatureImage, setSignatureImage] = useState<string>("");
  const [qrImage, setQrImage] = useState("");
  const [coaImg, setCoaImg] = useState(null);

  useEffect(() => {
    if (role === "artist") {
      setSteps([
        "preview",
        "generate qr code",
        "sign COA",
        "tokenize",
        "final preview",
      ]);
    } else {
      setSteps(["preview", "generate qr code", "tokenize", "final preview"]);
      // Adjust activeIndex if it's out of bounds for non-artist role
      if (activeIndex >= 2) {
        setActiveIndex(activeIndex - 1);
      }
    }
  }, [role, setActiveIndex]);

  const renderStep = () => {
    const commonProps = {
      setActiveIndex,
      artPiece,
      qrImage,
      signatureImage,
      coaType,
      coaImg,
    };

    switch (activeIndex) {
      case 0:
        return (
          <VericationConfirmPreview {...commonProps} setCoaImg={setCoaImg} />
        );
      case 1:
        return <GenerateQRCode {...commonProps} setQrImage={setQrImage} />;
      case 2:
        if (role === "artist") {
          return (
            <SignCertificate
              {...commonProps}
              setSignatureImage={setSignatureImage}
            />
          );
        } else {
          return <TokenizeCertificate {...commonProps} />;
        }
      case 3:
        if (role === "artist") {
          return <TokenizeCertificate {...commonProps} />;
        } else {
          return <FinalPreview {...commonProps} />;
        }
      case 4:
        return <FinalPreview {...commonProps} />;
      default:
        return null;
    }
  };

  return (
    <Stack spacing={4}>
      <h2 className="font-semibold capitalize text-xl md:text-2xl lg:text-[30px] lg:leading-[40px]">
        {steps[activeIndex]}
      </h2>
      <div className="overflow-x-auto flex gap-2 w-full ">
        {steps.map((item, index) => (
          <div
            key={`active-bar-${item}`}
            className="flex-shrink-0 flex flex-col max-w-[152px] w-full gap-2"
          >
            <span
              className={`capitalize text-[15px] leading-[17px] ${
                activeIndex === index ? "font-bold" : ""
              }`}
            >
              {item}
            </span>
            <span
              className={`h-[7px] w-full rounded-[23px] ${
                activeIndex >= index
                  ? activeIndex === index
                    ? "bg-primary-green"
                    : "bg-primary"
                  : "bg-secondary"
              }`}
            />
          </div>
        ))}
      </div>
      {renderStep()}
    </Stack>
  );
};

export default NewCoa_Steps;
