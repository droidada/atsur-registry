import React from "react";
import { Document, Page, View, Text, Image, Svg } from "@react-pdf/renderer";
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
            "border-t-[1px]  w-[670px] border-x-[1px] border-primary font-brawler  flex flex-col",
          )}
        >
          <View
            style={tw("px-[55px]  pb-2 pt-[41px] flex justify-between gap-4")}
          >
            <View style={tw("max-w-[450px]")}>
              <View style={tw(" pb-6  pr-4 ")}>
                <Text
                  style={tw(
                    "font-bodrum-sans-18  text-[30px] leading-[30px] font-[800]",
                  )}
                >
                  CERTIFICATE OF AUTHENCITY
                </Text>
              </View>
              {/* <Svg>
                <Line>
              </Svg> */}
              <View
                style={tw(
                  "flex mt-5 mt-[20px] flex-col gap-2 font-bold tracking-[10%] text-sm uppercase font-brawler",
                )}
              >
                <View style={tw(" flex flex-row gap-2  ")}>
                  <Text
                    style={tw(
                      "text-[#CAAA62] text-sm uppercase font-brawler tracking-[10%]",
                    )}
                  >
                    TITLE OF ARTWORK:{" "}
                  </Text>{" "}
                  <Text> {title}</Text>
                </View>
                <View style={tw(" flex flex-row gap-2  ")}>
                  <Text
                    style={tw(
                      "text-[#CAAA62] text-sm uppercase font-brawler tracking-[10%]",
                    )}
                  >
                    ARTIST NAME:{" "}
                  </Text>
                  <Text> {artistName}</Text>
                </View>
                <View style={tw(" flex flex-row gap-2  ")}>
                  <Text
                    style={tw(
                      "text-[#CAAA62] text-sm uppercase font-brawler tracking-[10%]",
                    )}
                  >
                    YEAR OF CREATION:{" "}
                  </Text>
                  <Text> {yearOfCreation}</Text>
                </View>
                <View style={tw(" flex flex-row gap-2  ")}>
                  <Text
                    style={tw(
                      "text-[#CAAA62] text-sm uppercase font-brawler tracking-[10%]",
                    )}
                  >
                    TYPE:{" "}
                  </Text>
                  <Text> {type}</Text>
                </View>
                <View style={tw(" flex flex-row gap-2  ")}>
                  <Text
                    style={tw(
                      "text-[#CAAA62] text-sm uppercase font-brawler tracking-[10%]",
                    )}
                  >
                    MEDIUM:{" "}
                  </Text>
                  <Text> {medium}</Text>
                </View>
                <View style={tw(" flex flex-row gap-2  ")}>
                  <Text
                    style={tw(
                      "text-[#CAAA62] text-sm uppercase font-brawler tracking-[10%]",
                    )}
                  >
                    SIZE:{" "}
                  </Text>
                  <Text> {size}</Text>
                </View>
              </View>
            </View>
            <View>
              <Image src={image} style={tw("w-[200px] h-[200px]")} />
            </View>
          </View>

          <View style={tw("flex flex-row justify-between")}></View>
          <Image src={"/border-bottom.png"} style={tw("w-[670px] h-[50px]")} />
        </View>
      </Page>
    </Document>
  );
};

export default PdfCertificate;
