import React from "react";
import HeroSection from "./HeroSection";
import IArtPieceDetails, {
  IRelatedArtPiece,
} from "@/types/models/exploreArtpieceDetails";
import DetailColumn from "./DetailColumn";
import { Stack, TableCell, TableRow } from "@mui/material";
import RelatedArtpiece from "./RelatedArtpiece";
import moment from "moment";

interface Props {
  artpiece: IArtPieceDetails;
  relatedArtpieces: IRelatedArtPiece[];
}

const ExploreArtpieceDetailsPage: React.FC<Props> = ({
  artpiece,
  relatedArtpieces,
}) => {
  console.log(artpiece?.competitions);
  return (
    <div className="pb-10">
      <HeroSection artpiece={artpiece} />
      <Stack direction="column" className="mt-8 lg:mt-[60px]" spacing={4}>
        {artpiece.publications.length > 0 && (
          <DetailColumn
            type={"publications"}
            columns={["Publications Name", "Title", "Date", "Attachment"]}
          >
            <></>
          </DetailColumn>
        )}
        {artpiece.exhibitions.length > 0 && (
          <DetailColumn
            type={"exhibitions"}
            columns={["Name", "Type", "Showing", "Attachment"]}
          >
            {artpiece?.exhibitions?.map((exhibition) => (
              <TableRow key={exhibition?._id}>
                <TableCell>{exhibition?.name}</TableCell>
                <TableCell>{exhibition?.type}</TableCell>
                <TableCell>{exhibition?.showing}</TableCell>
                <TableCell></TableCell>
              </TableRow>
            ))}
          </DetailColumn>
        )}
        {artpiece.appraisals.length > 0 && (
          <DetailColumn
            type={"appraisals"}
            columns={[
              "Appraiser Name",
              "Appraiser Email",
              "Appraiser Website",
              "Value",
              "Notes",
            ]}
          >
            {artpiece?.appraisals?.map((appraisal) => (
              <TableRow key={appraisal?._id}>
                <TableCell>{appraisal?.appraiser}</TableCell>
                <TableCell>{appraisal?.appraiserEmail}</TableCell>
                <TableCell>{appraisal?.appraiserWebsite}</TableCell>
                <TableCell>
                  {appraisal?.currency === "usd" ? "$" : <>&pounds;</>}{" "}
                  {appraisal?.value}
                </TableCell>
                <TableCell>{appraisal?.notes}</TableCell>
              </TableRow>
            ))}
          </DetailColumn>
        )}
        {artpiece.competitions.length > 0 && (
          <DetailColumn
            type={"competitions"}
            columns={[
              "Name",
              "Description",
              "Showing Type",
              "Start Date",
              "End Date",
              // "Organizers",
            ]}
          >
            {artpiece?.competitions?.map((competition) => (
              <TableRow key={competition?._id}>
                <TableCell>{competition?.name}</TableCell>
                <TableCell>{competition?.description}</TableCell>
                <TableCell>{competition?.showingType}</TableCell>
                <TableCell>
                  {moment(competition?.date?.startDate).format("Do MMM, YYYY")}
                </TableCell>
                <TableCell>
                  {moment(competition?.data?.endDate).format("Do MMM, YYYY")}
                </TableCell>
                {/* <TableRow>
                  <TableCell>{competition?.organizer?.name}</TableCell>
                  <TableCell>{competition?.organizer?.email}</TableCell>
                  <TableCell>{competition?.organizer?.website}</TableCell>
                </TableRow> */}
              </TableRow>
            ))}
          </DetailColumn>
        )}
        {artpiece.locations.length > 0 && (
          <DetailColumn
            type={"locations"}
            columns={["City", "Address", "Attachment"]}
          >
            <></>
          </DetailColumn>
        )}
      </Stack>
      {relatedArtpieces.length > 0 && (
        <div className="mt-8 lg:mt-[60px]">
          <RelatedArtpiece relatedArtpieces={relatedArtpieces} />
        </div>
      )}
    </div>
  );
};

export default ExploreArtpieceDetailsPage;
