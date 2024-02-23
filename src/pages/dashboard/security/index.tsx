import { useEffect, useState } from "react";
import Link from "next/link";
import DashboardLayoutWithSidebar, { DashboardPages } from "@/components/open9/layout/DashboardLayoutWithSidebar";
import AutoSlider1 from "@/open9/slider/AutoSlider1";
import AutoSlider2 from "@/open9/slider/AutoSlider2";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { useAuthContext } from "@/providers/auth.context";

function Organizations() {
  const [orgs, setOrgs] = useState([]);

  const axiosAuth = useAxiosAuth();
  const { user } = useAuthContext();

  useEffect(() => {
    (async () => {
      if(!user) return;
      const res =  await axiosAuth.get(`/orgs/user/${user?._id}`);
      console.log("we have orgs here ", res.data?.organizations)
      setOrgs(res.data?.organizations);
    })()
  }, [])

  return (
    <>
      <DashboardLayoutWithSidebar activePage={DashboardPages.ORGANIZATIONS}>
        <>
          <div className="row">
            <div className="action__body w-full mb-40">
                <div className="tf-tsparticles">
                    <div id="tsparticles7" data-color="#161616" data-line="#000" />
                </div>
                <h2>Add Art to the Archive</h2>
                <div className="flat-button flex">
                    <Link href="/explore" className="tf-button style-2 h50 w190 mr-10">Explore<i className="icon-arrow-up-right2" /></Link>
                    <Link href="/dashboard" className="tf-button style-2 h50 w230">Create Art Piece<i className="icon-arrow-up-right2" /></Link>
                </div>
                <div className="bg-home7">
                    <AutoSlider1 />
                    <AutoSlider2 />
                    <AutoSlider1 />
                </div>
            </div>
            <div className="row">
              {orgs?.map((org, idx) => (
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
                            src=""
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
              ))}
            </div>
          </div>
        </>
      </DashboardLayoutWithSidebar>
    </>
  )
}
Organizations.requiredAuth = true;
export default Organizations;
