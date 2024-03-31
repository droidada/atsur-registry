import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import DashboardLayoutWithSidebar, {
  DashboardPages,
} from "@/components/open9/layout/DashboardLayoutWithSidebar";
import AutoSlider1 from "@/open9/slider/AutoSlider1";
import AutoSlider2 from "@/open9/slider/AutoSlider2";
import { getToken } from "next-auth/jwt";
import axios from "@/lib/axios";
import CollectionCard from "@/components/common/CollectionCard";

export const getServerSideProps = async ({ req, query }) => {
  try {
    const token: any = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) return;

    const res = await axios.get(`/collection/user`, {
      headers: { authorization: `Bearer ${token?.user?.accessToken}` },
    });

    console.log(res.data);

    return { props: { collections: res.data.collections } };
  } catch (error) {
    console.error("error here looks like ", error?.response?.data);
    if (error?.response?.status === 404) {
      return {
        notFound: true,
      };
    }
    throw new Error(error);
  }
};

function Collections({ collections }) {
  console.log("this is collection", collections);

  return (
    <>
      <DashboardLayoutWithSidebar activePage={DashboardPages.COLLECTIONS}>
        <>
          <div className="row px-4">
            <div className="action__body rounded-xl w-full mb-40">
              <div className="tf-tsparticles">
                <div id="tsparticles7" data-color="#161616" data-line="#000" />
              </div>
              <h2>Collections</h2>
              <div className="flat-button flex">
                <Link
                  href="/explore"
                  className="tf-button style-2 rounded-xl h50 w190 mr-10"
                >
                  Explore
                  <i className="icon-arrow-up-right2" />
                </Link>
                <Link
                  href="/dashboard/collections/create"
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
            <div className="row">
              {collections?.length > 0 ? (
                <div className="flex-1 w-full grid gap-3 md:grid-cols-2">
                  {collections?.map((collection, idx) => (
                    <CollectionCard
                      totalArtWork={collection?.artworks?.length || 0}
                      key={collection?._id}
                      title={collection?.title}
                      image={collection?.image}
                      link={`/dashboard/collections/${collection._id}`}
                    />
                  ))}
                </div>
              ) : (
                <p>
                  You have no collections yet.{" "}
                  <Link href="/dashboard/collections/create">
                    <button> Create One</button>
                  </Link>
                </p>
              )}
            </div>
            {/* <div className="heading-section">
              <h2 className="tf-title style-1 pb-30">Invites</h2>
            </div>
            <div className="row">
              <p>You have no invites</p>
            </div>
            <div className="heading-section">
              <h2 className="tf-title style-1 pb-30">Other Collections</h2>
            </div>
            <div className="row">
              <p>You work is not part of any collections</p>
            </div> */}
          </div>
        </>
      </DashboardLayoutWithSidebar>
    </>
  );
}
Collections.requireAuth = true;
export default Collections;
