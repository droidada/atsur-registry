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
import Link from "next/link";
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
      <CardActionArea className="group " href={link} sx={{ height: "70%" }}>
        <CardMedia
          sx={{ height: "80%" }}
          className=" rounded-xl  "
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
          {user && (
            <Stack
              component={"span"}
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
          )}
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
