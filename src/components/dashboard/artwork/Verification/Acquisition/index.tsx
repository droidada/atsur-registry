import { Button, Stack } from "@mui/material";
import Image from "next/image";
import React from "react";

interface Props {
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  setSelectedInformationAdd: React.Dispatch<
    React.SetStateAction<"artist" | "broker" | "collector" | "institution">
  >;
  selectedInformationAdd: "artist" | "broker" | "collector" | "institution";
}

const informationToAdd = [
  { title: "Artist", value: "artist", image: "/images/artist.png" },
  { title: "Broker", value: "broker", image: "/images/dealer.png" },
  { title: "Collector", value: "collector", image: "/images/collector.png" },
  {
    title: "Institution",
    value: "institution",
    image: "/images/institution.png",
  },
];

const ArtVerificationAquisition: React.FC<Props> = ({
  setActiveIndex,
  setSelectedInformationAdd,
  selectedInformationAdd,
}) => {
  return (
    <Stack className="mt-8" spacing={4}>
      <h2 className="text-[15px] w-fi leading-[17px] font-[300]">
        How do you come about this piece?
      </h2>
      <div className="flex gap-4 md:items-start justify-between items-center lg:flex-nowrap flex-wrap">
        {informationToAdd?.map((item, index) => (
          <div
            className={`flex flex-col items-center gap-2 hover:border-2 duration-500 ease-in-out hover:border-primary hover:p-2 cursor-pointer ${
              item.value === selectedInformationAdd &&
              "border-2 p-2 border-primary"
            }`}
            key={`informationToAdd-${index}`}
          >
            <div
              onClick={() => {
                // @ts-ignore
                setSelectedInformationAdd(item.value);
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
      <div className="w-full flex justify-center mt-8 mx-auto">
        <Button
          disabled={!selectedInformationAdd}
          onClick={() => setActiveIndex(1)}
          className="h-[46px] max-w-[339px] w-full bg-primary text-white text-sm leading-[16px]"
        >
          Next
        </Button>
      </div>
    </Stack>
  );
};

export default ArtVerificationAquisition;
