import { useEffect, useState } from "react";
import Link from "next/link";
import DashboardLayoutWithSidebar, { DashboardPages } from "@/components/open9/layout/DashboardLayoutWithSidebar";
import AutoSlider1 from "@/open9/slider/AutoSlider1";
import AutoSlider2 from "@/open9/slider/AutoSlider2";
import { getToken} from 'next-auth/jwt';
import axios from "@/lib/axios";

export const getServerSideProps = async ({req, query}) => {
  try {
      const token: any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
      console.log("token here is ", token)
      if(!token) return;

      const res = await axios.get(`/org/user` , { headers: { authorization: `Bearer ${token?.user?.accessToken}`}});

      return { props: { organizations: res.data.organizations } }
  } catch (error) {
      console.error("error here looks like ", error);
      if(error?.response?.status === 404){
          return {
              notFound: true,
          };
      }
     throw new Error(error);
  }
}

function Collections({ collections }) {

  return (
    <>
      <DashboardLayoutWithSidebar activePage={DashboardPages.COLLECTIONS}>
        <>
          <div className="row">
            <div className="action__body w-full mb-40">
                <div className="tf-tsparticles">
                    <div id="tsparticles7" data-color="#161616" data-line="#000" />
                </div>
                <h2>Collections</h2>
                <div className="flat-button flex">
                    <Link href="/explore" className="tf-button style-2 h50 w190 mr-10">Explore<i className="icon-arrow-up-right2" /></Link>
                    <Link href="/dashboard/collections/create" className="tf-button style-2 h50 w230">Create<i className="icon-arrow-up-right2" /></Link>
                </div>
                <div className="bg-home7">
                    <AutoSlider1 />
                    <AutoSlider2 />
                    <AutoSlider1 />
                </div>
            </div>
            <div className="row">
              {collections?.length > 0 ? collections?.map((org, idx) => (
                  <div key={idx} className="fl-item col-xl-3 col-lg-4 col-md-6 col-sm-6">
                    <div className="tf-card-box style-1">
                      <div className="card-media">
                        <Link href="#">
                          <img
                            src={org?.image}
                            alt=""
                          />
                        </Link>
                        <span className="wishlist-button icon-heart" />
                        <div className="button-place-bid">
                          <Link href={`/dashboard/organization/${org._id}`} className="tf-button">
                            <span>View</span>
                          </Link>
                        </div>
                      </div>
                      <h5 className="name">
                        <Link href="#">{org.name}</Link>
                      </h5>
                      <div className="author flex items-center">
                        <div className="avatar">
                          <img
                            src={`fdafasdf`}
                            alt="Image"
                          />
                        </div>
                        <div className="info">
                          <span className="tf-color">Created by:</span>
                          <h6>
                            <Link href="/author-2">Org name</Link>{" "}
                          </h6>
                        </div>
                      </div>
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
            : <p>You have no collections yet. <Link href="/dashboard/organizations/create"><button> Create One</button></Link></p>}
            </div>
            <div className="heading-section">
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
            </div>
          </div>
        </>
      </DashboardLayoutWithSidebar>
    </>
  )
}
Collections.requiredAuth = true;
export default Collections;