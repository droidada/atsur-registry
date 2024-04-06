import { useEffect, useState } from "react";
import { Menu } from "@headlessui/react";
import Link from "next/link";

import BarChart from "@/open9/elements/BarChart";
import DashboardLayoutWithSidebar, {
  DashboardPages,
} from "@/components/open9/layout/DashboardLayoutWithSidebar";
import AutoSlider1 from "@/open9/slider/AutoSlider1";
import AutoSlider2 from "@/open9/slider/AutoSlider2";
import { getToken } from "next-auth/jwt";
import axios from "@/lib/axios";
import axiosMain from "axios";

import DeleteDialog from "@/components/dashboard/DeleteDialog";
import EditCollection from "@/components/dashboard/edit-collection";
import AddArtworkToCollection from "@/components/dashboard/add-artwork-to-collection";
import Image from "next/image";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { FormatColorResetSharp } from "@mui/icons-material";
import { useRouter } from "next/router";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

export const getServerSideProps = async ({ req, query }) => {
  try {
    const id = query?.id;
    const token: any = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });
    const res = await axios.get(`/collection/${id}`, {
      headers: { authorization: `Bearer ${token?.accessToken}` },
    });

    console.log(res.data);

    return { props: { collections: res.data.collection } };
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

function Collection({ collections }) {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openAddArtWork, setOpenAddArtWork] = useState(false);
  const [currentArtwork, setCurrentArtwork] = useState<any>({});
  const [openRemoveArtwork, setOpenRemoveArtwork] = useState(false);
  const axiosAuth = useAxiosAuth();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleRemove = async () => {
    try {
      setLoading(true);
      const res = await axiosAuth.post(
        `/collection/remove-art-work/${collections._id}`,
        {
          artPieceId: currentArtwork._id,
        },
      );
      router.replace(router.asPath);
      setOpenRemoveArtwork(false);
    } catch (error) {
      setError(false);

      if (axiosMain.isAxiosError(error)) {
        setErrorMessage(error.response?.data?.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <DashboardLayoutWithSidebar hideSidebar activePage={DashboardPages.ART}>
        <>
          <div className="row w-full px-4">
            <div
              style={{
                backgroundImage: `url(${collections?.image}) `,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
              className="action__body w-full mb-40 rounded-xl"
            >
              <div className="tf-tsparticles">
                <div id="tsparticles7" data-color="#161616" data-line="#000" />
              </div>
              <h2 className="drop-shadow-md text-white">
                {collections?.title}
              </h2>
              <div className="flat-button gap-4 flex">
                <Button
                  sx={{ borderRadius: "12px" }}
                  onClick={() => setOpenEdit(true)}
                  className="tf-button style-1 h50 w190 mr-10 rounded-xl"
                >
                  Edit
                  <i className="icon-arrow-up-right2" />
                </Button>
                <Button
                  sx={{ borderRadius: "12px" }}
                  onClick={() => setOpenDeleteDialog(true)}
                  className="tf-button style-1 h50 w230 rounded-xl"
                >
                  Delete
                  <i className="icon-arrow-up-right2" />
                </Button>
              </div>
              <div className="bg-home7">
                <AutoSlider1 />
                <AutoSlider1 />
                <AutoSlider2 />
              </div>
            </div>
            <div className="row">
              {/* DESCRIPTION */}
              <div className="col-12">
                <div className="tf-section-2 product-detail">
                  <h2 className="title">Description</h2>
                  <p>{collections?.description}</p>
                </div>
              </div>
            </div>
            {/* ARTWORKs */}

            <div className="row">
              <div className="col-12">
                <div className="tf-section-2 flex justify-between items-center product-detail">
                  <h2 className="title">Artworks</h2>
                  <Button
                    sx={{ borderRadius: "12px" }}
                    onClick={() => setOpenAddArtWork(true)}
                    className="tf-button style-1 rounded-xl h50 w190 mr-10"
                  >
                    Add Artwork
                  </Button>
                </div>
                <div className="tf-section-2 ">
                  <div className="w-full grid gap-3 md:grid-cols-2 lg:grid-cols-3 grid-cols-1 ">
                    {collections?.artworks?.map((artwork) => (
                      <div
                        key={artwork._id}
                        className="tf-card-box style-5 mb-0 relative max-w-[450px] overflow-hidden rounded-xl w-full h-[400px]"
                      >
                        <div>
                          <Image
                            fill
                            src={
                              artwork?.assets[0]?.url == "null"
                                ? ""
                                : artwork?.assets[0]?.url
                            }
                            alt={collections?.name}
                            className="object-cover"
                          />
                        </div>

                        <Button
                          sx={{ borderRadius: "12px" }}
                          onClick={() => {
                            setOpenRemoveArtwork(true);
                            setCurrentArtwork(artwork);
                          }}
                          className="wishlist-button left-4 drop-shadow-md"
                        >
                          Remove
                          <i className="icon-minus" />
                        </Button>
                        <Link
                          href={`/dashboard/artworks/${artwork._id}`}
                          className="featured-countdown"
                        >
                          View Artwork
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Dialog
            open={openRemoveArtwork}
            onClose={() => setOpenRemoveArtwork(false)}
          >
            <DialogTitle variant="h3">Remove Artwork</DialogTitle>
            <DialogContent>
              <p>
                Are you sure you want to remove this artwork from the
                collection?
              </p>
            </DialogContent>
            <DialogActions>
              <Button
                sx={{ borderRadius: "12px" }}
                className="tf-button style-1 "
                onClick={() => setOpenRemoveArtwork(false)}
              >
                Cancel
              </Button>
              <LoadingButton
                sx={{ borderRadius: "12px" }}
                className="tf-button style-1 "
                loading={loading}
                onClick={handleRemove}
              >
                Remove
              </LoadingButton>
            </DialogActions>
          </Dialog>
        </>
      </DashboardLayoutWithSidebar>

      <DeleteDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        deleteUrl={`/collection/delete/${collections?._id}`}
        redirectUrl={`/dashboard/collections`}
        itemToDelete={{ itemType: "collection", itemId: "" }}
      />

      <EditCollection
        open={openEdit}
        handleClose={() => setOpenEdit(false)}
        collection={collections}
      />

      <AddArtworkToCollection
        open={openAddArtWork}
        collection={collections}
        handleClose={() => setOpenAddArtWork(false)}
      />
    </>
  );
}
Collection.requireAuth = true;
export default Collection;
