import React from "react";
import HeroSection from "./HeroSection";
import IArtPieceDetails, {
  IRelatedArtPiece,
} from "@/types/models/exploreArtpieceDetails";
import DetailColumn from "./DetailColumn";
import { Stack } from "@mui/material";
import RelatedArtpiece from "./RelatedArtpiece";

interface Props {
  artpiece: IArtPieceDetails;
  relatedArtpieces: IRelatedArtPiece[];
}

const ExploreArtpieceDetailsPage: React.FC<Props> = ({
  artpiece,
  relatedArtpieces,
}) => {
  console.log(artpiece);
  return (
    <>
      <HeroSection artpiece={artpiece} />
      <Stack direction="column" className="mt-8 lg:mt-[60px]" spacing={4}>
        {artpiece.publications.length > 0 &&
          <DetailColumn
            type={"publications"}
            columns={["Publications Name", "Title", "Date", "Attachment"]}
          >
            <></>
          </DetailColumn>}
          {artpiece.exhibitions.length > 0 &&
            <DetailColumn
              type={"exhibitions"}
              columns={["Name", "Type", "Showing", "Attachment"]}
            >
              <></>
            </DetailColumn>}
            {artpiece.appraisals.length > 0 &&
            <DetailColumn
              type={"appraisals"}
              columns={["Appraisal Name", "Details", "Attachment"]}
            >
              <></>
            </DetailColumn>}
            {artpiece.locations.length > 0 &&
            <DetailColumn
              type={"locations"}
              columns={["City", "Address", "Attachment"]}
            >
              <></>
            </DetailColumn>}
      </Stack>
      {relatedArtpieces.length > 0 && <div className="mt-8 lg:mt-[60px]">
        <RelatedArtpiece relatedArtpieces={relatedArtpieces} />
      </div>}
    </>
  );
};

export default ExploreArtpieceDetailsPage;
