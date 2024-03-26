import {
  Avatar,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { useSession } from "next-auth/react";
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
  rating?: number;
}
const ArtPieceCard: React.FC<ArtPieceCardProps> = ({
  image,
  title,
  link,
  user,
  rating,
}) => {
  const { data: session } = useSession();

  console.log(session);

  console.log(rating);

  return (
    <Card
      style={{ animationDuration: "700ms" }}
      className="wow   fl-item-1 m-2 p-2 rounded-xl w-full"
    >
      <CardActionArea className="group " href={link} sx={{ height: "70%" }}>
        <CardMedia
          sx={{ height: "80%" }}
          className=" rounded-xl card-media hover:scale-95 duration-700 "
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
        <Stack className=" w-full" spacing={2} direction={"column"}>
          <Stack
            component={"a"}
            direction="row"
            alignItems={"center"}
            spacing={1}
          >
            <Avatar src={user?.avatar} />
            <div>
              <Typography variant="body2" color={"text.secondary"}>
                Created By
              </Typography>

              <Typography className="font-semibold">
                {user?.firstName} {user?.lastName}
              </Typography>
            </div>
          </Stack>
          <Divider variant="middle" sx={{ width: "100%" }} component="hr" />
          <Stack>
            <Rating readOnly value={rating || 0} />
          </Stack>
        </Stack>
      </CardActions>
    </Card>
  );
};

export default ArtPieceCard;
