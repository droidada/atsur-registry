import IArtistDetails from "@/types/models/artistDetails";
import React from "react";
import HeroSection from "./HeroSection";
import {
  Avatar,
  Button,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Paper,
  Rating,
  Stack,
} from "@mui/material";
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
import { useMutation } from "@tanstack/react-query";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { useToast } from "@/providers/ToastProvider";
import LoadingButton from "@/components/Form/LoadingButton";
import { TbMessage } from "react-icons/tb";

interface Props {
  artist: IArtistDetails;
}
const ArtistDetailsPage: React.FC<Props> = ({ artist }) => {
  const { data: session, status } = useSession();

  const checkUser = session?.user?._id === artist?._id;
  const router = useRouter();
  const axiosAuth = useAxiosAuth();
  const toast = useToast();

  const { data, mutate, isLoading } = useMutation({
    // @ts-ignore
    mutationFn: () => {
      if (status === "unauthenticated") {
        toast("You need to login before you can follow a user");
        return router.push(`/login?callbackUrl=${router.asPath}`);
      } else {
        return artist?.isFollowing
          ? axiosAuth.post(`/user/unfollow/${artist?._id}`)
          : axiosAuth.post(`/user/follow/${artist?._id}`);
      }
    },
    onSuccess: (data) => {
      console.log(data);
      toast.success(
        artist?.isFollowing
          ? "You have unfollowed this user"
          : "You are now following this user",
      );
      router.replace(router.asPath);
    },
    onError: (error: any) => {
      console.log(error?.response?.data);
    },
  });

  function MoreOptionButton() {
    const { mutate } = useMutation({
      mutationFn: () =>
        axiosAuth.post(`/conversation/start-conversation/`, {
          participantId: artist?._id,
        }),
      onSuccess: (data) => {
        console.log(data);
        router.push(`/dashboard/messages/${data?.data?.conversation?._id}`);
      },
    });
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <>
        <IconButton
          id="basic-button"
          aria-controls={"basic-menu"}
          aria-haspopup="true"
          aria-expanded={"true"}
          onClick={handleClick}
          className="bg-secondary w-[43px] h-[43px]"
        >
          <CgMoreAlt />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuList>
            <MenuItem onClick={() => mutate()}>
              <ListItemIcon>
                <TbMessage />
              </ListItemIcon>
              <ListItemText>Send Message</ListItemText>
            </MenuItem>
          </MenuList>
        </Menu>
      </>
    );
  }

  return (
    <>
      <HeroSection
        backgroundImg={artist?.backgroundImage}
        avatar={artist?.avatar}
        name={`${artist?.firstName} ${artist?.lastName}`}
      />
      <div className="flex-col flex md:flex-row gap-12 justify-between ">
        <Stack
          direction={"column"}
          alignItems={"center"}
          className="flex-shrink-0 w-[30%]"
        >
          <Avatar
            className=" w-[150px] h-[150px]  md:w-[204px] md:h-[204px] bottom-20 "
            src={artist?.avatar}
            alt={`${artist?.firstName} ${artist?.lastName}`}
          />
          <Stack
            direction={"column"}
            className="bottom-10 relative"
            alignItems={"center"}
            spacing={1}
          >
            <h1 className=" text-2xl md:text-4xl lg:text-[50px]  ">
              {artist?.firstName} {artist.lastName}
            </h1>
            <div className="flex items-center">
              <span className="text-lg font-[600]">
                Nigeria, {artist?.follower} follower
                {artist?.follower > 1 ? "s" : ""}
              </span>
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
              {session?.user?._id !== artist?._id && (
                <LoadingButton
                  loading={isLoading}
                  onClick={() => mutate()}
                  className="bg-primary rounded-[37px] text-white text-[20px]  px-4 h-[44px] font-[600px]"
                >
                  {artist?.isFollowing ? "Unfollow" : "Follow"}
                </LoadingButton>
              )}
              <IconButton className="bg-secondary w-[43px] h-[43px]">
                <IoShareOutline />
              </IconButton>
              <MoreOptionButton />
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
      </div>
    </>
  );
};

export default ArtistDetailsPage;
