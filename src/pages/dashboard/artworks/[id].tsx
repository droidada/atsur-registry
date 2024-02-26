import { useEffect, useState } from "react";
import { Menu } from "@headlessui/react";
import Link from "next/link";
import Image from "next/image";
import BarChart from "@/open9/elements/BarChart";
import DashboardLayoutWithSidebar, { DashboardPages } from "@/components/open9/layout/DashboardLayoutWithSidebar";
import AutoSlider1 from "@/open9/slider/AutoSlider1";
import AutoSlider2 from "@/open9/slider/AutoSlider2";
import { getToken} from 'next-auth/jwt';
import axios from "@/lib/axios";
import EditExhibition from "@/components/dashboard/edit-exhibition";

export const getServerSideProps = async ({ req, query }) => {
  try {
    const id = query?.id;
    const token: any = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });
    const res = await axios.get(`/art-piece/${id}`,
      { headers: { authorization: `Bearer ${token?.user?.accessToken}` } },
    );

    return { props: { artPiece: res.data.artPiece } };
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

function ArtPiece({ artPiece }) {

  const [isActive, setIsActive] = useState({
      status: false,
      key: 1,
  })
  const [editExhibition, setEditExhibition] = useState(false)
  const handleToggle = (key) => {
      if (isActive.key === key) {
          setIsActive({
              status: false,
              key: isActive.key
          })
      } else {
          setIsActive({
              status: true,
              key,
          })
      }
  }

  return (
    <>
      <DashboardLayoutWithSidebar hideSidebar activePage={DashboardPages.ART}>
        <>
          <div className="row">
            <div className="action__body w-full mb-40">
                <div className="tf-tsparticles">
                    <div id="tsparticles7" data-color="#161616" data-line="#000" />
                </div>
                <h2>Artworks</h2>
                <div className="flat-button flex">
                    <Link href="/explore" className="tf-button style-2 h50 w190 mr-10">Explore<i className="icon-arrow-up-right2" /></Link>
                    <Link href="/dashboard" className="tf-button style-2 h50 w230">Create<i className="icon-arrow-up-right2" /></Link>
                </div>
                <div className="bg-home7">
                    <AutoSlider1 />
                    <AutoSlider2 />
                    <AutoSlider1 />
                </div>
            </div>
            <div className="row">
              <div className="tf-section-2 product-detail">
                
                  <div className="row">
                    <div data-wow-delay="0s" className="wow fadeInLeft col-md-8">
                      <div className="tf-card-box style-5 mb-0">
                        <div className="card-media mb-0">
                          <Link href="#">
                            <img src={artPiece?.assets[0]?.url} alt="" />
                          </Link>
                        </div>
                        <h6 className="price gem">
                          <i className="icon-gem" />
                        </h6>
                        <div className="wishlist-button">
                          10
                          <i className="icon-heart" />
                        </div>
                        <div className="featured-countdown">
                          {/* <Countdown endDateTime={currentTime.setDate(currentTime.getDate() + 2)} /> */}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div
                        data-wow-delay="0s"
                        className="wow fadeInRight infor-product"
                      >
                        <div className="text">
                          8SIAN Main Collection{" "}
                          <span className="icon-tick">
                            <span className="path1" />
                            <span className="path2" />
                          </span>
                        </div>
                        <h2>{artPiece?.title}</h2>
                      </div>
                      <div
                        data-wow-delay="0s"
                        className="wow fadeInRight product-item time-sales"
                      >
                        <h6 className="to-white">
                          <i className="icon-clock" />
                          Sale ends May 22 at 9:39
                        </h6>
                        <div className="content">
                          <div className="text">Current price</div>
                          <div className="justify-between">
                            <p>
                              0,032 ETH <span>$58,11</span>
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                          <div className="flat-accordion2">
                              <div data-wow-delay="0s" className="wow fadeInUp flat-toggle2">
                                  <h6 className={isActive.key == 1 ? "toggle-title active" : "toggle-title"} onClick={() => handleToggle(1)}>Description</h6>
                                  <div className="toggle-content" style={{ display: `${isActive.key == 1 ? "block" : "none"}` }}>
                                      <p>{artPiece.description}</p>
                                  </div>
                              </div>
                              <div data-wow-delay="0s" className="wow fadeInUp flat-toggle2">
                                  <h6 className={isActive.key == 2 ? "toggle-title active" : "toggle-title"} onClick={() => handleToggle(2)}>Provenance</h6>
                                  <div className="toggle-content" style={{ display: `${isActive.key == 2 ? "block" : "none"}` }}>
                                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</p>
                                      <button className="tf-button style-1">Add</button>
                                  </div>
                              </div>
                              <div data-wow-delay="0s" className="wow fadeInUp flat-toggle2">
                                  <h6 className={isActive.key == 3 ? "toggle-title active" : "toggle-title"} onClick={() => handleToggle(3)}>Exhibitions</h6>
                                  <div className="toggle-content" style={{ display: `${isActive.key == 3 ? "block" : "none"}` }}>
                                      <p>Blockchain is a shared, immutable ledger that facilitates the process of recording transactions and tracking assets in a business network. An asset can be tangible (a house, car, cash, land) or intangible (intellectual property, patents, copyrights, branding). Virtually anything of value can be tracked and traded on a blockchain network, reducing risk and cutting costs for all involved</p>
                                      <button className="tf-button style-1" onClick={()=> setEditExhibition(true)}>Add</button>
                                  </div>
                              </div>
                              <div data-wow-delay="0s" className="wow fadeInUp flat-toggle2">
                                  <h6 className={isActive.key == 4 ? "toggle-title active" : "toggle-title"} onClick={() => handleToggle(4)}>Appraisals</h6>
                                  <div className="toggle-content" style={{ display: `${isActive.key == 4 ? "block" : "none"}` }}>
                                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</p>
                                  </div>
                              </div>
                              <div data-wow-delay="0s" className="wow fadeInUp flat-toggle2">
                                  <h6 className={isActive.key == 5 ? "toggle-title active" : "toggle-title"} onClick={() => handleToggle(5)}>Provenance</h6>
                                  <div className="toggle-content" style={{ display: `${isActive.key == 5 ? "block" : "none"}` }}>
                                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</p>
                                  </div>
                              </div>
                              <div data-wow-delay="0s" className="wow fadeInUp flat-toggle2">
                                  <h6 className={isActive.key == 6 ? "toggle-title active" : "toggle-title"} onClick={() => handleToggle(6)}>Publications</h6>
                                  <div className="toggle-content" style={{ display: `${isActive.key == 6 ? "block" : "none"}` }}>
                                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</p>
                                  </div>
                              </div>
                              <div data-wow-delay="0s" className="wow fadeInUp flat-toggle2">
                                  <h6 className={isActive.key == 7 ? "toggle-title active" : "toggle-title"} onClick={() => handleToggle(7)}>Locations</h6>
                                  <div className="toggle-content" style={{ display: `${isActive.key == 7 ? "block" : "none"}` }}>
                                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</p>
                                  </div>
                              </div>
                              <div data-wow-delay="0s" className="wow fadeInUp flat-toggle2">
                                  <h6 className={isActive.key == 8 ? "toggle-title active" : "toggle-title"} onClick={() => handleToggle(8)}>Viewers</h6>
                                  <div className="toggle-content" style={{ display: `${isActive.key == 8 ? "block" : "none"}` }}>
                                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</p>
                                  </div>
                              </div>
                          </div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </>
      </DashboardLayoutWithSidebar>
      <EditExhibition open={editExhibition} handleClose={()=> setEditExhibition(false)}  />
    </>
  )
}
ArtPiece.requiredAuth = true;
export default ArtPiece;
