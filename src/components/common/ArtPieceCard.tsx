import {
  Avatar,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

interface ArtPieceCardProps {
  image: string;
  title: string;
  link: string;
  user?: {
    firstName: string;
    lastName: string;
    id: string;
    avatar: string;
  };
}
const ArtPieceCard: React.FC<ArtPieceCardProps> = ({
  image,
  title,
  link,
  user,
}) => {
  return (
    <Card sx={{ maxWidth: "350px", width: "100%", height: "400px" }}>
      <CardActionArea className="group" href={link} sx={{ height: "70%" }}>
        <CardMedia
          sx={{ height: "80%" }}
          className="group-hover:scale-105 ease-in-out duration-700 "
          component="img"
          image={image}
          title={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions>
        <Stack spacing={1} direction={"column"}>
          <Typography>Created By</Typography>
          <Stack
            component={"a"}
            direction="row"
            alignItems={"center"}
            spacing={1}
          >
            <Avatar src={user?.avatar} />
            <div>
              <Typography variant="body2" color="text.secondary">
                {user?.firstName} {user?.lastName}
              </Typography>
            </div>
          </Stack>
        </Stack>
      </CardActions>
    </Card>
  );
};

export default ArtPieceCard;
