import Link from "next/link";
import Image from "@/components/common/image";
import DashboardLayout from "@/open9/layout/DashboardLayout";
import { useState } from "react";
import CreateMetadata from "@/components/dashboard/create-metadata";
import CreateAssets from "@/components/dashboard/create-assets";
import DashboardLayoutWithSidebar, {
  DashboardPages,
} from "@/components/open9/layout/DashboardLayoutWithSidebar";
import ProtectedPage from "@/HOC/Protected";
import { Stack } from "@mui/material";
import IllustrationForm from "@/components/dashboard/artwork/create/IllustrationForm";
import ICreateArtworkFormData from "@/types/models/createArtwork";
import AssetsForm from "@/components/dashboard/artwork/create/AssetForm";
import CreateArtworkPreview from "@/components/dashboard/artwork/create/Preview";

function Dashboard() {
  const [activeIndex, setActiveIndex] = useState(0);
  const handleOnClick = (index) => {
    setActiveIndex(index);
  };

  const [formData, setFormData] = useState<ICreateArtworkFormData>({
    illustration: {
      title: "",
      description: "",
      medium: "",
      subjectMatter: "",
      height: 0,
      width: 0,
      depth: 0,
      rarity: "",
      type: "",
    },
    assets: {
      primaryView: "",
      secondaryView: {
        leftAngleView: "",
        rightAngleView: "",
        mountedView: "",
      },
    },
  });

  return (
    <Stack spacing={4}>
      <h1 className="font-semibold text-2xl lg:text-[30px] lg:leading-[40px]">
        Create Artwork
      </h1>
      <Stack direction={"row"} className="overflow-x-auto " spacing={2}>
        {["illustration", "Assets", "Preview"].map((item, index) => (
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
            <CreateArtworkPreview
              key={2}
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

export default ProtectedPage(Dashboard);
