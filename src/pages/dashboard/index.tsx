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
import { ArtistCard } from "@/components/artist-card";
import ArtPieceCard from "@/components/common/ArtPieceCard";
import useAxiosAuth from "@/hooks/useAxiosAuth";

// export const getServerSideProps = async ({ req, query }) => {
//   try {
//     const token: any = await getToken({
//       req,
//       secret: process.env.NEXTAUTH_SECRET,
//     });
//     console.log("token here is ", token);
//     if (!token) return;

//     const res = await axios.get(`/art-piece/creator`, {
//       headers: { authorization: `Bearer ${token?.accessToken}` },
//     });

//     return { props: { artworks: res.data.artPieces } };
//   } catch (error) {
//     console.error("error here looks like ", error);
//     if (error?.response?.status === 404) {
//       return {
//         notFound: true,
//       };
//     }
//     throw new Error(error);
//   }
// };

function Artworks() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [artworks, setArtworks] = useState([]);
  const axiosAuth = useAxiosAuth();

  // console.log(artworks);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axiosAuth.get(`/art-piece/creator`);
        setArtworks(res.data.artPieces);
      } catch (error) {
        console.error(error);
        // throw new Error(error);
      }
    }
    fetchData();
  }, [axiosAuth]);

  return (
    <DashboardLayoutWithSidebar activePage={DashboardPages.ART}>
      <div className="i flex-1  max-w-full">
        <div className="action__body w-full rounded-xl mb-40">
          <div className="tf-tsparticles">
            <div id="tsparticles7" data-color="#161616" data-line="#000" />
          </div>
          <h2>Artworks</h2>
          <div className="flat-button flex">
            <Link
              href="/explore"
              className="tf-button rounded-xl style-2 h50 w190 mr-10"
            >
              Explore
              <i className="icon-arrow-up-right2" />
            </Link>
            <Link
              href="/dashboard/artworks/create"
              className="tf-button rounded-xl style-2 h50 w230"
            >
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
          <div className=" w-full grid gap-3 md:grid-cols-2 lg:grid-cols-3 grid-cols-1">
            {artworks?.map((artPiece, idx) => (
              <ArtPieceCard
                rating={artPiece?.rating}
                link={`/dashboard/artworks/${artPiece._id}`}
                title={artPiece.title}
                image={artPiece.assets[0].url}
                key={idx}
              />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayoutWithSidebar>
  );
}
Artworks.requireAuth = true;
export default Artworks;
