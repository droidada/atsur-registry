import { useEffect, useState } from "react";
import { Menu } from "@headlessui/react";
import Link from "next/link";
import Image from "@/components/common/image";
import BarChart from "@/open9/elements/BarChart";
import DashboardLayoutWithSidebar, {
  DashboardPages,
} from "@/components/open9/layout/DashboardLayoutWithSidebar";
import AutoSlider1 from "@/open9/slider/AutoSlider1";
import AutoSlider2 from "@/open9/slider/AutoSlider2";
import { getToken } from "next-auth/jwt";
import axios from "@/lib/axios";
import EditExhibition from "@/components/dashboard/edit-exhibition";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemAvatar,
  IconButton,
  Avatar,
  Switch,
  Accordion,
  AccordionActions,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import {
  Folder as FolderIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Publish as PublishIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";
import EditAppraisal from "@/components/dashboard/edit-appraisal";
import { useRouter } from "next/router";
import EditPublication from "@/components/dashboard/edit-publication";
import DeleteDialog from "@/components/dashboard/DeleteDialog";

export const getServerSideProps = async ({ req, query }) => {
  try {
    const id = query?.id;
    const token: any = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });
    const res = await axios.get(`/art-piece/${id}`, {
      headers: { authorization: `Bearer ${token?.user?.accessToken}` },
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

function ArtPiece({ artPiece }) {
  const router = useRouter();
  const [editExhibition, setEditExhibition] = useState(false);
  const [editedExhibition, setEditedExhibition] = useState({});
  const [editAppraisal, setEditAppraisal] = useState(false);
  const [editedAppraisal, setEditedAppraisal] = useState({});
  const [editPublication, setEditPublication] = useState(false);
  const [editedPublication, setEditedPublication] = useState({});
  const [openDiaglog, setOpenDialog] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{
    itemType: "publication" | "exhibition" | "appraisal" | "";
    itemId: string;
  }>({
    itemId: "",
    itemType: "",
  });

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
                <Link
                  href="/explore"
                  className="tf-button style-2 h50 w190 mr-10"
                >
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
            <div className="row">
              <div className="tf-section-2 product-detail">
                <div className="row">
                  <div data-wow-delay="0s" className="wow fadeInLeft col-md-6">
                    <div className="tf-card-box style-5 mb-0">
                      <div className="card-media mb-0">
                        <Link href="#">
                          <Image src={artPiece?.assets[0]?.url} alt="" />
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
                  <div className="col-md-6">
                    <div
                      data-wow-delay="0s"
                      className="wow fadeInRight infor-product"
                    >
                      <div className="text">
                        {artPiece?.collection && artPiece.collection.name}
                        {/* 8SIAN Main Collection{" "} */}
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
                        Created: May 22 at 9:39
                      </h6>
                      <div className="content">
                        <ListItem dense>
                          <ListItemIcon>
                            <PublishIcon />
                          </ListItemIcon>
                          <h5>Publish</h5>
                          <Switch
                            edge="end"
                            // onChange={handleToggle('wifi')}
                            // checked={checked.indexOf('wifi') !== -1}
                            inputProps={{
                              "aria-labelledby": "switch-list-label-wifi",
                            }}
                          />
                        </ListItem>
                        {/* <div className="text">Current price</div>
                          <div className="justify-between">
                            <p>
                              0,032 ETH <span>$58,11</span>
                            </p>
                          </div> */}
                      </div>
                    </div>

                    <div className="row">
                      <div className="flat-accordion2">
                        <Accordion className="accordion" defaultExpanded>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                            className="toggle-title"
                          >
                            <h6>Description</h6>
                          </AccordionSummary>
                          <AccordionDetails>
                            <p>{artPiece.description}</p>
                          </AccordionDetails>
                        </Accordion>

                        <Accordion className="accordion">
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                            className="toggle-title"
                          >
                            <h6>Exhibitions</h6>
                          </AccordionSummary>
                          <AccordionDetails>
                            <List>
                              {artPiece?.exhibitions?.length > 0 &&
                                artPiece?.exhibitions?.map(
                                  (exhibition, idx) => (
                                    <ListItem
                                      key={idx}
                                      secondaryAction={
                                        <>
                                          <IconButton
                                            edge="end"
                                            aria-label="edit"
                                          >
                                            <EditIcon
                                              onClick={() => {
                                                setEditedExhibition(exhibition);
                                                setEditExhibition(true);
                                              }}
                                            />
                                          </IconButton>
                                          <IconButton
                                            onClick={() => {
                                              setOpenDialog(true);
                                              setItemToDelete({
                                                itemId: exhibition?._id,
                                                itemType: "exhibition",
                                              });
                                            }}
                                            edge="end"
                                            aria-label="delete"
                                          >
                                            <DeleteIcon />
                                          </IconButton>
                                        </>
                                      }
                                    >
                                      <ListItemAvatar>
                                        <Avatar>
                                          <FolderIcon />
                                        </Avatar>
                                      </ListItemAvatar>
                                      <span>
                                        <h6 className="to-white">
                                          {exhibition.name}
                                        </h6>
                                        <p>{`by ${exhibition?.organizer?.name} at ${exhibition?.location?.address} ${exhibition?.location?.country}`}</p>
                                      </span>
                                    </ListItem>
                                  ),
                                )}
                            </List>
                            <button
                              className="tf-button style-1"
                              onClick={() => {
                                setEditedExhibition(null);
                                setEditExhibition(true);
                              }}
                            >
                              Add
                            </button>
                          </AccordionDetails>
                        </Accordion>

                        <Accordion className="accordion">
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                            className="toggle-title"
                          >
                            <h6>Appraisals</h6>
                          </AccordionSummary>
                          <AccordionDetails>
                            <List>
                              {artPiece?.appraisals?.length > 0 &&
                                artPiece?.appraisals?.map((a, idx) => (
                                  <ListItem
                                    key={idx}
                                    secondaryAction={
                                      <>
                                        <IconButton
                                          edge="end"
                                          aria-label="edit"
                                          onClick={() => {
                                            setEditedAppraisal(a);
                                            setEditAppraisal(true);
                                          }}
                                        >
                                          <EditIcon />
                                        </IconButton>
                                        <IconButton
                                          onClick={() => {
                                            setOpenDialog(true);
                                            setItemToDelete({
                                              itemId: a?._id,
                                              itemType: "appraisal",
                                            });
                                          }}
                                          edge="end"
                                          aria-label="delete"
                                        >
                                          <DeleteIcon />
                                        </IconButton>
                                      </>
                                    }
                                  >
                                    <ListItemAvatar>
                                      <Avatar>
                                        <FolderIcon />
                                      </Avatar>
                                    </ListItemAvatar>
                                    <span>
                                      <p>
                                        Valued at{" "}
                                        <b className="to-gray">{`${a?.value} ${a?.currency}`}</b>{" "}
                                        by{" "}
                                        <b className="to-gray">{a.appraiser}</b>
                                      </p>
                                    </span>
                                  </ListItem>
                                ))}
                            </List>
                            <button
                              className="tf-button style-1"
                              onClick={() => setEditAppraisal(true)}
                            >
                              Add
                            </button>
                          </AccordionDetails>
                        </Accordion>

                        <Accordion className="accordion">
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                            className="toggle-title"
                          >
                            <h6>Publications</h6>
                          </AccordionSummary>
                          <AccordionDetails>
                            <List>
                              {artPiece?.publications?.length > 0 &&
                                artPiece?.publications?.map((a, idx) => (
                                  <ListItem
                                    key={idx}
                                    secondaryAction={
                                      <>
                                        <IconButton
                                          edge="end"
                                          aria-label="edit"
                                          onClick={() => {
                                            setEditPublication(true);
                                            setEditedPublication(a);
                                          }}
                                        >
                                          <EditIcon />
                                        </IconButton>
                                        <IconButton
                                          onClick={() => {
                                            setOpenDialog(true);
                                            setItemToDelete({
                                              itemId: a?._id,
                                              itemType: "publication",
                                            });
                                          }}
                                          edge="end"
                                          aria-label="delete"
                                        >
                                          <DeleteIcon />
                                        </IconButton>
                                      </>
                                    }
                                  >
                                    <ListItemAvatar>
                                      <Avatar>
                                        <FolderIcon />
                                      </Avatar>
                                    </ListItemAvatar>
                                    <span>
                                      <p>
                                        Article Name{" "}
                                        <b className="to-gray">
                                          {a?.articleName}{" "}
                                        </b>{" "}
                                        written by{" "}
                                        <b className="to-gray">
                                          {a.authorName}
                                        </b>
                                      </p>
                                    </span>
                                  </ListItem>
                                ))}
                            </List>
                            <button
                              className="tf-button style-1"
                              onClick={() => {
                                setEditPublication(true);
                                setEditedPublication(null);
                              }}
                            >
                              Add
                            </button>
                          </AccordionDetails>
                        </Accordion>

                        <Accordion className="accordion">
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                            className="toggle-title"
                          >
                            <h6>Provenance</h6>
                          </AccordionSummary>
                          <AccordionDetails>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit, sed do eiusmod tempor incididunt ut labore
                              et dolore magna aliqua. Ut enim ad minim veniam,
                              quis nostrud exercitation.Lorem ipsum dolor sit
                              amet, consectetur adipiscing elit, sed do eiusmod.
                            </p>
                          </AccordionDetails>
                        </Accordion>

                        <Accordion className="accordion">
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                            className="toggle-title"
                          >
                            <h6>Locations</h6>
                          </AccordionSummary>
                          <AccordionDetails>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit, sed do eiusmod tempor incididunt ut labore
                              et dolore magna aliqua. Ut enim ad minim veniam,
                              quis nostrud exercitation.Lorem ipsum dolor sit
                              amet, consectetur adipiscing elit, sed do eiusmod.
                            </p>
                          </AccordionDetails>
                        </Accordion>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      </DashboardLayoutWithSidebar>
      <EditExhibition
        open={editExhibition}
        exhibition={editedExhibition}
        artPieceId={artPiece._id}
        handleClose={() => {
          setEditExhibition(false);
          router.replace(router.asPath);
        }}
      />
      <EditAppraisal
        open={editAppraisal}
        artPieceId={artPiece._id}
        appraisal={editedAppraisal}
        handleClose={() => {
          setEditAppraisal(false);
          router.replace(router.asPath);
        }}
      />
      <EditPublication
        open={editPublication}
        artPieceId={artPiece._id}
        publication={editedPublication}
        handleClose={() => {
          setEditPublication(false);
          router.replace(router.asPath);
        }}
      />

      <DeleteDialog
        open={openDiaglog}
        onClose={() => {
          setOpenDialog(false);
          router.replace(router.asPath);
        }}
        itemToDelete={itemToDelete}
        artPieceId={artPiece._id}
      />
    </>
  );
}
ArtPiece.requiredAuth = true;
export default ArtPiece;
