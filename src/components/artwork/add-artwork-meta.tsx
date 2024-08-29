import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { array, object, string, number, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";

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
import LoadingButton from "../Form/LoadingButton";

const AddArtworkMeta = ({
  activeStep = true,
  setActiveStep = ({}) => {},
  setCompleted = ({}) => {},
}) => {
  const artworkSchema = object({
    title: string().nonempty("First name is required"),
    type: string().nonempty("type is required"),
    description: string().nonempty("Description is required"),
    subject_matter: string(),
    height: number()
      .int("Artwork height is required")
      .min(0, "Artwork height cannot be less than zero"),
    width: number()
      .int("Artwork width is required")
      .min(0, "Artwork width cannot be less than zero"),
    depth: number()
      .int("Artwork depth is required")
      .min(0, "Artwork depth cannot be less than zero"),
    rarity: string().nonempty("Rarity is required"),
    materials: array(string()).nonempty("Select materials for artwork"),
  });
  type ArtworkMetaInput = TypeOf<typeof artworkSchema>;
  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm<ArtworkMetaInput>({
    resolver: zodResolver(artworkSchema),
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState(false);
  const { user } = useAuthContext();
  const axiosAuth = useAxiosAuth();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<ArtworkMetaInput> = async (values) => {
    setLoading(true);
    try {

      //   const res = await axiosAuth.patch("user/me", { ...values });
      //   console.log(res?.data);
      setActiveStep(1);
      setCompleted({ 0: true });
    } catch (error) {
      console.error(error);
      setError(true);
    }
    setLoading(false);
  };


  return (
    <Box
      component="form"
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit(onSubmitHandler)}
      sx={{ mt: 1, width: 500 }}
      display="grid"
      gridTemplateColumns="repeat(12, 1fr)"
      gap={1}
    >
      {error && (
        <div className="bg-red-300 p-2 text-white rounded">
          Something went wrong. Please try again
        </div>
      )}
      <Box gridColumn="span 12">
        <TextField
          sx={{ mb: 2 }}
          label="Title"
          fullWidth
          required
          type="text"
          error={!!errors["title"]}
          helperText={errors["title"] ? errors["title"].message : ""}
          {...register("title")}
        />
      </Box>
      <Box gridColumn="span 12">
        <TextField
          sx={{ mb: 2 }}
          label="Description"
          fullWidth
          multiline
          rows={4}
          type="text"
          error={!!errors["description"]}
          helperText={
            errors["description"] ? errors["description"].message : ""
          }
          {...register("description")}
        />
      </Box>
      <Box gridColumn="span 6">
        <FormControl fullWidth variant="outlined">
          <InputLabel id="role-label">What is the rarity?</InputLabel>
          <Select
            labelId="rarity"
            id="rarity"
            label="What type rarity"
            error={!!errors["rarity"]}
            {...register("rarity")}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"unique"}>Unique</MenuItem>
            <MenuItem value={"limited_edition"}>Limited Edition</MenuItem>
            <MenuItem value={"open_edition"}>Open Edition</MenuItem>
            <MenuItem value={"unknown"}>Unknown</MenuItem>
          </Select>
          {errors["rarity"] && (
            <FormHelperText error={!!errors["rarity"]}>
              {errors["rarity"].message}
            </FormHelperText>
          )}
        </FormControl>
      </Box>
      <Box gridColumn="span 6">
        <FormControl fullWidth variant="outlined">
          <InputLabel id="role-label">What type of artwork?</InputLabel>
          <Select
            labelId="type"
            id="type"
            label="What type of artwork?"
            error={!!errors["type"]}
            {...register("type")}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"artifact"}>Artifact</MenuItem>
            <MenuItem value={"artwork"}>Artwork</MenuItem>
          </Select>
          {errors["type"] && (
            <FormHelperText error={!!errors["type"]}>
              {errors["type"].message}
            </FormHelperText>
          )}
        </FormControl>
      </Box>
      <Box gridColumn="span 4">
        <TextField
          sx={{ mb: 2 }}
          label="Height"
          fullWidth
          required
          type="number"
          error={!!errors["height"]}
          helperText={errors["height"] ? errors["height"].message : ""}
          {...register("height")}
        />
      </Box>
      <Box gridColumn="span 4">
        <TextField
          sx={{ mb: 2 }}
          label="Width"
          fullWidth
          required
          type="number"
          error={!!errors["width"]}
          helperText={errors["width"] ? errors["width"].message : ""}
          {...register("width")}
        />
      </Box>
      <Box gridColumn="span 4">
        <TextField
          sx={{ mb: 2 }}
          label="Depth"
          fullWidth
          required
          type="number"
          error={!!errors["depth"]}
          helperText={errors["depth"] ? errors["depth"].message : ""}
          {...register("depth")}
        />
      </Box>
      <Box gridColumn="span 12">
        <LoadingButton
          variant="contained"
          // fullWidth
          type="submit"
          loading={loading}
          sx={{ mt: 3, mb: 2, p: 2 }}
        >
          Add Meta
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default AddArtworkMeta;
