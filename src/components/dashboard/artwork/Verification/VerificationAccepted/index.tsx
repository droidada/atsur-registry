import { Button, Stack } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import NewCoaSteps from "./NewCoaSteps";
import ExistingCoaSteps from "./ExistingCoaSteps";
import { artRoles, rarityTypes } from "@/types/index";

export const getCertificateText = ({ artPiece }) => {
  console.log("getting text for artpiece here ", artPiece.verification);
  const role = artPiece?.verification?.custodian.role;
  const rarity =
    artPiece?.rarity === rarityTypes.UNIQUE
      ? "one of a kind"
      : artPiece.rarity === rarityTypes.LIMITED_EDITION
      ? "limited edition"
      : artPiece.rarity === rarityTypes.OPEN_EDITION
      ? "open edition"
      : "";
  const custodianName = artPiece?.verification?.custodian[
    artPiece?.verification?.custodian.role
  ].organization?._id
    ? artPiece?.verification?.custodian?.organization?.name
    : `${artPiece.custodian?.firstName} ${artPiece.custodian?.lastName}`;

  console.log(
    `getCertificateText ----- role: ${role}   rarity: ${rarity}    custodianName: ${custodianName}`,
  );

  switch (role) {
    case artRoles.ARTIST: {
      return (
        <>
          <p style={{ fontSize: "1.1rem" }}>
            This certificate certifies that this an original {`${rarity}`} piece
            certified by the artist.{" "}
          </p>
        </>
      );
    }
    case artRoles.COLLECTOR: {
      return (
        <>
          <p style={{ fontSize: "1.1rem" }}>
            This certificate certifies that <h2>{`${custodianName}`}</h2> is the
            owner of this an original {`${rarity}`} art piece.{" "}
          </p>
        </>
      );
    }
    case artRoles.INSTITUTION: {
      return (
        <>
          <p style={{ fontSize: "1.1rem" }}>
            This certificate certifies that <h2>{`${custodianName}`}</h2> is the{" "}
            <b>authorized custodian</b> of this an original {`${rarity}`} art
            piece as certified by the artist.
          </p>
        </>
      );
    }
    case artRoles.BROKER: {
      return (
        <>
          <p style={{ fontSize: "1.1rem" }}>
            This certificate certifies that <h2>{`${custodianName}`}</h2> is the{" "}
            <b>authorized broker</b> for this original {`${rarity}`} art piece
            as certified by the artist.{" "}
          </p>
        </>
      );
    }
  }
  return <></>;
};

interface Props {
  artPiece: any;
}

const types = [
  {
    title: "New",
    value: "new",
    image: "/images/artist.png",
    text: "I want to issue a new certificate of authenticity",
  },
  {
    title: "Existing",
    value: "existing",
    image: "/images/dealer.png",
    text: "I want to add a certificate of authenticity I already have.",
  },
];

const VerificationAccepted: React.FC<Props> = ({ artPiece }) => {
  const [coaType, setCoaType] = useState<"new" | "existing">(
    artPiece?.artPiece?.existingCOA ? "existing" : "new",
  );
  const [proceed, setProceed] = useState(
    artPiece?.artPiece?.existingCOA ||
      artPiece?.artPiece?.signedCOA ||
      artPiece?.artPiece?.draftCOA,
  );
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // if(artPiece?.artPiece?.existingCOA || artPiece?.artPiece?.signedCOA || artPiece?.artPiece?.draftCOA){
    //   setProceed(true);
    // }
    // if (artPiece?.artPiece?.existingCOA) {
    //   setCoaType("existing");
    // }
    if (artPiece?.artPiece?.signedCOA) {
      setActiveIndex(4);
    } else if (artPiece?.artPiece?.draftCOA) {
      setActiveIndex(3);
    }
  }, [artPiece?.artPiece]);

  return (
    <>
      {!proceed && (
        <Stack className="mt-8 items-center" spacing={4}>
          <br />
          <h2 className="text-[75px] w-fi leading-[57px] font-[600] center">
            Congratulations!!
          </h2>
          <h2 className="text-[35px] w-fi leading-[57px] font-[400] center">
            Your artwork has been Verified!
          </h2>
          <h3 className="text-[20px] w-fi leading-[14px] font-[200] center">
            How did you want to proceed with the{" "}
            <span className="font-[500]">Certificate Of Authenticity</span>?
          </h3>
          <div className="flex gap-4 md:items-start justify-between items-center lg:flex-nowrap flex-wrap">
            {types?.map((item, index) => (
              <div
                className={`flex flex-col items-center gap-2 hover:border-2 duration-500 ease-in-out hover:border-primary hover:p-2 cursor-pointer ${
                  item.value === coaType && "border-2 p-2 border-primary"
                }`}
                key={`selectedCoaType-${index}`}
              >
                <div
                  onClick={() => {
                    // @ts-ignore
                    setCoaType(item.value);
                  }}
                  className={`w-full max-w-[201px] h-[190px]  relative bg-secondary `}
                >
                  <Image
                    width={201}
                    height={190}
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p>{item?.title}</p>
              </div>
            ))}
          </div>
          <h2 className="text-[25px] w-fi leading-[17px] font-[300] center">
            {`${types.find((x) => x.value === coaType)?.text}`}
          </h2>
          <div className="w-full flex justify-center mt-8 mx-auto">
            <Button
              disabled={!coaType}
              onClick={() => setProceed(true)}
              className="h-[46px] max-w-[339px] w-full bg-primary text-white text-sm leading-[16px]"
            >
              Next
            </Button>
          </div>
        </Stack>
      )}
      {proceed && coaType === "new" && (
        <NewCoaSteps
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          artPiece={artPiece}
        />
      )}
      {proceed && coaType === "existing" && (
        <ExistingCoaSteps
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          artPiece={artPiece}
        />
      )}
    </>
  );
};

export default VerificationAccepted;
