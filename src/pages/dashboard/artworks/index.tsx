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
            <AutoSlider1
              images={artworks?.map((artPiece) => artPiece?.assets[0]?.url)}
            />
            <AutoSlider1
              images={artworks?.map((artPiece) => artPiece?.assets[0]?.url)}
            />
          </div>
        </div>

        <div className="heading-section">
          <h2 className="tf-title pb-30">My ArtWorks</h2>
        </div>
        <div className="widget-tabs px-4 relative">
          <div className="wrap-box-card">
            {artworks?.map((artPiece, idx) => (
              <div
                key={idx}
                className="fl-item col-xl-3 col-lg-4  col-md-6 col-sm-6"
              >
                <div className="tf-card-box style-1 h-[450px]">
                  <div className="card-media relative h-[60%]">
                    <span>
                      <Image
                        src={artPiece?.assets[0]?.url}
                        fill
                        className="object-cover"
                        alt=""
                      />
                    </span>
                    <span className="wishlist-button icon-heart" />
                    <div className="button-place-bid">
                      <Link
                        href={`/dashboard/artworks/${artPiece._id}`}
                        className="tf-button"
                      >
                        <span>View</span>
                      </Link>
                    </div>
                  </div>
                  <h5 className="name">
                    <Link href="#">{artPiece.title}</Link>
                  </h5>
                  <div className="divider" />
                  <div className="meta-info flex items-center justify-between">
                    <span className="text-bid">Price</span>
                    <h6 className="price gem to-white">
                      <i className="icon-gem" />
                      0,34
                    </h6>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* <div className="heading-section">
              <h2 className="tf-title style-1 pb-30">Invitations</h2>
            </div>
            <div className="row">
              <p>You have no invites</p>
              <br />
              <br />
              <br />
            </div>
            <div className="row">
              {artworks?.length > 0 ? (
                artworks?.map((artPiece, idx) => (
                  <div
                    key={idx}
                    className="fl-item col-xl-3 col-lg-4 col-md-6 col-sm-6"
                  >
                    <div className="tf-card-box style-1">
                      <div className="card-media">
                        <Link href="#">
                          <Image src={artPiece?.assets[0]?.url} alt="" />
                        </Link>
                        <span className="wishlist-button icon-heart" />
                        <div className="button-place-bid">
                          <Link
                            href={`/dashboard/artworks/${artPiece._id}`}
                            className="tf-button"
                          >
                            <span>View</span>
                          </Link>
                        </div>
                      </div>
                      <h5 className="name">
                        <Link href="#">{artPiece.title}</Link>
                      </h5>
                      <div className="divider" />
                      <div className="meta-info flex items-center justify-between">
                        <span className="text-bid">Price</span>
                        <h6 className="price gem to-white">
                          <i className="icon-gem" />
                          0,34
                        </h6>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>
                  You have not added any art yet.{" "}
                  <Link href="/dashboard">
                    <button> Create One</button>
                  </Link>
                </p>
              )}
            </div> */}
      </div>
    </DashboardLayoutWithSidebar>
  );
}
Artworks.requiredAuth = true;
export default Artworks;
