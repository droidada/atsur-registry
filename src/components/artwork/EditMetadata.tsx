import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
  } from "@mui/material";
  import Input from "../Form/Input";
  import Button from "../Form/Button";
  import TextArea from "../Form/TextArea";
import AddArtworkMeta from "./add-artwork-meta";
  
  const EditMetadata = ({ open, handleClose }) => {
    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Metadata</DialogTitle>
        <DialogContent>
            <AddArtworkMeta />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {/* <Button onClick={handleClose}>Submit</Button> */}
        </DialogActions>
      </Dialog>
    );
  };
  
  export default EditMetadata;
  