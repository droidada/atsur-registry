import React from "react";
import { Document, Page, View, Text, Image } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";

interface Props {
  title: string;
  artistName: string;
  yearOfCreation: string;
  type: string;
  medium: string;
  size: string;
  image: string;
  signatureImage?: string;
  qrCodeImage?: string;
}
const PdfCertificate: React.FC<Props> = ({
  title,
  artistName,
  yearOfCreation,
  type,
  medium,
  size,
  image,
  signatureImage,
  qrCodeImage,
}) => {
  console.log("This is from pdf", title);

  const tw = createTw({
    theme: {
      fontFamily: {
        brawler: ["Brawler", "sans-serif"],
        "bodrum-sans-11": ['"Bodrum Sans 11"', "sans-serif"],
        "bodrum-sans-10-hair": ['"Bodrum Sans 10 Hair"', "sans-serif"],
        "bodrum-sans-12-extra-light-ita": [
          '"Bodrum Sans 12 Extra Light Ita"',
          "sans-serif",
        ],
        "bodrum-sans-13": ['"Bodrum Sans 13"', "sans-serif"],
        "bodrum-sans-14": ['"Bodrum Sans 14"', "sans-serif"],
        "bodrum-sans-15": ['"Bodrum Sans 15"', "sans-serif"],
        "bodrum-sans-16": ['"Bodrum Sans 16"', "sans-serif"],
        "bodrum-sans-17-extra-bold-ita": [
          '"Bodrum Sans 17 Extra Bold Ita"',
          "sans-serif",
        ],
        "bodrum-sans-18": ['"Bodrum Sans 18"', "sans-serif"],
        "bodrum-sans-19": ['"Bodrum Sans 19"', "sans-serif"],
      },
    },
    extend: {
      colors: {
        primary: "#000000",
        secondary: "#D9D9D9",
        "primary-gray": "#AFADAD",
        "secondary-white": "#F3F3F3",
        "primary-green": "#00FF94",
        golden: "#CAAA62",
        gold: {
          50: "#fffaf0",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
        },
      },
      backgroundImage: (theme) => ({
        "gold-gradient": `linear-gradient(135deg, ${theme(
          "colors.gold.300",
        )} 0%, ${theme("colors.gold.500")} 25%, ${theme(
          "colors.gold.700",
        )} 50%, ${theme("colors.gold.500")} 75%, ${theme(
          "colors.gold.300",
        )} 100%)`,
      }),
    },
  });
  return (
    <Document>
      <Page wrap={false} style={tw("font-brawler bg-red-500")}>
        <View
          style={tw(
            "border-t-[1px] w-[670px] border-x-[1px] border-primary font-brawler  flex flex-co",
          )}
        >
          <View
            style={tw("px-[55px]  pb-2 pt-[41px] flex justify-between gap-4")}
          >
            <View style={tw(" max-w-[450px]")}>
              <View style={tw(" pb-6 border-b-[1px] pr-4 border-[#CAAA62]")}>
                <Text
                  style={tw(
                    "font-bodrum-sans-18  text-[30px] leading-[30px] font-[800]",
                  )}
                >
                  CERTIFICATE OF
                </Text>
                <Text
                  style={tw(
                    "font-bodrum-sans-18  text-[30px] leading-[30px] font-[800]",
                  )}
                >
                  AUTHENCITY
                </Text>
              </View>
              <View
                style={tw(
                  "flex mt-5 flex-col font-bold tracking-[10%] text-sm uppercase font-brawler",
                )}
              >
                <View style={tw(" flex flex-row gap-2  ")}>
                  <Text
                    style={tw(
                      "text-golden text-sm uppercase font-brawler tracking-[10%]",
                    )}
                  >
                    TITLE OF ARTWORK:{" "}
                  </Text>{" "}
                  <Text> {title}</Text>
                </View>
                {/* <h4 className="   ">
                    <span className="text-golden">ARTIST NAME: </span>{" "}
                    {artistName}
                  </h4>
                  <h4 className="   ">
                    <span className="text-golden">YEAR OF CREATION: </span>{" "}
                    {yearOfCreation}
                  </h4>
                  <h4 className="   ">
                    <span className="text-golden">TYPE: </span> {type}
                  </h4>
                  <h4 className="   ">
                    <span className="text-golden">MEDIUM: </span> {medium}
                  </h4>
                  <h4 className="   ">
                    <span className="text-golden">SIZE: </span> {size}
                  </h4> */}
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PdfCertificate;
