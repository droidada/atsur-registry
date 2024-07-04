import { useEffect, useState } from "react";
import { getToken } from "next-auth/jwt";
import axios from "@/lib/axios";
import axiosMain from "axios";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IArtist } from "@/types/models";

import useAxiosAuth from "@/hooks/useAxiosAuth";
import { useRouter } from "next/router";
import { useToast } from "@/providers/ToastProvider";
import ProtectedPage from "@/HOC/Protected";
import {
  Avatar,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fade,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import SearchBar from "@/components/layout/DashboardLayout/SearchBar";
import { FaCircle } from "react-icons/fa";
import Image from "next/image";
import moment from "moment";
import { SlLink } from "react-icons/sl";
import {
  MdLocationPin,
  MdMailOutline,
  MdOutlineLocalPhone,
} from "react-icons/md";
import { useSession } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import NoData from "@/components/dashboard/NoData";
import { IoMdMore } from "react-icons/io";
import InviteesTable from "@/components/dashboard/organization/InviteeTable";
import MembersTable from "@/components/dashboard/organization/MembersTable";
import CreateOrganizationDialog from "@/components/dashboard/organization/CreateOrganizationDialog";
import InviteMemberDialog from "@/components/dashboard/organization/inviteMemberDialog";
import OrganizationArtworks from "@/components/dashboard/organization/OrganizationArtworks";

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
  // const [members, setMembers] = useState<IArtist[]>([]);
  const [listedUsers, setListedUsers] = useState<IArtist[]>([]);
  const axiosAuth = useAxiosAuth();
  const router = useRouter();
  const toast = useToast();
  const { data: session } = useSession();
  const [currentTab, setCurrentTab] = useState(0);

  const [verificationStatus, setVerificationStatus] = useState(false);
  const [members, setMembers] = useState<any>([]);
  const [invitees, setInvitees] = useState<any>([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openAddMemberDialog, setOpenAddMemberDialog] = useState(false);

  useEffect(() => {
    const mainMembers = organizations?.members?.filter(
      (member) => member?.invitation?.invitationAccepted,
    );
    const invitedMembers = organizations?.members?.filter(
      (member) => member?.invitation && !member?.invitation?.invitationAccepted,
    );

    setMembers(mainMembers);
    setInvitees(invitedMembers);
  }, [organizations]);

  return (
    <>
      <Stack spacing={4}>
        <SearchBar />
        <div className="flex gap-4">
          <div className="flex gap-2 items-start">
            <div
              className={`flex gap-2 items-center  ${
                verificationStatus === true
                  ? "text-[#18BAFF] font-[600]"
                  : "text-secondary"
              }`}
            >
              <FaCircle />{" "}
              <span>
                {verificationStatus === true ? "Verified" : "Unverified"}
              </span>
            </div>
          </div>
          {!verificationStatus && (
            <Button variant="contained" className="bg-primary text-white">
              Start KYC Verification
            </Button>
          )}
        </div>
        <div className="flex gap-7 items-center bg-secondary-white p-5">
          <div className="max-w-[121.74px] w-full h-[159.48px] relative">
            <Image
              alt={organizations?.name}
              src={organizations?.image}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-2 ">
            <h1 className="text-[35px] leading-[16px] font-[300]">
              {organizations?.name}
            </h1>
            <div className="flex font-[300] mt-4 text-[12px] leading-[13px] gap-2">
              <MdOutlineLocalPhone />
              <span>{organizations?.phone}</span>
            </div>
            <div className="flex font-[300] text-[12px] leading-[13px] gap-2">
              <MdLocationPin />
              <span>{organizations?.address}</span>
            </div>
            <div className="flex font-[300] text-[12px] leading-[13px] gap-2">
              <MdMailOutline />
              <span>{organizations?.email}</span>
            </div>
            <div className="flex font-[300] text-[12px] leading-[13px] gap-2">
              <SlLink />
              <span>{organizations?.website}</span>
            </div>
            <div className="flex font-[300] text-[12px] leading-[13px] gap-2">
              <FaRegCalendarAlt />
              <span>
                {moment(organizations?.createdAt).format("Do MMM, YYYY")}
              </span>
            </div>
            {organizations?.creator?.id === session?.user?._id && (
              <div className="flex mt-2 gap-4">
                <Button
                  onClick={() => setOpenEditDialog(true)}
                  variant="contained"
                  className="bg-primary w-[152.14px] h-[39.71px]"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => setOpenDeleteDialog(true)}
                  variant="contained"
                  className="bg-[#FF0000] text-[12px] h-[39.71px]"
                >
                  Delete Organization
                </Button>
              </div>
            )}
          </div>
        </div>

        <div
          className={`flex gap-4 ${
            organizations?.creator?.id === session?.user?._id
              ? "border-b-2"
              : "border-b-0"
          }  `}
        >
          {organizations?.creator?.id === session?.user?._id ? (
            ["Members", "Invitees", "Artworks"].map((item, index) => (
              <div
                key={item}
                onClick={() => setCurrentTab(index)}
                className="relative text-[20px] leading-[19px] font-[300] cursor-pointer pb-2"
              >
                {item}
                {currentTab == index && (
                  <span className="h-[5px] w-full absolute -bottom-1 bg-primary left-0" />
                )}
              </div>
            ))
          ) : (
            <h2 className="text-[20px] leading-[19px] font-[300]">Members</h2>
          )}
        </div>
        {/* <h2 className="">Members</h2> */}
        <div className="bg-secondary-white p-4 flex  flex-col gap-4">
          {organizations?.creator?.id === session?.user?._id && (
            <div className="flex gap-4">
              <Button
                onClick={() => setOpenAddMemberDialog(true)}
                variant="outlined"
                className="h-[25px] uppercase text-xs font-[400]"
              >
                Add New Member
              </Button>
            </div>
          )}

          {
            [
              <MembersTable
                creatorId={organizations?.creator?.id}
                organizationId={organizations?._id}
                members={members}
                key={`tab-1`}
              />,
              <InviteesTable
                creatorId={organizations?.creator?.id}
                organizationId={organizations?._id}
                invitees={invitees}
                key={`tab-2`}
              />,
              <OrganizationArtworks
                organizationId={organizations?._id as string}
                key={`tab-3`}
              />,
            ][currentTab]
          }
        </div>
      </Stack>
      <DeletOrganizationDialog
        open={openDeleteDialog}
        handleClose={() => setOpenDeleteDialog(false)}
        organizationId={organizations?._id}
      />
      {/* Edit the organization */}
      <CreateOrganizationDialog
        openCreateDialog={openEditDialog}
        setOpenCreateDialog={setOpenEditDialog}
        organization={organizations}
      />
      <InviteMemberDialog
        organizationId={organizations?._id}
        open={openAddMemberDialog}
        handleClose={() => setOpenAddMemberDialog(false)}
      />
    </>
  );
}
Organization.requireAuth = true;
export default ProtectedPage(Organization);

interface DeleteOrganizationDialogProps {
  open: boolean;
  handleClose: () => void;
  organizationId: string;
}
const DeletOrganizationDialog: React.FC<DeleteOrganizationDialogProps> = ({
  open,
  handleClose,
  organizationId,
}) => {
  const toast = useToast();
  const axiosAuth = useAxiosAuth();
  const router = useRouter();
  const { mutate, isLoading } = useMutation({
    mutationFn: () => axiosAuth.delete(`/org/${organizationId}`),
    onSuccess: () => {
      toast.success("Organization deleted successfully");
      router.push("/dashboard/organizations");
    },
    onError: (error: any) => {
      toast.error(
        error.response.data.message || error.message || "Something went wrong",
      );
    },
  });
  return (
    <Dialog
      maxWidth={"md"}
      className="w-full max-w-[650px] mx-auto"
      PaperComponent={Paper}
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>Delete Organization</DialogTitle>
      <DialogContent dividers>
        Are you sure you want to delete this Organization?
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleClose} autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
