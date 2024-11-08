import { Button, Stack } from "@mui/material";
import Image from "next/image";
import React, { useEffect } from "react";

interface Props {
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  setSelectedInformationAdd: React.Dispatch<
    React.SetStateAction<"artist" | "broker" | "collector" | "institution">
  >;
  selectedInformationAdd: "artist" | "broker" | "collector" | "institution";
  isArtistBroker: boolean;
  setIsArtistBroker: (arg: boolean) => void;
}

const informationToAdd = [
  {
    title: "Artist",
    value: "artist",
    image: "/images/artist.png",
    text: "I am the artist and creator of the piece",
  },
  {
    title: "Broker",
    value: "broker",
    image: "/images/dealer.png",
    text: "I am the gallery or broker representing the artist to sell",
  },
  {
    title: "Collector",
    value: "collector",
    image: "/images/collector.png",
    text: "I purchased this piece from the artist or representative",
  },
  {
    title: "Institution",
    value: "institution",
    image: "/images/institution.png",
    text: "I am an institution holding the piece on behalf of the artist or representative",
  },
];

const ArtVerificationAquisition: React.FC<Props> = ({
  setActiveIndex,
  setSelectedInformationAdd,
  isArtistBroker,
  setIsArtistBroker,
  selectedInformationAdd,
}) => {
  useEffect(() => {
    if (isArtistBroker) setSelectedInformationAdd("artist");
  }, [isArtistBroker, setSelectedInformationAdd]);

  return (
    <Stack className="mt-8 items-center" spacing={4}>
      <h2 className="text-[20px] w-fi leading-[17px] font-[600] center">
        How did you come to be a custodian of this piece?
      </h2>
      <div className="flex gap-4 md:items-start justify-between items-center lg:flex-nowrap flex-wrap">
        {informationToAdd?.map((item, index) => (
          <div
            className={`flex flex-col items-center gap-2  duration-500 ease-in-out  cursor-pointer ${
              item.value === selectedInformationAdd &&
              "border-2 p-2 border-primary"
            }`}
            key={`informationToAdd-${index}`}
          >
            <div
              onClick={() => {
                // @ts-ignore
                setSelectedInformationAdd(item.value);
                if (item.value !== "artist") {
                  setIsArtistBroker(false);
                }
              }}
              className={`w-full max-w-[201px] h-[190px] group  relative bg-secondary `}
            >
              <Image
                width={201}
                height={190}
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="group-hover:font-bold">{item?.title}</p>
          </div>
        ))}
      </div>
      <h2 className="text-[25px] w-fi leading-[17px] font-[300] center">
        {`${
          informationToAdd.find((x) => x.value === selectedInformationAdd)
            ?.text || informationToAdd[0].text
        }`}
      </h2>
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
