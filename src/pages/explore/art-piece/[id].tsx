import { useEffect, useState } from "react";

import { getToken } from "next-auth/jwt";
import axios from "@/lib/axios";
import { ViewProps } from "@/pages/dashboard/artworks/[id]";
import UnprotectedPage from "@/HOC/Unprotected";
import ExploreArtpieceDetailsPage from "@/components/ExplorePage/ArtpieceDetails";

export const getServerSideProps = async ({ req, query }) => {
  try {
    const id = query?.id;
    const token: any = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    const res = await axios.get(
      token ? `/art-piece/${id}` : `/art-piece/public/${id}`,
      { headers: { authorization: `Bearer ${token?.accessToken}` } },
    );

    console.log(res?.data);

    return {
      props: {
        artPiece: res.data.artPiece,
        relatedArtPieces: res.data.relatedArtPieces || [],
      },
    };
  } catch (error) {
    console.error("error here looks like ", error);
    if (error?.response?.status === 404) {
      return {
        notFound: true,
      };
    }
    throw new Error(error);
  }
};

const currentTime = new Date();

function ArtPiece({ artPiece, relatedArtPieces }) {
  const [openView, setOpenView] = useState<ViewProps>({
    open: false,
    type: "",
    data: {},
  });
  console.log(relatedArtPieces);

  return (
    <div className="page-container">
      <ExploreArtpieceDetailsPage
        relatedArtpieces={relatedArtPieces}
        artpiece={artPiece}
      />
    </div>
  );
}

export default UnprotectedPage(ArtPiece);
