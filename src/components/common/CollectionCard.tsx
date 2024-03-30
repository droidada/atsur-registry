import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Typography,
} from "@mui/material";
import { linkSync } from "fs";
import Link from "next/link";
import React from "react";

interface CollectionCardProps {
  image: string;
  title: string;
  link: string;
  totalArtWork: number;
}
const CollectionCard: React.FC<CollectionCardProps> = ({
  image,
  title,
  link,
  totalArtWork,
}) => {
  return (
    <Card
      sx={{
        borderRadius: "12px",
        transitionDuration: "0.7s",
      }}
      component={Link}
      href={link || "#"}
      className="m-2 p-2  hover:scale-95  block max-w-[350px] w-full"
    >
      <CardMedia
        sx={{ height: "300px" }}
        className=" rounded-xl card-media  "
        component="img"
        image={image}
        title={title}
      />
      <CardContent className="flex justify-between items-center p-4">
        <Typography gutterBottom variant="h4" component="div">
          {title}
        </Typography>
        <Typography className="font-bold" variant="body2">
          Total art pieces: {totalArtWork}
        </Typography>
      </CardContent>
      {/* <Divider />
      <CardActions className="flex justify-between items-center p-4"></CardActions> */}
    </Card>
  );
};

export default CollectionCard;
