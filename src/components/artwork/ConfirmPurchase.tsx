import {
  Backdrop,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import Input from "../Form/Input";
import Button from "../Form/Button";
import TextArea from "../Form/TextArea";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: 10,
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));
const ConfirmPurchase = ({
  open,
  handleClose,
  handleSubmit,
  name,
  loading,
}) => {
  // @ts-ignore
  const classes = useStyles();
  return (
    <>
      {loading ? (
        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <Dialog open={open} onClose={handleClose}>
          <div className="w-[350px] flex flex-col relative p-2">
            <button
              onClick={handleClose}
              className="bg-black w-[36px] rounded-md self-end h-[36px] text-white"
            >
              X
            </button>
            <DialogTitle className="text-center text-xl">
              Confirm Purchase
            </DialogTitle>
            <DialogContent className="flex flex-col gap-6">
              <p className="text-center text-xs mb-8">
                You are about to purchase the artwork{" "}
                <span className="font-bold">{name}</span>, please confirm your
                payment.{" "}
              </p>
              <Divider />
              <div className="flex justify-between items-center">
                <Typography className="text-sm">Art Title: </Typography>
                <Typography className="text-sm">{name}</Typography>
              </div>

              <div className="flex justify-between items-center">
                <Typography className="text-sm">Art Price: </Typography>
                <Typography className="text-sm">3,815.00 <b>cUSD</b></Typography>
              </div>
              <div className="flex justify-between items-center">
                <Typography className="text-sm">Network fee: </Typography>
                <Typography className="text-sm">23.00 <b>cUSD</b></Typography>
              </div>
              <Divider />
              <div className="flex justify-between items-center">
                <Typography className="text-sm">Total: </Typography>
                <Typography className="text-sm">3,838.00 <b>cUSD</b></Typography>
              </div>
            </DialogContent>
            <DialogActions>
              {/* <Button onClick={handleClose}>Cancel</Button> */}
              <button
                className="w-full bg-blue-500 text-center text-white p-3 rounded-md"
                onClick={handleSubmit}
              >
                Confirm
              </button>
            </DialogActions>
          </div>
        </Dialog>
      )}
    </>
  );
};

export default ConfirmPurchase;
