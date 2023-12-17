import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";
import Input from "../Form/Input";
import Button from "../Form/Button";
import TextArea from "../Form/TextArea";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const ConfirmSuccess = ({ open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <div className="w-[400px] flex flex-col relative p-4">
        {/* <button
          onClick={handleClose}
          className="bg-black w-[36px] rounded-md self-end h-[36px] text-white"
        >
          X
        </button> */}
        <CheckCircleIcon className="text-[#46CD85] text-[120px] self-center" />
        <DialogTitle className="text-center text-xl">
          Payment Successfull
        </DialogTitle>
        <DialogContent className="flex flex-col gap-6">
          <p className="text-center text-sm mb-8">
            Congratulations you have successfully purchased the artwork.
          </p>
        </DialogContent>
        <DialogActions>
          <button
            className="w-fit border border-[#46CD85] text-center text-[#46CD85] p-2 rounded-md"
            onClick={handleClose}
          >
            Close
          </button>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default ConfirmSuccess;
