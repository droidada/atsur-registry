import { useState, useEffect } from "react";
import { Button, TextField, Select, Switch, Divider, MenuItem, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel } from '@mui/material';
import { object, string, TypeOf, boolean, date } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from "moment";

export default function EditExhibition({open, handleClose, artPieceId, exhibition }: {open: boolean, handleClose: any, artPieceId: string, exhibition: any}) {

  const exhibitionSchema = object({
    name: string().nonempty("Exhibition name is required"),
    description: string().nonempty("Description is required"),
    type: string().nonempty("Type is required"),
    showingType: string().nonempty("Showing is required"),
    organizerName: string().nonempty("Organizer name is required"),
    organizerLocation: string().nonempty("Organizer location is required"),
    organizerEmail: string().nonempty("Organizer email is required"),
    organizerWebsite: string(),
    organizerPhone: string(),
    startDate: date(),
    endDate: date(),
    isCirca: boolean(),
  });

  type ExhibitionInput = TypeOf<typeof exhibitionSchema>;

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    control,
    handleSubmit,
  } = useForm<ExhibitionInput>({
    resolver: zodResolver(exhibitionSchema),
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [exhibitionImg, setExhibitionImg] = useState(null);
  const axiosAuth = useAxiosAuth();

  console.log("editing exhibition here ", exhibition)
  useEffect(() => {
    setError(false);
    // setSuccess(false);
  }, []);
  console.log("we have form errors ehre .....", errors);

  const handleUploadClick = (event) => {
    var file = event.target.files[0];
    const reader = new FileReader();
    var url = reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      setExhibitionImg(reader.result);
    }.bind(this);
    console.log(url); // Would see a path?
  }

  const onSubmitHandler: SubmitHandler<ExhibitionInput> = async (values) => {
    try {
      console.log("submitting here.....")
      console.log(values);

      const formData = new FormData();
      formData.append("image", exhibitionImg);
      formData.append("artPieceId", artPieceId);
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("type", values.type);
      formData.append("showingType", values.showingType);
      formData.append("organizerName", values.organizerName);
      formData.append("organizerLocation", values.organizerLocation);
      formData.append("organizerWebsite", values.organizerWebsite);
      formData.append("organizerEmail", values.organizerEmail);
      formData.append("organizerPhone", values.organizerPhone);
      formData.append("startDate", values.startDate.toUTCString());
      formData.append("endDate", values.endDate.toUTCString());
      formData.append("isCirca", values.isCirca.toString());

      const result = await axiosAuth.post(`/art-piece/add-exhibition`, formData);

      console.log("result here is ", result.data);
      handleClose();

    } catch (error) {
      console.log(error);
      setError(true);
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <form
          className="comment-form"
          autoComplete="off"
          noValidate
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <DialogTitle><h2 className="items-center justify-center">Exhibition</h2></DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address here. We
              will send updates occasionally.
            </DialogContentText>
            <fieldset className="name">
              <label className="to-white">Name *</label>
              <TextField
                type="text"
                id="name"
                placeholder="The Grand Exhibition"
                name="name"
                tabIndex={2}
                aria-required="true"
                fullWidth
                defaultValue={exhibition.name}
                error={!!errors["name"]}
                helperText={
                  errors["name"] ? errors["name"].message : ""
                }
                {...register("name")}
              />
            </fieldset>
            <fieldset className="description">
              <label className="to-white">Description *</label>
              <TextField
                type="text"
                id="description"
                placeholder="Annual showcase for young artist inspirations"
                name="description"
                tabIndex={2}
                aria-required="true"
                fullWidth
                multiline
                defaultValue={exhibition.description}
                rows={3}
                error={!!errors["description"]}
                helperText={
                  errors["description"] ? errors["description"].message : ""
                }
                {...register("description")}
              />
            </fieldset>
            <fieldset>
              <label className="uploadfile h-full flex items-center justify-center">
                  <div className="text-center flex flex-col items-center justify-center">
                    {exhibitionImg ? (
                        <img className="h-full" src={exhibitionImg} />
                    ) : (
                      <>
                        <img src="assets/images/box-icon/upload.png" alt="" />
                        {/* <h5 className="text-white">Image</h5> */}
                        <p className="text">Drag or choose exhibition image to upload</p>
                        <h6 className="text to-gray">
                            PNG, JPEG.. Max 10Mb.
                        </h6>
                      </>
                    )}
                    <input
                        type="file"
                        name="imageFile"
                        accept="image/*"
                        multiple
                        onChange={handleUploadClick}
                    />
                  </div>
              </label>
            </fieldset>
            <div className="flex gap30">
              <fieldset className="collection">
                <label className="to-white">Showing Type *</label>
                <Select
                  className="select"
                  tabIndex={2}
                  name="showingType"
                  id="showingType"
                  fullWidth
                  error={!!errors["showingType"]}
                  {...register("showingType")}
                  defaultValue={exhibition.showingType}
                >
                  <MenuItem>Select</MenuItem>
                  <MenuItem value="solo">Solo</MenuItem>
                  <MenuItem value="group">Group</MenuItem>
                </Select>
              </fieldset>
              <fieldset className="collection">
                <label className="to-white">Type *</label>
                <Select
                  className="select"
                  tabIndex={2}
                  name="type"
                  id="type"
                  defaultValue={exhibition.type}
                  fullWidth
                  error={!!errors["type"]}
                  {...register("type")}
                >
                  <MenuItem>Select</MenuItem>
                  <MenuItem value="exhibition">Exhibition</MenuItem>
                  <MenuItem value="competition">Competition</MenuItem>
                </Select>
              </fieldset>
            </div>
            <div className="flex gap30">
                <fieldset className="collection">
                  <label className="to-white">Start Date</label>
                  {/* <DatePicker
                    disableFuture
                    name="startDate"
                    // defaultValue={exhibition?.date?.startDate}
                    // {...register("startDate")} 
                    /> */}
                      <Controller
                        control={control}
                        defaultValue={exhibition?.date?.startDate}
                        name="startDate"
                        rules={{
                          required: {
                            value: true,
                            message: "Start date is required",
                          },
                        }}
                        {...register("startDate")}
                        render={({ field: { onChange, value, ref, name } }) => (
                          <DatePicker
                            disableFuture
                            onChange={onChange}
                            onAccept={onChange}
                            value={value ? moment(value) : null}
                            name={name}
                            // slotProps={{ textField: { error: !!error, helperText: error  } }}
                          />
                        )}
                      />
                </fieldset>
                <fieldset className="collection">
                  <label className="to-white">End Date</label>
                  {/* <DatePicker
                    disableFuture
                    // name="endDate"
                    // defaultValue={exhibition?.date?.endDate}
                    {...register("endDate")} 
                    /> */}
                      <Controller
                        control={control}
                        defaultValue={exhibition?.date?.startDate}
                        name="endDate"
                        rules={{
                          required: {
                            value: true,
                            message: "End date is required",
                          },
                        }}
                        {...register("endDate")}
                        render={({ field: { onChange, value, ref } }) => (
                          <DatePicker
                            disableFuture
                            onChange={onChange}
                            onAccept={onChange}
                            value={value ? moment(value) : null}
                            inputRef={ref}
                            // slotProps={{ textField: { error: !!error, helperText: error  } }}
                          />
                        )}
                      />
                </fieldset>
                <fieldset className="name">
                  <label className="to-white">Is Circa</label><br />
                  <Controller
                    name="isCirca"
                    control={control}
                    defaultValue={exhibition?.date?.isCirca}
                    {...register("isCirca")}
                    render={({ field: { onChange, value } }) => (
                      <FormControlLabel
                        control={<Switch checked={value} onChange={onChange} color="secondary" />}
                        label="Is Circa"
                      />
                    )}
                  />
                </fieldset>
            </div>
            <Divider><h6 style={{color: 'darkGray'}}>Organizer Information</h6></Divider><br /><br />
            <div className="flex gap30">
              <fieldset className="organizerName">
                <label className="to-white">Name *</label>
                <TextField
                  type="text"
                  id="organizerName"
                  placeholder="Elder Foundation"
                  name="organizerName"
                  tabIndex={2}
                  aria-required="true"
                  fullWidth
                  defaultValue={exhibition?.organizer?.name}
                  error={!!errors["organizerName"]}
                  helperText={
                    errors["organizerName"] ? errors["organizerName"].message : ""
                  }
                  {...register("organizerName")}
                />
              </fieldset>
              <fieldset className="organizerLocation">
                <label className="to-white">Location *</label>
                <TextField
                  type="text"
                  id="organizerLocation"
                  placeholder="Manhattan New York"
                  name="organizerLocation"
                  tabIndex={2}
                  aria-required="true"
                  fullWidth
                  defaultValue={exhibition?.organizer?.location}
                  error={!!errors["organizerLocation"]}
                  helperText={
                    errors["organizerLocation"] ? errors["organizerLocation"].message : ""
                  }
                  {...register("organizerLocation")}
                />
              </fieldset>
            </div>
            <div className="flex gap30">
              <fieldset className="name">
                <label className="to-white">Phone Number</label>
                <TextField
                  type="text"
                  id="organizerPhone"
                  placeholder="+1 343 243 8899"
                  name="organizerPhone"
                  tabIndex={2}
                  aria-required="true"
                  fullWidth
                  defaultValue={exhibition?.organizer?.phone}
                  error={!!errors["organizerPhone"]}
                  helperText={
                    errors["organizerPhone"] ? errors["organizerPhone"].message : ""
                  }
                  {...register("organizerPhone")}
                />
              </fieldset>
              <fieldset className="organizerEmail">
                <label className="to-white">Email *</label>
                <TextField
                  type="email"
                  id="organizerEmail"
                  placeholder="mail@website.com"
                  name="organizerEmail"
                  tabIndex={2}
                  aria-required="true"
                  fullWidth
                  defaultValue={exhibition?.organizer?.email}
                  error={!!errors["organizerEmail"]}
                  helperText={
                    errors["organizerEmail"] ? errors["organizerEmail"].message : ""
                  }
                  {...register("organizerEmail")}
                />
              </fieldset>
              <fieldset className="name">
                <label className="to-white">Website</label>
                <TextField
                  type="text"
                  id="organizerWebsite"
                  placeholder="https://www.website.com"
                  name="organizerWebsite"
                  tabIndex={2}
                  aria-required="true"
                  fullWidth
                  defaultValue={exhibition?.organizer?.website}
                  error={!!errors["organizerWebsite"]}
                  helperText={
                    errors["organizerWebsite"] ? errors["organizerWebsite"].message : ""
                  }
                  {...register("organizerWebsite")}
                />
              </fieldset>
            </div>
          </DialogContent>
          <DialogActions>
            <Button className='tf-button style-2' onClick={handleClose}>Cancel</Button>
            <Button className='tf-button style-1' type="submit">Submit</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}