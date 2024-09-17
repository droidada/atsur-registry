import React, { useState } from "react";
import { getToken } from "next-auth/jwt";
import axios from "@/lib/axios";
import AdminDashboardLayout from "@/components/layout/AdminDashboardLayout";
import {
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Paper,
  MenuItem,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";

import Image from "next/image";

import moment from "moment";

import AttachmentPreviewer from "@/components/AttachmentPreviewer";
import { useToast } from "@/providers/ToastProvider";
import { useMutation } from "@tanstack/react-query";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import InputField from "@/components/Form/InputField";
import SelectField from "@/components/Form/SelectField";
// import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/router";
import LoadingButton from "@/components/Form/LoadingButton";
import BrokerTable from "@/components/admin/verification/verificationTables/brokerTable";
import CollectorTable from "@/components/admin/verification/verificationTables/CollectorTable";
import InstitutionTable from "@/components/admin/verification/verificationTables/InstitutionTable";
import ArtitstTable from "@/components/admin/verification/verificationTables/ArtitstTable";
import { MdOutlineExpandMore } from "react-icons/md";
import Link from "next/link";

export const getServerSideProps = async ({ req, query }) => {
  try {
    const id = query?.id;
    const token: any = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });
    const res = await axios.get(`/verify-artpiece/saved/${id}`, {
      headers: { authorization: `Bearer ${token?.accessToken}` },
    });

    console.log(res?.data);

    return { props: { artPiece: res.data.data } };
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
const VerificationId = ({ artPiece }) => {
  const [fileUrl, setFileUrl] = useState<string>(null);
  const [openAttachmentPreview, setOpenAttachmentPreview] = useState(false);
  const [openVerificaitonDialog, setOpenVerificaitonDialog] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const axiosAuth = useAxiosAuth();
  const toast = useToast();

  const [activeIndex, setActiveIndex] = useState(0);

  const role = artPiece.custodian.role;
  const user = artPiece?.artPiece?.custodian.profile;

  // TODO: please recheck and fix
  const collaborators =
    artPiece?.custodian?.broker?.collaborators ||
    artPiece?.custodian.artist?.brokerInfo?.collaborators ||
    [];
  const organization =
    artPiece?.custodian.artist.brokerInfor?.organization ||
    artPiece?.custodian?.broker.organization ||
    artPiece?.custodian?.collector.organization ||
    artPiece?.custodian?.institution.organization;

  const artist =
    Object.values(artPiece?.custodian?.collector?.artist.artistInfo).length > 0
      ? artPiece?.custodian?.collector?.artist
      : Object.values(artPiece?.custodian?.institution?.artist.artistInfo)
          .length > 0
      ? artPiece?.custodian?.institution?.artist
      : null;

  const { mutate, isLoading } = useMutation({
    mutationFn: (id) => axiosAuth.post(`/invite/resend/${id}`),
    onSuccess: () => {
      // toast.success("Invitation Resent");
    },
    onError: (error: any) => {
      toast.error(
        error.response.data.message || error.message || "Something went wrong",
      );
    },
  });

  console.log(artPiece);

  return (
    <AdminDashboardLayout>
      <Stack direction={["column", "row"]} gap={[4, 8]}>
        <div className="">
          <Image
            src={artPiece?.artPiece?.assets[0]?.url}
            width={500}
            height={500}
            alt=""
          />
        </div>
        <div>
          <div className="flex justify-between items-center gap-6">
            <div className="flex gap-3 items-center">
              <span className="capitalize ">{role}</span>
            </div>

            <Button
              onClick={() => setOpenVerificaitonDialog(true)}
              className="bg-primary w-fit px-4 text-white font-[400]"
            >
              Change Status{" "}
            </Button>
          </div>
          <h1 className="text-2xl md:text-6xl py-3">
            {artPiece?.artPiece?.title}{" "}
          </h1>
          <div className="flex gap-2 items-center">
            <Button className="bg-primary w-fit px-4 text-white font-[400]">
              View Artwork{" "}
            </Button>
          </div>
          <div>
            <Accordion className="bg-white mt-4" defaultExpanded={false}>
              <AccordionSummary
                className="bg-primary px-2 text-[20px] font-[600] leading-[16px] py-2 text-white "
                expandIcon={<MdOutlineExpandMore />}
                aria-controls="panel3-content"
                id="panel3-header"
              >
                Custodian Details
              </AccordionSummary>
              <AccordionDetails className="grid grid-cols-2 capitalize gap-x-10 gap-y-4 justify-between text-sm">
                <span className="font-[600]  ">Name</span>
                <span className="font-[400]">
                  {user.firstName} {user?.lastName}
                </span>
                <span className="font-[600]  ">KYC Verification Status</span>
                <span className="font-[400]">
                  {user?.kycVerification?.verificationStatus?.replace("-", " ")}
                </span>
                <span className="font-[600]  ">Role</span>
                <span className="font-[400]">{role}</span>
                <Link
                  href={`/explore/artist/${user?.id}`}
                  target={"_blank"}
                  className="col-span-2 text-center bg-primary text-white p-2"
                >
                  See More
                </Link>
              </AccordionDetails>
            </Accordion>

            {/* Organization */}
            {organization && (
              <Accordion className="bg-white mt-4" defaultExpanded={false}>
                <AccordionSummary
                  className="bg-primary px-2 text-[20px] font-[600] leading-[16px] py-2 text-white "
                  expandIcon={<MdOutlineExpandMore />}
                  aria-controls="panel3-content"
                  id="panel3-header"
                >
                  Organization Details
                </AccordionSummary>
                <AccordionDetails className="grid grid-cols-2 capitalize gap-x-10 gap-y-4 justify-between text-sm">
                  <span className="font-[600]  ">Name</span>
                  <span className="font-[400]">{organization?.name}</span>
                  <span className="font-[600]  ">KYB Verification Status</span>
                  <span className="font-[400]">
                    {organization?.kybVerification?.status?.replace("-", " ")}
                  </span>
                  <span className="font-[600]  ">Email</span>
                  <span className="font-[400] lowercase">
                    {organization?.email}
                  </span>
                  <span className="font-[600]  ">Address</span>
                  <span className="font-[400]">{organization?.address}</span>
                  <Link
                    href={`/explore/artist/${user?.id}`}
                    target={"_blank"}
                    className="col-span-2 text-center bg-primary text-white p-2"
                  >
                    View Organization
                  </Link>
                </AccordionDetails>
              </Accordion>
            )}
          </div>
        </div>
      </Stack>
      {/* Artist */}
      {artist && (
        <Accordion className="bg-white mt-4" defaultExpanded={false}>
          <AccordionSummary
            className="bg-primary px-2 text-[20px] font-[600] leading-[16px] py-2 text-white "
            expandIcon={<MdOutlineExpandMore />}
            aria-controls="panel3-content"
            id="panel3-header"
          >
            Artist Details
          </AccordionSummary>
          <AccordionDetails className="grid grid-cols-2 capitalize gap-x-10 gap-y-4 justify-between text-sm">
            <span className="font-[600]  ">Name</span>
            <span className="font-[400]">
              {artist?.artistInfo?.firstName} {artist?.artistInfo?.lastName}
            </span>
            <span className="font-[600]  ">Email</span>
            <span className="font-[400] lowercase">
              {artist?.artistInfo?.email}
            </span>
            <span className="font-[600]  ">Invitation Status</span>
            <span className="font-[400]">
              {artist?.invitation?.status === "accepted"
                ? "Accepted"
                : artist?.invitation?.status === "sent"
                ? "Pending"
                : "Rejected"}
            </span>
            {artist?.invitation?.status !== "accepted" && (
              <LoadingButton
                loading={isLoading}
                onClick={() => mutate(artist?.invitation?._id)}
                className="col-span-2 text-center bg-primary text-white p-2"
              >
                Resend Invite
              </LoadingButton>
            )}
          </AccordionDetails>
        </Accordion>
      )}

      {/* Verification Details */}
      <Accordion className="bg-white mt-4" defaultExpanded={false}>
        <AccordionSummary
          className="bg-primary px-2 text-[20px] font-[600] leading-[16px] py-2 text-white "
          expandIcon={<MdOutlineExpandMore />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          Verification Details
        </AccordionSummary>
        <AccordionDetails className="grid grid-cols-2 capitalize gap-x-10 gap-y-4 justify-between text-sm">
          {role == "artist" ? (
            <ArtitstTable artist={artPiece.custodian[role]} />
          ) : role == "broker" ? (
            <BrokerTable broker={artPiece.custodian[role]} />
          ) : role == "institution" ? (
            <InstitutionTable data={artPiece.custodian[role]} />
          ) : role == "collector" ? (
            <CollectorTable data={artPiece.custodian[role]} />
          ) : (
            <></>
          )}
        </AccordionDetails>
      </Accordion>
      {collaborators?.length > 0 && (
        <Stack py={4} spacing={4}>
          <h2 className="text-3xl font-bold">Collaborators</h2>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 550 }}>
              <TableHead>
                <TableRow>
                  {[
                    "Name",
                    "Email",
                    "Role",
                    "Invitation Status",
                    "Percentage",
                    "Action",
                  ].map((col) => (
                    <TableCell
                      className="bg-primary text-white text-md font-[600]"
                      key={col}
                    >
                      {col}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {collaborators?.map((item) => (
                  <TableRow key={item?._id}>
                    <TableCell>
                      {item?.userInfo?.firstName} {item?.userInfo?.lastName}
                    </TableCell>
                    <TableCell>{item?.userInfo?.email}</TableCell>
                    <TableCell className="capitalize">
                      {item?.userInfo?.role}
                    </TableCell>

                    <TableCell>
                      {item?.invitation?.status != "accepted"
                        ? "Accepted"
                        : item?.invitation?.status != "sent"
                        ? "Pending"
                        : "Rejected"}
                    </TableCell>
                    <TableCell>{item?.percentageNumerator}%</TableCell>
                    <TableCell>
                      <LoadingButton
                        loading={isLoading}
                        onClick={() => mutate(item?.invitation?._id)}
                        className="bg-primary text-white"
                      >
                        Resend
                      </LoadingButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      )}

      {}

      <VerificationDialog
        artPiece={artPiece}
        open={openVerificaitonDialog}
        onClose={() => setOpenVerificaitonDialog(false)}
      />
    </AdminDashboardLayout>
  );
};

export default VerificationId;

interface VerificationProps {
  open: boolean;
  onClose: () => void;
  artPiece: any;
}
const VerificationDialog = ({ artPiece, open, onClose }) => {
  const toast = useToast();
  const axiosFetch = useAxiosAuth();

  const verificationSchema = object({
    status: string().nonempty("Status is required"),
    //@ts-ignore
    reason: string().optional(),
  }).superRefine(({ status, reason }, ctx) => {
    if (status !== "verified" && !reason) {
      ctx.addIssue({
        code: "custom",
        path: ["reason"],
        message: "Reason is required when status is not verified",
      });
    }
  });

  type VerificationInput = TypeOf<typeof verificationSchema>;
  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    control,
    watch,
    handleSubmit,
  } = useForm<VerificationInput>({
    resolver: zodResolver(verificationSchema),
  });
  const router = useRouter();

  const { isLoading, mutate } = useMutation({
    mutationFn: (values: { reason: string; status: string }) =>
      axiosFetch.post(`/art-piece/verify/${artPiece?._id}`, {
        reason: values?.reason,
        status: values?.status,
      }),
    onSuccess: (data) => {
      toast.success("Verification Successful");
      router.push(router.asPath);
    },
    onError: (error: any) => {
      toast.error(
        error.response.data.message || error.message || "Something went wrong",
      );
    },
    onSettled: () => {
      reset();
      onClose();
    },
  });

  const onSubmitHandler: SubmitHandler<VerificationInput> = async (values) => {
    console.log(values);
    //@ts-ignore
    mutate(values);
  };

  const statusValue = watch("status", artPiece?.status);
  return (
    <Dialog
      open={open}
      fullWidth={true}
      maxWidth={"sm"}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperComponent={Paper}
      PaperProps={{
        component: "form",
        onSubmit: handleSubmit(onSubmitHandler),
      }}
    >
      <DialogTitle>
        {artPiece?.status === "verified"
          ? "Unverified Artpiece"
          : "Verify Artpiece"}
      </DialogTitle>
      <DialogContent dividers className="flex flex-col gap-4">
        <SelectField
          label="Status"
          id="status"
          name="status"
          defaultValue={artPiece?.status}
          placeholder="Select Status"
          selectClassName="bg-secondary"
          control={control}
          fullWidth
          helperText={errors["status"] ? errors["status"].message : ""}
          error={!!errors["status"]}
        >
          {["verified", "rejected", "in_dispute"].map((item) => (
            <MenuItem
              key={item}
              value={item}
              className="text-xm capitalize bg-secondary"
            >
              {item}
            </MenuItem>
          ))}
        </SelectField>
        {statusValue !== "verified" && (
          <InputField
            label="Reason"
            id="reason"
            placeholder="Min. 8 character"
            name="reason"
            sx={{
              "& fieldset": { borderColor: "black" },
              borderColor: "black",
            }}
            multiline
            rows={4}
            tabIndex={2}
            aria-required="true"
            fullWidth
            error={!!errors.reason}
            //  @ts-ignore
            helperText={errors.reason ? errors.reason.message : ""}
            control={control}
          />
        )}

        <LoadingButton
          className="w-full bg-primary text-white font-[400]"
          type="submit"
          loading={isLoading}
        >
          Submit
        </LoadingButton>
      </DialogContent>
    </Dialog>
  );
};
