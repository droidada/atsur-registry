import LoadingButton from "@/components/Form/LoadingButton";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { useToast } from "@/providers/ToastProvider";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React from "react";

interface Props {
  open: boolean;
  handleClose: () => void;
  memberId: string;
  organizationId: string;
  memberName: string;
}
const RemoveMemberDialog: React.FC<Props> = ({
  memberId,
  organizationId,
  open,
  handleClose,
  memberName,
}) => {
  const toast = useToast();
  const router = useRouter();
  const axiosAuth = useAxiosAuth();

  const { mutate, isLoading } = useMutation({
    mutationFn: () =>
      axiosAuth.post(`/org/remove-member/${organizationId}`, {
        memberId,
      }),
    onSuccess: () => {
      // toast.success("Member removed successfully");
      handleClose();
      router.replace(router.asPath);
    },
    onError: (error: any) => {
      toast.error(
        error.response.data.message || error?.message || "Something went wrong",
      );
    },
  });

  return (
    <Dialog maxWidth="sm" open={open} onClose={() => !isLoading && handleClose}>
      <DialogTitle>Remove Member</DialogTitle>
      <DialogContent dividers>
        Are you sure you want to remove {memberName} from your organization?
      </DialogContent>
      <DialogActions>
        <Button disabled={isLoading} variant="outlined" onClick={handleClose}>
          Cancel
        </Button>
        <LoadingButton
          variant="contained"
          className="bg-primary"
          loading={isLoading}
          onClick={() => mutate()}
        >
          Remove
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default RemoveMemberDialog;
