import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  collection: {
    title: string;
    description: string;
    image: string;
  };
  url: string;
}
const CollectionCard: React.FC<Props> = ({ collection, url }) => {
  return (
    <Link href={url}>
      <div className="">
        <Image
          src={collection.image}
          alt={collection.title}
          width={260}
          height={260}
        />
        <div>
          <p> {collection.title} </p>
          {/* <p> {collection.description} </p> */}
        </div>
      </div>
    </Link>
  );
};

export default CollectionCard;
