import { useEffect, useState } from "react";
import ProtectedPage from "@/HOC/Protected";
import { Stack } from "@mui/material";
import IllustrationForm from "@/components/dashboard/artwork/create/IllustrationForm";
import ICreateArtworkFormData from "@/types/models/createArtwork";
import AssetsForm from "@/components/dashboard/artwork/create/AssetForm";
import CreateArtworkPreview from "@/components/dashboard/artwork/create/Preview";
import { axiosAuth as axios } from "@/lib/axios";
import { getToken } from "next-auth/jwt";
import PricingForm from "@/components/dashboard/artwork/create/Pricing";

export const getServerSideProps = async ({ req, query, params }) => {
  try {
    const { id } = params;
    const token: any = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    console.log(id);
    const res = await axios.get(`/art-piece/${id}`, {
      headers: { authorization: `Bearer ${token?.accessToken}` },
    });

    return { props: { artPiece: res.data.artPiece } };
  } catch (error) {
    console.error("error here looks like ", error);
    if (error?.response?.status === 404) {
      return {
        notFound: true,
      };
    }
    throw new Error(error);
  }
};

function EditArtpiece({ artPiece }) {
  console.log(artPiece?.price);
  console.log(artPiece);
  const [activeIndex, setActiveIndex] = useState(0);
  const handleOnClick = (index) => {
    setActiveIndex(index);
  };

  const [formData, setFormData] = useState<ICreateArtworkFormData>({
    illustration: {
      ...artPiece,
      // withFrame: artPiece?.withFrame,
    },
    assets: {
      primaryViewLandscape: artPiece?.assets?.find((asset) =>
        asset.url.includes("primary"),
      )?.url,
      secondaryView: {
        primaryViewPortrait: artPiece?.assets?.find((asset) =>
          asset.url.toLowerCase().includes("left"),
        )?.url,
        framedView: artPiece?.assets?.find((asset) =>
          asset.url.toLowerCase().includes("right"),
        )?.url,
        mountedView: artPiece?.assets?.find((asset) =>
          asset.url.toLowerCase().includes("mounted"),
        )?.url,
      },
    },
  });

  console.log(formData);
  return (
    <Stack spacing={4}>
      <h1 className="font-semibold text-2xl lg:text-[30px] lg:leading-[40px]">
        Edit Artwork
      </h1>
      <Stack direction={"row"} className="overflow-x-auto " spacing={2}>
        {["Metadata", "Assets", "Price", "Preview"].map((item, index) => (
          <div
            key={`active-bar-${item}`}
            className="flex-shrink-0 lg:flex-shrink flex flex-col max-w-[312px] w-full gap-2"
          >
            <span
              className={`text-[20px] capitalize leading-[20px] ${
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
      </Stack>

      <div>
        {
          [
            <IllustrationForm
              key={0}
              setActiveIndex={setActiveIndex}
              setFormData={setFormData}
              formData={formData}
            />,
            <AssetsForm
              key={1}
              setActiveIndex={setActiveIndex}
              setFormData={setFormData}
              formData={formData}
            />,
            <PricingForm
              key={4}
              setActiveIndex={setActiveIndex}
              setFormData={setFormData}
              formData={formData}
            />,
            <CreateArtworkPreview
              key={2}
              isUpdate
              artworkId={artPiece?._id}
              setActiveIndex={setActiveIndex}
              setFormData={setFormData}
              formData={formData}
            />,
          ][activeIndex]
        }
      </div>
    </Stack>
  );
}

export default ProtectedPage(EditArtpiece);
