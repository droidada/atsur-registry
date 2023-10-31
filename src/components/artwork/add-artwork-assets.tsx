import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { array, object, string, number, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import {
  Typography,
  Grid,
  Box,
  Avatar,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Autocomplete,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { useAuthContext } from "@/providers/auth.context";
import DropBox, { ShowImage } from "../dropbox";

const AddArtworkAssets = ({ activeStep, setActiveStep, setCompleted }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState(false);
  const { user } = useAuthContext();
  const axiosAuth = useAxiosAuth();

  const [images, setImages] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.map((file, index) => {
      const reader = new FileReader();

      reader.onload = function (e) {
        setImages((prevState) => [
          ...prevState,
          { id: index, src: e.target.result },
        ]);
      };

      reader.readAsDataURL(file);
      return file;
    });
  }, []);

  console.log("huston do we have a user?? ", user);

  return (
    <>
      <DropBox onDrop={onDrop} />
      <ShowImage images={images} />
    </>
  );
};

export default AddArtworkAssets;
