import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
} from "@mui/material";
import React from "react";
import InviteUsers from "../InviteUsers";
import LoadingButton from "@/components/Form/LoadingButton";
import { useMutation } from "@tanstack/react-query";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { useToast } from "@/providers/ToastProvider";
import { useRouter } from "next/router";

interface Props {
  open: boolean;
  handleClose: () => void;
  organizationId: string;
}
const InviteMemberDialog: React.FC<Props> = ({
  open,
  handleClose,
  organizationId,
}) => {
  const [selectedUser, setSelectedUser] = React.useState<any>();

  // console.log("This is the user", selectedUser);

  const axiosAuth = useAxiosAuth();
  const toast = useToast();
  const router = useRouter();

  const { mutate, isLoading } = useMutation({
    mutationFn: () =>
      axiosAuth.post(`/org/add-member/${organizationId}`, {
        inviteeEmail: selectedUser?.email,
        firstName: selectedUser?.firstName,
        lastName: selectedUser?.lastName,
      }),
    onSuccess: () => {
      // toast.success("An invitation has been sent to the member.");
      router.replace(router.asPath);
      handleClose();
    },
    onError: (error: any) => {
      toast.error(
        error.response.data.message ||
          error?.message ||
          "Something went wrong.",
      );
    },
  });

  return (
    <Dialog
      PaperComponent={Paper}
      maxWidth={"md"}
      fullWidth
      className="w-full max-w-[650px] mx-auto"
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>Add Member</DialogTitle>
      <DialogContent dividers>
        <InviteUsers
          labelClassName="text-sm font-[400]  "
          label="Member"
          className="mt-4"
          selectedUsers={selectedUser}
          setSelectedUsers={setSelectedUser}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose}>
          Close
        </Button>
        <LoadingButton
          disabled={!selectedUser}
          variant="contained"
          className="bg-primary text-white"
          loading={isLoading}
          onClick={
            mutate as unknown as React.MouseEventHandler<HTMLButtonElement>
          }
        >
          Invite Member
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default InviteMemberDialog;
