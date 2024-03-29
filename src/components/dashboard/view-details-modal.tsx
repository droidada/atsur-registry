import React from "react";
import { ViewProps } from "@/pages/dashboard/artworks/[id]";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Link from "next/link";
import { Public } from "@prisma/client/runtime/library";
import dayjs from "dayjs";
interface Props {
  onClose: () => void;
  viewProps: ViewProps;
}

const ViewDetailsModal: React.FC<Props> = ({ onClose, viewProps }) => {
  return (
    <Dialog onClose={onClose} open={viewProps.open}>
      <DialogTitle variant="h3">View Details</DialogTitle>
      <DialogContent className="lg:w-[750px] overflow-y-auto md:w-[550px]">
        {viewProps.type === "exhibition" && (
          <Exhibition exhibition={viewProps.data} />
        )}
        {viewProps.type === "appraisal" && (
          <Appraisals appraisal={viewProps.data} />
        )}
        {viewProps.type === "publication" && (
          <Publication publication={viewProps.data} />
        )}
        {viewProps.type === "location" && (
          <Location location={viewProps.data} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ViewDetailsModal;

const Exhibition = ({ exhibition }: { exhibition: any }) => {
  console.log(exhibition);
  return (
    <Stack direction={"column"} spacing={2}>
      <Card className="p-3 rounded-xl bg-gray-200">
        <CardMedia
          sx={{ height: 200 }}
          image={exhibition?.image}
          title={exhibition?.name}
          className="object-cover"
        />
        <Typography className="text-center font-bold" variant="h3">
          {exhibition?.name}
        </Typography>

        <CardContent className="grid gap-3 ">
          <div>
            <Typography variant="h6">Description</Typography>
            <Typography className="text-justify" variant="body2">
              {exhibition?.description}
            </Typography>
          </div>
          <Divider sx={{ borderColor: "primary.main" }} />
          <div className="grid grid-cols-2 gap-4">
            <Typography variant="h6">Type</Typography>
            <Typography className="text-justify capitalize" variant="body2">
              {exhibition?.type}
            </Typography>
            <Typography variant="h6">Showing Type</Typography>
            <Typography className="text-justify capitalize" variant="body2">
              {exhibition?.showingType}
            </Typography>
          </div>
        </CardContent>
      </Card>
      <Card className="p-3 rounded-xl bg-gray-200">
        <Typography className="text-center font-bold" variant="h3">
          Organizers
        </Typography>

        <CardContent className="grid gap-3 ">
          <div className="grid grid-cols-2 gap-4">
            <Typography variant="h6">Name</Typography>
            <Typography className="text-justify capitalize" variant="body2">
              {exhibition?.organizer?.name}
            </Typography>
            <Typography variant="h6">Email</Typography>
            <Typography
              component={Link}
              href={`mailto:${exhibition?.organizer?.email}`}
              underline="hover"
              target="_blank"
              className="text-justify "
              variant="body2"
            >
              {exhibition?.organizer?.email}
            </Typography>
            <Typography variant="h6">Phone</Typography>
            <Typography className="text-justify capitalize" variant="body2">
              {exhibition?.organizer?.phone}
            </Typography>
            <Typography variant="h6">Website</Typography>
            <Typography
              component={Link}
              href={exhibition?.organizer?.website}
              target="_blank"
              underline="hover"
              className="text-justify "
              variant="body2"
            >
              {exhibition?.organizer?.website}
            </Typography>
          </div>
        </CardContent>
      </Card>
      <Card className="p-3 rounded-xl bg-gray-200">
        <Typography className="text-center font-bold" variant="h3">
          Curators
        </Typography>

        <CardContent className="grid gap-3 ">
          {exhibition?.curators?.map((curator, index) => (
            <>
              <div className="grid grid-cols-2 gap-4">
                <Typography variant="h6">Name</Typography>
                <Typography className="text-justify capitalize" variant="body2">
                  {curator?.name}
                </Typography>
                <Typography variant="h6">Email</Typography>
                <Typography
                  component={Link}
                  href={`mailto:${curator?.email}`}
                  underline="hover"
                  target="_blank"
                  className="text-justify "
                  variant="body2"
                >
                  {curator?.email}
                </Typography>
                <Typography variant="h6">Phone</Typography>
                <Typography className="text-justify capitalize" variant="body2">
                  {curator?.phone}
                </Typography>
              </div>
              <Divider sx={{ borderColor: "primary.main" }} />
            </>
          ))}
        </CardContent>
      </Card>
      <Card className="p-3 rounded-xl bg-gray-200">
        <Typography className="text-center font-bold" variant="h3">
          Jurors
        </Typography>

        <CardContent className="grid gap-3 ">
          {exhibition?.jurors?.map((juror, index) => (
            <>
              <div className="grid grid-cols-2 gap-4">
                <Typography variant="h6">Name</Typography>
                <Typography className="text-justify capitalize" variant="body2">
                  {juror?.name}
                </Typography>
                <Typography variant="h6">Email</Typography>
                <Typography
                  component={Link}
                  href={`mailto:${juror?.email}`}
                  underline="hover"
                  target="_blank"
                  className="text-justify "
                  variant="body2"
                >
                  {juror?.email}
                </Typography>
                <Typography variant="h6">Phone</Typography>
                <Typography className="text-justify capitalize" variant="body2">
                  {juror?.phone}
                </Typography>
              </div>
              <Divider sx={{ borderColor: "primary.main" }} />
            </>
          ))}
        </CardContent>
      </Card>
    </Stack>
  );
};

const Location = ({ location }: { location: any }) => {
  console.log(location);
  return (
    <Card className="p-3 rounded-xl bg-gray-200">
      <CardContent>
        <Typography
          className="text-center capitalize  font-bold"
          gutterBottom
          variant="h3"
          component="div"
        >
          {location?.name}
        </Typography>
        <Stack direction={"column"} spacing={2}>
          <div>
            <Typography gutterBottom variant="h6">
              Notes
            </Typography>
            <Typography className="text-justify" variant="body2">
              {location?.notes}
            </Typography>
          </div>
          <Divider sx={{ borderColor: "primary.main" }} />
          <div className="grid grid-cols-2 gap-4">
            <Typography variant="h6">Address</Typography>
            <Typography className="text-justify " variant="body2">
              {location?.address}
            </Typography>
            <Typography variant="h6">Start Date</Typography>
            <Typography className="text-justify " variant="body2">
              {dayjs(location?.startDate).format("MMMM DD, YYYY")}
            </Typography>
            <Typography variant="h6">End Date</Typography>
            <Typography className="text-justify " variant="body2">
              {dayjs(location?.endDate).format("MMMM DD, YYYY")}
            </Typography>
          </div>
        </Stack>
      </CardContent>
    </Card>
  );
};

const Publication = ({ publication }: { publication: any }) => {
  console.log(publication);
  return (
    <Card className="p-3 rounded-xl bg-gray-200">
      <CardMedia
        sx={{ height: 400 }}
        image={publication?.attachment?.url}
        title={publication?.attachment?.caption}
        className="object-cover rounded-xl"
      />
      <CardContent>
        <Typography
          className="text-center  font-bold"
          gutterBottom
          variant="h3"
          component="div"
        >
          {publication?.publicationName}
        </Typography>
        <Stack direction={"column"} spacing={2}>
          <div>
            <Typography gutterBottom variant="h6">
              Notes
            </Typography>
            <Typography className="text-justify" variant="body2">
              {publication?.notes}
            </Typography>
          </div>
          <Divider sx={{ borderColor: "primary.main" }} />
          <div className="grid grid-cols-2 gap-4">
            <Typography variant="h6">Article Name</Typography>
            <Typography className="text-justify " variant="body2">
              {publication?.articleName}
            </Typography>
            <Typography variant="h6">Author Name</Typography>
            <Typography className="text-justify " variant="body2">
              {publication?.authorName}
            </Typography>
          </div>
        </Stack>
      </CardContent>
    </Card>
  );
};

const Appraisals = ({ appraisal }: { appraisal: any }) => {
  console.log(appraisal);
  return (
    <Card className="p-3 rounded-xl bg-gray-200">
      <CardMedia
        sx={{ height: 400 }}
        image={appraisal?.attachment?.url}
        title={appraisal?.attachment?.caption}
        className="object-cover rounded-xl"
      />
      <CardContent>
        <Typography
          className="text-center  font-bold"
          gutterBottom
          variant="h3"
          component="div"
        >
          Appraiser: {appraisal?.appraiser}
        </Typography>
        <Stack direction={"column"} spacing={2}>
          <div>
            <Typography gutterBottom variant="h6">
              Notes
            </Typography>
            <Typography className="text-justify" variant="body2">
              {appraisal?.notes}
            </Typography>
          </div>
          <Divider sx={{ borderColor: "primary.main" }} />
          <div className="grid grid-cols-2 gap-4">
            <Typography variant="h6">Email</Typography>
            <Typography
              component={Link}
              href={`mailto:${appraisal?.appraiserEmail}`}
              underline="hover"
              target="_blank"
              className="text-justify "
              variant="body2"
            >
              {appraisal?.appraiserEmail}
            </Typography>

            <Typography variant="h6">Website</Typography>
            <Typography
              component={Link}
              href={appraisal?.appraiserWebsite}
              underline="hover"
              target="_blank"
              className="text-justify "
              variant="body2"
            >
              {appraisal?.appraiserEmail}
            </Typography>
            <Typography variant="h6">Value</Typography>
            <Typography className="text-justify capitalize" variant="body2">
              {appraisal?.value}
            </Typography>
            <Typography variant="h6">Currency</Typography>
            <Typography className="text-justify capitalize" variant="body2">
              {appraisal?.currency}
            </Typography>
          </div>
        </Stack>
      </CardContent>
    </Card>
  );
};
