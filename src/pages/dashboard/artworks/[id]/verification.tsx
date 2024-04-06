import Link from "next/link";
import Image from "@/components/common/image";
import { useState } from "react";
import { getToken } from "next-auth/jwt";
import axios from "@/lib/axios";
import DashboardLayoutWithSidebar, {
  DashboardPages,
} from "@/components/open9/layout/DashboardLayoutWithSidebar";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { artRoles } from "@/types";
import {
  PhotoLibrary,
  Portrait,
  Domain,
  Palette,
  PhotoAlbum,
  PhotoSizeSelectActual,
} from "@mui/icons-material";
import ArtistInfo from "@/components/dashboard/art-verification/artist-info";
import DealerInfo from "@/components/dashboard/art-verification/dealer-info";
import CollectorInfo from "@/components/dashboard/art-verification/collector-info";
import InstitutionInfo from "@/components/dashboard/art-verification/institution-info";

export const getServerSideProps = async ({ req, query }) => {
  try {
    const id = query?.id;
    const token: any = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });
    const res = await axios.get(`/art-piece/${id}`, {
      headers: { authorization: `Bearer ${token?.accessToken}` },
    });

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

export default function Verification({ artPiece }) {
  const [activeIndex, setActiveIndex] = useState(11);
  const [artRole, setArtRole] = useState("");
  const handleOnClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <>
      <DashboardLayoutWithSidebar
        activePage={DashboardPages.ART}
        hideSidebar={true}
      >
        <div id="create">
          <div className="wrapper-content-create">
            <div className="heading-section">
              <h2 className="tf-title pb-30">Art Verification</h2>
            </div>
            <div className="widget-tabs relative">
              <ul className="widget-menu-tab">
                <li
                  className={
                    activeIndex === 11
                      ? "item-title active tf-color"
                      : "item-title"
                  }
                  onClick={() => handleOnClick(11)}
                >
                  <span className="inner">
                    <span className="order">1</span> Acquisition{" "}
                    <i className="icon-keyboard_arrow_right" />
                  </span>
                </li>
                <li
                  className={
                    activeIndex === 12 ? "item-title active" : "item-title"
                  }
                  onClick={() => handleOnClick(12)}
                >
                  <span className="inner">
                    <span className="order">2</span>
                    {artRole === artRoles.ARTIST ? (
                      <>Artist</>
                    ) : artRole === artRoles.DEALER ? (
                      <>Dealer</>
                    ) : artRole === artRoles.COLLECTOR ? (
                      <>Collector</>
                    ) : artRole === artRoles.CUSTODIAN ? (
                      <>Institution</>
                    ) : (
                      <></>
                    )}{" "}
                    Information <i className="icon-keyboard_arrow_right" />
                  </span>
                </li>
                <li
                  className={
                    activeIndex === 13 ? "item-title active" : "item-title"
                  }
                  onClick={() => handleOnClick(13)}
                >
                  <span className="inner">
                    <span className="order">3</span>Preview
                  </span>
                </li>
              </ul>
              <div className="widget-content-tab">
                <div
                  className={`
                  items-center justify-center
                    ${activeIndex === 11 ? "active" : ""}
                  `}
                  style={{
                    display: `${activeIndex == 11 ? "" : "none"}`,
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <h3 className="p-10">Acquisition</h3>
                  <p>How did you come about this piece?</p>
                  <ToggleButtonGroup
                    color="primary"
                    value={artRole}
                    exclusive
                    onChange={(e, v) => setArtRole(v)}
                    aria-label="Platform"
                    className="p-20"
                  >
                    <ToggleButton
                      value={artRoles.ARTIST}
                      sx={{ height: "25rem", display: "block" }}
                    >
                      <Palette
                        sx={{
                          fill: "#3e7aa2",
                          width: "100%",
                          height: "90%",
                          mt: 0.375,
                        }}
                      />
                      <p>Artist</p>
                    </ToggleButton>
                    <ToggleButton
                      value={artRoles.DEALER}
                      sx={{ height: "25rem", display: "block" }}
                    >
                      <PhotoAlbum
                        sx={{
                          fill: "#3e7aa2",
                          width: "100%",
                          height: "90%",
                          mt: 0.375,
                        }}
                      />
                      <p>Dealer</p>
                    </ToggleButton>
                    <ToggleButton
                      value={artRoles.COLLECTOR}
                      sx={{ height: "25rem", display: "block" }}
                    >
                      <PhotoLibrary
                        sx={{
                          fill: "#3e7aa2",
                          width: "100%",
                          height: "90%",
                          mt: 0.375,
                        }}
                      />
                      <p>Collector</p>
                    </ToggleButton>
                    <ToggleButton
                      value={artRoles.CUSTODIAN}
                      sx={{ height: "25rem", display: "block" }}
                    >
                      <Domain
                        sx={{
                          fill: "#3e7aa2",
                          width: "100%",
                          height: "90%",
                          mt: 0.375,
                        }}
                      />
                      <p>Institution</p>
                    </ToggleButton>
                  </ToggleButtonGroup>
                  {artRole === artRoles.ARTIST ? (
                    <p>I created this art piece.</p>
                  ) : artRole === artRoles.DEALER ? (
                    <p>I am selling this piece on behalf of the Artist.</p>
                  ) : artRole === artRoles.COLLECTOR ? (
                    <p>I purchased this piece.</p>
                  ) : artRole === artRoles.CUSTODIAN ? (
                    <p>
                      I am holding this piece for exhibition or other purose{" "}
                    </p>
                  ) : (
                    <></>
                  )}
                  <button
                    className="tf-button style-3"
                    onClick={() => handleOnClick(12)}
                    disabled={!artRole}
                    style={{
                      alignItems: "center",
                      textAlign: "center",
                      justifySelf: "center",
                    }}
                  >
                    Next
                  </button>
                </div>

                <div
                  className={`
                      items-center justify-center widget-content-inner upload
                      ${activeIndex === 12 ? "active" : ""}
                  `}
                  style={{ display: `${activeIndex == 12 ? "" : "none"}` }}
                >
                  {artRole === artRoles.ARTIST ? (
                    <ArtistInfo />
                  ) : artRole === artRoles.DEALER ? (
                    <DealerInfo />
                  ) : artRole === artRoles.COLLECTOR ? (
                    <CollectorInfo />
                  ) : artRole === artRoles.CUSTODIAN ? (
                    <InstitutionInfo />
                  ) : (
                    <></>
                  )}
                </div>

                <div
                  className={
                    activeIndex === 13
                      ? "widget-content-inner submit active"
                      : "widget-content-inner submit"
                  }
                  style={{ display: `${activeIndex == 13 ? "" : "none"}` }}
                >
                  {/* <div className="wrap-upload w-full">
                    <form id="commentform" className="comment-form">
                      <fieldset className="name">
                        <label>Product name *</label>
                        <input
                          type="text"
                          id="name"
                          placeholder="Product name"
                          name="name"
                          tabIndex={2}
                          aria-required="true"
                          required
                        />
                      </fieldset>
                      <fieldset className="message">
                        <label>Description *</label>
                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          placeholder="Please describe your product*"
                          tabIndex={4}
                          aria-required="true"
                          required
                        />
                      </fieldset>
                      <div className="flex gap30">
                        <fieldset className="price">
                          <label>Price</label>
                          <input
                            type="text"
                            id="price"
                            placeholder="Price"
                            name="price"
                            tabIndex={2}
                            aria-required="true"
                            required
                          />
                        </fieldset>
                        <fieldset className="properties">
                          <label>Properties</label>
                          <input
                            type="text"
                            id="properties"
                            placeholder="Properties"
                            name="properties"
                            tabIndex={2}
                            aria-required="true"
                            required
                          />
                        </fieldset>
                        <fieldset className="size">
                          <label>Size</label>
                          <input
                            type="text"
                            id="size"
                            placeholder="Size"
                            name="size"
                            tabIndex={2}
                            aria-required="true"
                            required
                          />
                        </fieldset>
                      </div>
                      <fieldset className="rarity">
                        <label>Rarity</label>
                        <select className="select" name="rarity" id="rarity">
                          <option>afafdas</option>
                          <option value="100$">100$</option>
                          <option value="1000$">1000$</option>
                          <option value="10000$">10000$</option>
                        </select>
                      </fieldset>
                      <fieldset className="royatity">
                        <label>Royatity</label>
                        <input
                          type="text"
                          id="royatity"
                          placeholder="Royatity"
                          name="royatity"
                          tabIndex={2}
                          aria-required="true"
                          required
                        />
                      </fieldset>
                      <div className="btn-submit flex gap30 justify-center">
                        <button className="tf-button style-1 h50 w320 active">
                          Clear
                          <i className="icon-arrow-up-right2" />
                        </button>
                        <button
                          className="tf-button style-1 h50 w320"
                          type="submit"
                        >
                          Create Record
                          <i className="icon-arrow-up-right2" />
                        </button>
                      </div>
                    </form>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayoutWithSidebar>
    </>
  );
}
