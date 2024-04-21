import useAxiosAuth from "@/hooks/useAxiosAuth";
import { useToast } from "@/providers/ToastProvider";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { set } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

interface Props {
  type: string;
  inviter: {
    firstName?: string;
    lastName?: string;
  };
  invitee: any;
  data: any;
  objectType: "art-piece" | "org";
}
const AuthenticatedScreen = ({
  type,
  inviter,
  data,
  objectType,
  invitee,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [acceptLoading, setAcceptLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);
  const axiosFetch = useAxiosAuth();
  const router = useRouter();
  const { token } = router.query;

  const toast = useToast();
  const [message, setMessage] = useState("");

  console.log(invitee);

  const handleAccept = async () => {
    try {
      setAcceptLoading(true);
      if (type !== "org") {
        const { data } = await axiosFetch.post("/invite/accept", {
          token,
          userResponse: "accepted",
        });
        toast.success("Successfully accepted the invitation!");
        router.push("/dashboard");
      } else {
        if (invitee?.org) {
          const { data } = await axiosFetch.post("/invite/accept", {
            token,
            userResponse: "accepted",
          });
          toast.success("Successfully accepted the invitation!");
          router.push(`/dashboard/organizations/${invitee?.org}`);
        }
        router.push(`/dashboard/organizations/create?token=${token}`);
      }
    } catch (error) {
      toast.error("Error accepting the invitation!");
      console.log(error);
    } finally {
      setAcceptLoading(false);
    }
  };

  const handleReject = async () => {
    try {
      setRejectLoading(true);
      const { data } = await axiosFetch.post("/invite/accept", {
        token,
        userResponse: "rejected",
      });
      toast.success("Successfully rejected the invitation!");
      // router.push("/dashboard");
    } catch (error) {
      toast.error("Error accepting the invitation!");
      console.log(error);
    } finally {
      setRejectLoading(false);
    }
  };

  console.log(data);

  useEffect(() => {
    switch (type) {
      case "user":
        setMessage("join our platform as a user");
        break;
      case "art-piece-collaborator":
        setMessage(` collaborate on "${data?.title}"`);
        break;
      case "org-collaborator":
        setMessage(` collaborate on "${data?.name}" organization`);
        break;
      case "member-org":
        setMessage(` collaborate on "${data?.name}" organization`);
        break;
      case "org":
        setMessage(`join our platform as an organization`);
        break;
      default:
        setMessage(` join our platform `);
    }
  }, [type]);

  return (
    <div className="container mx-auto flex flex-col items-center gap-5 p-10 min-h-screen">
      <h2>Invitation</h2>
      <p>
        {inviter?.firstName} {inviter?.lastName} invited you to {message}. Do
        you want to accept the invitation?
      </p>

      <div className="flex gap-3">
        {!["org", "user"].includes(type) && (
          <Button
            onClick={() => setOpen(true)}
            variant="contained"
            className="style-1 rounded"
          >
            {type == "user"
              ? "View Inviter"
              : type == "org-collaborator"
              ? "View Organization"
              : type == "member-org" || type == "org"
              ? "View Organization"
              : "View Art Piece"}
          </Button>
        )}
        <LoadingButton
          loading={acceptLoading}
          variant="contained"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleAccept}
        >
          Accept
        </LoadingButton>
        <LoadingButton
          loading={rejectLoading}
          variant="contained"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleReject}
        >
          Reject
        </LoadingButton>
      </div>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle id="alert-dialog-title">
          {type == "user"
            ? "View Inviter"
            : type == "org-collaborator" || type == "member-org"
            ? "View Organization"
            : "View Art Piece"}
        </DialogTitle>
        <DialogContent>
          {type == "user" ? (
            <DialogContentText id="alert-dialog-description">
              {inviter?.firstName} {inviter?.lastName}
            </DialogContentText>
          ) : type == "org-collaborator" || type == "member-org" ? (
            <DialogContent>
              <Image
                src={data?.image}
                alt={data?.title}
                width={200}
                height={200}
              />

              <DialogContentText
                className="font-semibold text-black"
                id="alert-dialog-description"
              >
                Organization Name: {data?.name}
              </DialogContentText>
              <DialogContentText
                className="font-semibold text-black"
                id="alert-dialog-description"
              >
                Website: {data?.website}
              </DialogContentText>
              <DialogContentText
                className="font-semibold text-black"
                id="alert-dialog-description"
              >
                Email: {data?.email}
              </DialogContentText>
              <DialogContentText
                className="font-semibold text-black"
                id="alert-dialog-description"
              >
                Phone Number: {data?.phone}
              </DialogContentText>
            </DialogContent>
          ) : type == "org" ? (
            <></>
          ) : (
            <div className="flex flex-col items-center gap-7">
              <Image
                src={data?.assets[0]?.url}
                alt={data?.title}
                width={200}
                height={200}
              />

              <DialogContentText id="alert-dialog-description">
                {data?.description}
              </DialogContentText>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AuthenticatedScreen;
