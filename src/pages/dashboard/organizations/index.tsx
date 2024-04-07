import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "@/components/common/image";
import DashboardLayoutWithSidebar, {
  DashboardPages,
} from "@/components/open9/layout/DashboardLayoutWithSidebar";
import AutoSlider1 from "@/open9/slider/AutoSlider1";
import AutoSlider2 from "@/open9/slider/AutoSlider2";
import { getToken } from "next-auth/jwt";
import axios from "@/lib/axios";
import OrgCard from "@/components/common/OrgCard";

export const getServerSideProps = async ({ req, query }) => {
  try {
    const token: any = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });
    console.log(process.env.NEXTAUTH_SECRET);
    console.log("token here is ", token);
    if (!token) return;

    const res = await axios.get(`/org/user`, {
      headers: { authorization: `Bearer ${token?.accessToken}` },
    });

    return { props: { organizations: res.data.organizations } };
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

function Organizations({ organizations }) {
  console.log("This is the organizaton", organizations);
  return (
    <>
      <DashboardLayoutWithSidebar activePage={DashboardPages.ORGANIZATIONS}>
        <div className="w-full px-4">
          <div className="row">
            <div className="action__body w-full mb-40 rounded-xl">
              <div className="tf-tsparticles">
                <div id="tsparticles7" data-color="#161616" data-line="#000" />
              </div>
              <h2>Organizations</h2>
              <div className="flat-button flex">
                <Link
                  href="/explore"
                  className="tf-button style-2 h50 w190 mr-10 rounded-xl"
                >
                  Explore
                  <i className="icon-arrow-up-right2" />
                </Link>
                <Link
                  href="/dashboard/organizations/create"
                  className="tf-button style-2 h50 w230 rounded-xl"
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
              <h2 className="tf-title style-1 pb-30">My Organizations</h2>
            </div>
            <div className="row">
              {organizations?.length > 0 ? (
                <div className="flex-1 w-full grid gap-3 md:grid-cols-2 lg:grid-cols-3 grid-cols-1">
                  {organizations?.map((org, idx) => (
                    <OrgCard
                      link={`/dashboard/organizations/${org._id}`}
                      image={org?.image}
                      name={org?.name}
                      totalMembers={org.members?.length - 1}
                      key={org?._id}
                    />
                  ))}
                </div>
              ) : (
                <p>
                  You have not organizations yet.{" "}
                  <Link href="/dashboard/organizations/create">
                    <button> Create One</button>
                  </Link>
                </p>
              )}
            </div>
            <div className="heading-section">
              <h2 className="tf-title style-1 pb-30">Invites</h2>
            </div>
            <div className="row">
              <p>You have no invites</p>
            </div>
            <div className="heading-section">
              <h2 className="tf-title style-1 pb-30">Organizations</h2>
            </div>
            <div className="row">
              <p>You are not a member of any organizations</p>
            </div>
          </div>
        </div>
      </DashboardLayoutWithSidebar>
    </>
  );
}
Organizations.requireAuth = true;
export default Organizations;
