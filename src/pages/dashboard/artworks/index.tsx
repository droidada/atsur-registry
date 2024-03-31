import { useEffect, useState } from "react";
import Link from "next/link";

import DashboardLayoutWithSidebar, {
  DashboardPages,
} from "@/components/open9/layout/DashboardLayoutWithSidebar";
import AutoSlider1 from "@/open9/slider/AutoSlider1";
import AutoSlider2 from "@/open9/slider/AutoSlider2";
import { getToken } from "next-auth/jwt";
import axios from "@/lib/axios";
import { Menu } from "@headlessui/react";
import Image from "next/image";
import ArtPieceCard from "@/components/common/ArtPieceCard";

export const getServerSideProps = async ({ req, query }) => {
  try {
    const token: any = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });
    console.log("token here is ", token);
    if (!token) return;

    const res = await axios.get(`/art-piece/creator`, {
      headers: { authorization: `Bearer ${token?.user?.accessToken}` },
    });

    return { props: { artworks: res.data.artPieces } };
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

function Artworks({ artworks }) {
  const [activeIndex, setActiveIndex] = useState(0);

  console.log(artworks);
  return (
    <DashboardLayoutWithSidebar activePage={DashboardPages.ART}>
      <div className="i flex-1  max-w-full">
        <div className="action__body w-full mb-40">
          <div className="tf-tsparticles">
            <div id="tsparticles7" data-color="#161616" data-line="#000" />
          </div>
          <h2>Artworks</h2>
          <div className="flat-button flex">
            <Link href="/explore" className="tf-button style-2 h50 w190 mr-10">
              Explore
              <i className="icon-arrow-up-right2" />
            </Link>
            <Link href="/dashboard" className="tf-button style-2 h50 w230">
              Create
              <i className="icon-arrow-up-right2" />
            </Link>
          </div>
          <div className="bg-home7">
            <AutoSlider1 />
            <AutoSlider2 />
            <AutoSlider1 />
          </div>
        </div>

        <div className="heading-section">
          <h2 className="tf-title pb-30">My ArtWorks</h2>
        </div>
        <div className="widget-tabs px-4 relative">
          <div className="grid gap-3 md:grid-cols-2">
            {artworks?.map((artPiece, idx) => (
              <ArtPieceCard
                key={artPiece._id}
                image={artPiece?.assets[0].url}
                title={artPiece?.title}
                link={`/dashboard/artworks/${artPiece._id}`}
                rating={artPiece?.rating}
                user={{
                  firstName: artPiece?.creator?.profile?.firstName,
                  lastName: artPiece?.creator?.profile?.lastName,
                  avatar: artPiece?.creator?.profile?.avatar,
                  id: artPiece?.creator?._id,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayoutWithSidebar>
  );
}
Artworks.requiredAuth = true;
export default Artworks;
