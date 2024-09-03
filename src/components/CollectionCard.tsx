import {
  Avatar,
  AvatarGroup,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import LoadingButton from "./Form/LoadingButton";
import useAxiosAuth from "@/hooks/useAxiosAuth";

interface Props {
  collection: {
    title: string;
    description: string;
    image: string;
    createdAt: string;
    artworks: {
      title: string;
      assets: {
        url: string;
      }[];
    }[];
  };
  url: string;

  containerClassName?: String;
}
const CollectionCard: React.FC<Props> = ({
  collection,
  url,
  containerClassName,
}) => {
  return (
    <Link className={`${containerClassName}`} href={url}>
      <div className="w-full">
        <Image
          src={collection.image}
          alt={collection.title}
          width={260}
          height={260}
          className="w-full"
        />
        <div>
          <p className="text-[27px] text-center font-[300] w-full border-b-[1px] border-primary">
            {collection.title}
          </p>
          {collection?.artworks?.length > 0 && (
            <div className="flex items-center mt-2 font-[300] gap-3">
              <span>Artworks</span>
              <AvatarGroup max={3}>
                {collection.artworks.map((artwork) => (
                  <Avatar
                    key={artwork?.title}
                    alt={artwork?.title}
                    src={artwork?.assets?.length > 0 && artwork?.assets[0]?.url}
                    className="w-[28px] h-[28px]"
                  />
                ))}
              </AvatarGroup>
            </div>
          )}

          <div className="flex gap-2 items-center mt-2 font-[300]">
            <FaRegCalendarAlt size={10} />
            <span className="text-sm">
              {moment(collection.createdAt).format("Do MMM, YYYY")}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CollectionCard;
