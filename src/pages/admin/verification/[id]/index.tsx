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

  const kycStatus =
    artPiece?.artPiece?.custodian?.profile?.kycVerification?.verificationStatus;
  const kybStatus =
    artPiece.custodian?.broker?.organization?.kybVerification?.status ||
    artPiece?.custodian?.institution?.organization?.status ||
    artPiece?.custodian?.collector?.organization?.kybVerification?.status;

  console.log(artPiece);

  const collaborators = artPiece?.custodian?.broker?.collaborators
    ? artPiece?.custodian?.broker?.collaborators
    : [] || artPiece?.custodian.artist?.brokerInfo?.collaborators
    ? artPiece?.custodian.artist?.brokerInfo?.collaborators
    : [];
  const organization =
    artPiece?.custodian.artist.brokerInfor?.organization ||
    artPiece?.custodian?.broker.organization ||
    artPiece?.custodian?.collector.organization ||
    artPiece?.custodian?.institution.organization;

  const role = artPiece.custodian.role;
  const user = artPiece?.artPiece?.custodian.profile;

  const { mutate, isLoading } = useMutation({
    mutationFn: (id) => axiosAuth.post(`/invite/resend/${id}`),
    onSuccess: () => {
      toast.success("Invitation Resent");
    },
    onError: (error: any) => {
      toast.error(
        error.response.data.message || error.message || "Something went wrong",
      );
    },
  });

  return (
    <AdminDashboardLayout>
      <Stack spacing={4}>
        <Stack
          spacing={4}
          direction={["column", "row"]}
          justifyContent="space-between"
        >
          <h1 className="text-3xl   font-bold">{artPiece?.artPiece?.title}</h1>

          <Button
            className="bg-primary w-fit px-4 text-white font-[400]"
            onClick={() => setOpenVerificaitonDialog(true)}
          >
            Change Status
          </Button>
        </Stack>

        {user && (
          <TableContainer component={Paper}>
            <h4 className="font-semibold p-3 text-xl">User Info</h4>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  {["Name", "KYC Verification Status"].map((col) => (
                    <TableCell
                      key={`table-head-${col}`}
                      className="bg-primary text-white text-md font-[600]"
                    >
                      {col}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow className="bg-white text-black cursor-pointer border-[1px] border-primary">
                  <TableCell>
                    {user?.firstName} {user?.lastName}
                  </TableCell>

                  <TableCell>
                    {user?.kycVerification?.verificationStatus}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {organization && (
          <TableContainer component={Paper}>
            <h4 className="font-semibold p-3 text-xl">Organization</h4>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  {["Name", "Email", "Address", "KYB Verification Status"].map(
                    (col) => (
                      <TableCell
                        key={`table-head-${col}`}
                        className="bg-primary text-white text-md font-[600]"
                      >
                        {col}
                      </TableCell>
                    ),
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow className="bg-white text-black cursor-pointer border-[1px] border-primary">
                  <TableCell>{organization?.name}</TableCell>

                  <TableCell>{organization?.email} %</TableCell>
                  <TableCell>{organization?.address}</TableCell>
                  <TableCell>{organization?.kybVerification?.status}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {collaborators?.length > 0 && (
          <TableContainer component={Paper}>
            <h4 className="font-semibold p-3 text-xl">Collaborators</h4>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  {["Name", "Percentage", "Invitation Accepted", "Action"].map(
                    (col) => (
                      <TableCell
                        key={`table-head-${col}`}
                        className="bg-primary text-white text-md font-[600]"
                      >
                        {col}
                      </TableCell>
                    ),
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {collaborators?.map((collaborator) => (
                  <TableRow
                    key={collaborator?._id}
                    className="bg-white text-black cursor-pointer border-[1px] border-primary"
                  >
                    <TableCell>
                      {collaborator?.userInfo?.firstName}{" "}
                      {collaborator?.userInfo?.lastName}
                    </TableCell>

                    <TableCell>{collaborator?.percentageNumerator} %</TableCell>
                    <TableCell>
                      {collaborator?.invitation?.status === "accepted"
                        ? "Yes"
                        : "No"}
                    </TableCell>
                    <TableCell>
                      <LoadingButton
                        loading={isLoading}
                        onClick={() => mutate(collaborator?.invitation?._id)}
                        className="bg-primary text-white text-sm font-[400]"
                      >
                        Resend Invite
                      </LoadingButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <div className="flex flex-col text-sm gap-4">
          <h2 className="text-2xl font-bold capitalize"> More Details </h2>
          <div className=" w-full flex flex-col gap-3">
            {role === "broker" ? (
              <BrokerTable broker={artPiece?.custodian[role]} />
            ) : (
              <></>
            )}
          </div>
        </div>
      </Stack>

      <AttachmentPreviewer
        open={openAttachmentPreview}
        fileUrl={fileUrl}
        onClose={() => setOpenAttachmentPreview(false)}
      />

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
