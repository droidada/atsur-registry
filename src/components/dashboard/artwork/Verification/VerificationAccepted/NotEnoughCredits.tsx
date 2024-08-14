import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}
const NotEnoughCredits: React.FC<Props> = ({ onClose, open }) => {
  const router = useRouter();
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        You don&apos;t have enough credits to perform this task{" "}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Not Now
        </Button>
        <Button
          onClick={() => router.push("/pricing")}
          className="bg-primary text-white"
        >
          Buy more credits
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NotEnoughCredits;
