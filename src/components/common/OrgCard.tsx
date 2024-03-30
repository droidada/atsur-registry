import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React from "react";

interface OrgCardProps {
  name: string;
  image: string;
  link: string;
  totalMembers: number;
}

const OrgCard: React.FC<OrgCardProps> = ({
  name,
  image,
  link,
  totalMembers,
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
        sx={{ height: "80%" }}
        className=" rounded-xl card-media  "
        component="img"
        image={image}
        title={name}
      />
      <CardContent className="flex justify-between items-center p-4">
        <Typography gutterBottom variant="h4" component="div">
          {name}
        </Typography>
        <Typography className="font-bold" variant="body2">
          Total members: {totalMembers}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default OrgCard;
