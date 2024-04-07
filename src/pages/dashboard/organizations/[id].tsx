import { useEffect, useState } from "react";
import { Menu } from "@headlessui/react";
import Link from "next/link";

import BarChart from "@/open9/elements/BarChart";
import DashboardLayoutWithSidebar, {
  DashboardPages,
} from "@/components/open9/layout/DashboardLayoutWithSidebar";
import AutoSlider1 from "@/open9/slider/AutoSlider1";
import AutoSlider2 from "@/open9/slider/AutoSlider2";
import { getToken } from "next-auth/jwt";
import axios from "@/lib/axios";
import axiosMain from "axios";
import { Button } from "@mui/base";
import DeleteDialog from "@/components/dashboard/DeleteDialog";
import EditOrganization from "@/components/dashboard/edit-organization";
import Image from "next/image";
import { RiDeleteBin7Fill } from "react-icons/ri";
import {
  Avatar,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { FaUser } from "react-icons/fa";
import { IArtist } from "@/types/models";
import InviteArtist from "@/components/invite-artist";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { useRouter } from "next/router";
import { LoadingButton } from "@mui/lab";
import { useToast } from "@/providers/ToastProvider";

export const getServerSideProps = async ({ req, query }) => {
  try {
    const id = query?.id;
    const token: any = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });
    const res = await axios.get(`/org/${id}`, {
      headers: { authorization: `Bearer ${token?.accessToken}` },
    });

    console.log(res.data);

    return { props: { organizations: res.data.organization } };
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

function Organization({ organizations }) {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [members, setMembers] = useState<any[]>([]);
  const [listedUsers, setListedUsers] = useState<IArtist[]>([]);
  const [openMemberInvite, setOpenMemberInvite] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const axiosAuth = useAxiosAuth();
  const router = useRouter();
  const [currentMember, setCurrentMember] = useState("");
  const [openRemoveMember, setOpenRemoveMember] = useState(false);
  const toast = useToast();

  useEffect(() => {
    // Filter out the creator from the members
    const filterMembers = organizations.members?.filter(
      (member) => member._id !== organizations?.creator?._id,
    );
    setMembers(filterMembers);
  }, [organizations]);

  const handleAddMember = async () => {
    try {
      setLoading(true);
      const res = await Promise.all(
        listedUsers?.map(async (member) => {
          const { data } = await axiosAuth.post(
            `/org/add-member/${organizations?._id}`,
            { memberId: member?._id },
          );
        }),
      );
      router.replace(router.asPath);
      setOpenMemberInvite(false);
    } catch (error) {
      setError(true);
      if (axiosMain.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      } else {
        toast.error("Something went wrong. Please try again");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <DashboardLayoutWithSidebar hideSidebar activePage={DashboardPages.ART}>
        <div className="w-full px-4">
          <div className="row ">
            <div className="action__body w-full mb-10 rounded-xl">
              <div className="tf-tsparticles">
                <div id="tsparticles7" data-color="#161616" data-line="#000" />
              </div>
              <h2>{organizations?.name}</h2>
              <div className="flat-button flex">
                <Button
                  onClick={() => setOpenEdit(true)}
                  className="tf-button style-2 h50 w190 mr-10 rounded-xl"
                >
                  Edit
                  <i className="icon-arrow-up-right2" />
                </Button>
                <Button
                  onClick={() => setOpenDeleteDialog(true)}
                  className="tf-button style-2 h50 w230 rounded-xl"
                >
                  Delete
                  <i className="icon-arrow-up-right2" />
                </Button>
              </div>
              <div className="bg-home7">
                <AutoSlider1 />
                <AutoSlider2 />
                <AutoSlider1 />
              </div>
            </div>
            <div className="row  ">
              <div className="tf-section-2 w-full pr-0 pl-0 ">
                <div className="row px-2">
                  <div data-wow-delay="0s" className="wow fadeInLeft col-md-8">
                    <div className="tf-card-box style-5 mb-0">
                      <div className="card-media mb-0 relative h-[450px] rounded-xl">
                        <Link href="#">
                          <Image
                            fill
                            src={organizations?.image}
                            alt={organizations?.name}
                          />
                        </Link>
                      </div>
                      <h6 className="price gem">
                        <i className="icon-gem" />
                      </h6>
                      <div className="wishlist-button">
                        10
                        <i className="icon-heart" />
                      </div>
                      <div className="featured-countdown">
                        {/* <Countdown endDateTime={currentTime.setDate(currentTime.getDate() + 2)} /> */}
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 lg:mt-0 col-md-4 rounded-xl">
                    <Card sx={{ borderRadius: "12px" }} className="">
                      <CardContent>
                        <Typography gutterBottom variant="h3" component="div">
                          Organization Details
                        </Typography>
                        <Stack direction={"column"} spacing={2}>
                          <div className="flex gap-2 ">
                            <Typography variant="h5">Creator:</Typography>
                            <Typography variant="body1">
                              {organizations?.creator?.firstName}{" "}
                              {organizations?.creator?.lastName}
                            </Typography>
                          </div>
                          <div className="flex gap-2 ">
                            <Typography variant="h5">Date:</Typography>
                            <Typography variant="body1">
                              {dayjs(organizations?.createdAd).format(
                                "MMM DD, YYYY",
                              )}{" "}
                            </Typography>
                          </div>
                          <div className="flex gap-2 ">
                            <Typography variant="h5">Address:</Typography>
                            <Typography variant="body1">
                              {organizations?.address}
                            </Typography>
                          </div>
                          <div className="flex gap-2 ">
                            <Typography variant="h5">Country:</Typography>
                            <Typography variant="body1">
                              {organizations?.country}
                            </Typography>
                          </div>
                          <div className="flex gap-2 ">
                            <Typography variant="h5">Email:</Typography>
                            <Typography variant="body1">
                              {organizations?.email}
                            </Typography>
                          </div>
                          <div className="flex gap-2 ">
                            <Typography variant="h5">Phone:</Typography>
                            <Typography variant="body1">
                              {organizations?.phone}
                            </Typography>
                          </div>
                          <div className="flex gap-2 ">
                            <Typography variant="h5">Website:</Typography>
                            <Typography variant="body1">
                              {organizations?.website}
                            </Typography>
                          </div>
                        </Stack>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-4">
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
                spacing={2}
              >
                <Typography variant="h2">Organization Members</Typography>
                <Button
                  onClick={() => setOpenMemberInvite(true)}
                  className="bg-black/70 font-semibold rounded-xl"
                >
                  Add Members
                </Button>
              </Stack>
              <Card className="row  mt-3">
                {members.length > 0 ? (
                  <List>
                    {members?.map((member) => (
                      <ListItem
                        secondaryAction={
                          <IconButton
                            onClick={() => {
                              setCurrentMember(member?._id);
                              setOpenRemoveMember(true);
                            }}
                          >
                            <RiDeleteBin7Fill />
                          </IconButton>
                        }
                        key={member?._id}
                        disablePadding
                      >
                        <ListItemButton>
                          <ListItemAvatar>
                            <Avatar>
                              <FaUser />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={`${member?.firstName} ${member?.lastName}`}
                          />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <div className="h-40 grid place-items-center">
                    <p className="font-bold"> No members yet</p>
                  </div>
                )}
              </Card>
            </div>
          </div>
        </div>
      </DashboardLayoutWithSidebar>

      <Dialog
        open={openMemberInvite}
        onClose={() => setOpenMemberInvite(false)}
        title="Add Members"
      >
        <DialogContent>
          <InviteArtist
            listedArtists={listedUsers}
            setListedArtists={setListedUsers}
            label="Add Member"
            placeholder="Search for artists..."
            prompt="Add members to the organization"
          />
        </DialogContent>
        <DialogActions>
          <Button
            className="tf-button style-1 rounded-xl "
            onClick={() => setOpenMemberInvite(false)}
          >
            Cancel
          </Button>
          <LoadingButton
            sx={{ borderRadius: "12px" }}
            className="tf-button style-1 "
            loading={loading}
            disabled={listedUsers.length === 0}
            onClick={handleAddMember}
          >
            Add
          </LoadingButton>
        </DialogActions>
      </Dialog>

      <DeleteDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        deleteUrl={`/org/delete/${organizations?._id}`}
        redirectUrl={`/dashboard/organizations`}
        itemToDelete={{ itemType: "organization", itemId: "" }}
      />
      <DeleteDialog
        open={openRemoveMember}
        onClose={() => setOpenRemoveMember(false)}
        deleteUrl={`/org/remove-member/${organizations?._id}`}
        urlBody={{ memberId: currentMember }}
        prompText="Are you sure you want to remove this member?"
        itemToDelete={{ itemType: "organization", itemId: "" }}
      />

      <EditOrganization
        open={openEdit}
        handleClose={() => setOpenEdit(false)}
        organization={organizations}
      />
    </>
  );
}
Organization.requireAuth = true;
export default Organization;
