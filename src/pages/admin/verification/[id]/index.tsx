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
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/router";

export const getServerSideProps = async ({ req, query }) => {
  try {
    const id = query?.id;
    const token: any = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });
    const res = await axios.get(`/art-piece/verify/${id}`, {
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
const VerificationId = ({ artPiece }) => {
  const [fileUrl, setFileUrl] = useState<string>(null);
  const [openAttachmentPreview, setOpenAttachmentPreview] = useState(false);
  const [openVerificaitonDialog, setOpenVerificaitonDialog] = useState(false);

  return (
    <AdminDashboardLayout>
      <Stack spacing={4}>
        <h1 className="text-3xl font-bold">{artPiece?.artPiece?.title}</h1>
        <div className="flex flex-col text-sm gap-4">
          <h2 className="text-xl font-bold"> Aquisition </h2>
          <div className="grid max-w-[450px] w-full grid-cols-2 gap-2">
            <span className="font-[500]">Organizaton Name</span>
            <span>{artPiece?.acquisition?.organization?.orgInfo?.name}</span>
            <span className="font-[500]">Type</span>
            <span>{artPiece?.acquisition?.type}</span>
            <span className="font-[500]">Purpose</span>
            <span>{artPiece?.acquisition?.purpose}</span>
            <span className="font-[500]">Date of Purchase</span>
            <span>
              {moment(artPiece?.acquisition?.date).format("DD-MM-YYYY")}
            </span>
            <span className="font-[500]">Method of Purchase</span>
            <span>{artPiece?.acquisition?.methodOfPurchase}</span>
            <span>Attachment</span>
            <span
              onClick={() => {
                setOpenAttachmentPreview(true);
                setFileUrl(artPiece?.acquisition?.attachment);
              }}
              className="border-2 p-2 cursor-pointer rounded-md"
            >
              {artPiece?.acquisition?.attachment?.split("/").pop()}
            </span>
          </div>
        </div>
        <div className="flex flex-col text-sm gap-4">
          <h2 className="text-xl font-bold">Custodian </h2>
          <div className="max-w-[450px] w-full">
            <h4 className="text-sm font-bold ">Collaborators</h4>
            <div className="flex flex-col gap-3">
              {artPiece?.custodian?.broker?.collaborators?.map(
                (collaborator) => (
                  <div
                    key={collaborator?._id}
                    className="grid  grid-cols-2 gap-2"
                  >
                    <span>Collaborator Name</span>
                    <span>
                      {collaborator?.userInfo?.firstName}{" "}
                      {collaborator?.userInfo?.lastName}
                    </span>
                    <span>Collaborator Percentage</span>
                    <span>{collaborator?.percentageNumerator} %</span>
                    <span>Invitation Accepted</span>
                    <span>
                      {collaborator?.invitationAccepted ? "Yes" : "No"}
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col text-sm gap-4">
          <h2 className="text-xl font-bold"> Verification Status </h2>
          <div className="max-w-[450px] w-full flex flex-col gap-3">
            <span>Status {artPiece?.status}</span>
            <Button
              className="bg-primary w-fit px-4 text-white font-[400]"
              onClick={() => setOpenVerificaitonDialog(true)}
            >
              Change Status
            </Button>

            {artPiece?.status !== "verified" &&
              artPiece?.status !== "pending" && (
                <div className=" text-sm">
                  <span className="font-[500]">Reason</span>
                  <p className="text-xs">{artPiece?.rejectionReason}</p>
                </div>
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
