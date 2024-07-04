import IArtistDetails from "@/types/models/artistDetails";
import React from "react";
import HeroSection from "./HeroSection";
import { Button, Divider, IconButton, Rating, Stack } from "@mui/material";
import { IoMdLink } from "react-icons/io";
import Link from "next/link";
import { IoShareOutline } from "react-icons/io5";
import { CgMoreAlt } from "react-icons/cg";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { TiSocialLinkedinCircular } from "react-icons/ti";
import { IoLogoFacebook } from "react-icons/io5";
import RightSection from "./RightSection";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

interface Props {
  artist: IArtistDetails;
}
const ArtistDetailsPage: React.FC<Props> = ({ artist }) => {
  const { data: session } = useSession();
  console.log(artist);
  const checkUser = session?.user?._id === artist?._id;
  const router = useRouter();

  return (
    <>
      <HeroSection
        backgroundImg={artist?.backgroundImage}
        avatar={artist?.avatar}
        name={`${artist?.firstName} ${artist?.lastName}`}
      />
      <Stack
        className="gap-"
        spacing={7}
        direction={{ xs: "column", md: "row" }}
      >
        <Stack
          spacing={4}
          direction={"column"}
          alignItems={"center"}
          className="mt-[15%] lg:mt-[10%]"
        >
          <Stack direction={"column"} alignItems={"center"}>
            <h1 className=" text-2xl md:text-4xl lg:text-[50px] lg:leading-[70px]">
              {artist?.firstName} {artist.lastName}
            </h1>
            <div className="flex gap-3 items-center">
              <span className="text-lg font-[600]">Nigeria, 50 followers</span>
              {/* <Rating
                size="small"
                readOnly
                value={4}
                className="bg-secondary px-2 py-1 rounded-[16px] "
              /> */}
            </div>
            <div className="flex gap-2">
              <IoMdLink />
              <Link
                className="text-sm"
                href={artist?.website || "/"}
                target={"_blank"}
              >
                {artist?.website}
              </Link>
            </div>
          </Stack>

          <div className="flex flex-col gap-4">
            <Stack direction={"row"} spacing={1}>
              <Button className="bg-primary rounded-[37px] text-white text-[20px] leading-[16px] px-4 h-[44px] font-[600px]">
                Follow
              </Button>
              <IconButton className="bg-secondary w-[43px] h-[43px]">
                <IoShareOutline />
              </IconButton>
              <IconButton className="bg-secondary w-[43px] h-[43px]">
                <CgMoreAlt />
              </IconButton>
            </Stack>
            <span className="w-full h-[1px] bg-secondary" />
          </div>
          <Stack alignItems={"center"} direction="row">
            <IconButton className="w-[43px] h-[43px] text-secondary">
              <FaInstagram size={43} />
            </IconButton>
            <IconButton className="w-[43px] h-[43px] text-secondary">
              <IoLogoFacebook size={43} />
            </IconButton>
            <IconButton className="w-[43px] h-[43px] text-secondary">
              <FaXTwitter size={43} />
            </IconButton>
            <IconButton className="w-[43px] h-[43px] text-secondary">
              <TiSocialLinkedinCircular size={43} />
            </IconButton>
          </Stack>
          {checkUser && (
            <Button
              variant="contained"
              onClick={() => router.push("/dashboard/settings")}
              className="bg-primary text-white rounded-full"
            >
              Edit Profile
            </Button>
          )}
        </Stack>

        <RightSection artist={artist} />
      </Stack>
    </>
  );
};

export default ArtistDetailsPage;
