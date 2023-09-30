import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import Input from "../Form/Input";
import Button from "../Form/Button";

const Login = ({ open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Request Info</DialogTitle>
      <DialogContent>
        <Input label="Email" placeholder="Enter your email address" />
        <Input label="Name" type="password" placeholder="Enter your name" />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Login;
