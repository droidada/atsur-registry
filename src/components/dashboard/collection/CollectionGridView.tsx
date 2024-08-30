import React from "react";
import CollectionLoadingCard from "../loadingComponents/collectionLoadingCard";
import CategoryCard from "@/components/CategoryCard";
import NoData from "../NoData";
import CollectionCard from "@/components/CollectionCard";

interface Props {
  collections: any[];
  baseUrl: string;
  isFetching: boolean;
  isError: boolean;
}

const CollectionGridView: React.FC<Props> = ({
  collections,
  baseUrl,
  isFetching,
  isError,
}) => {
  if (isFetching) {
    return (
      <div className="grid grid-cols-auto-fit gap-4 ">
        {[...Array(6)].map((_, index) => (
          <CollectionLoadingCard key={index} />
        ))}
      </div>
    );
  }

  if (collections.length === 0) {
    return <NoData text="We have nothing in your collections" />;
  }

  console.log(collections);

  return (
    <div className="grid grid-cols-auto-fit gap-4">
      {collections.map((collection) => (
        <CollectionCard
          collection={collection}
          key={collection._id}
          url={`${baseUrl}/collections/${collection._id}`}
        />
      ))}
    </div>
  );
};

export default CollectionGridView;
