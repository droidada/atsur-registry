import useAxiosAuth from "@/hooks/useAxiosAuth";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
interface Props {
  children: React.ReactNode;
}

const navs = [
  {
    title: "My Profile",
    link: "/dashboard/settings",
  },
  {
    title: "Security",
    link: "/dashboard/settings/security",
  },
  {
    title: "Artworks",
    link: "/dashboard/settings/artworks",
  },
  {
    title: "Notifications",
    link: "/dashboard/settings/notifications",
  },
  {
    title: "Billing",
    link: "/dashboard/settings/billing",
  },
  {
    title: "Data Entry",
    link: "/dashboard/settings/data-entry",
  },
];

const DashboardSettingLayout: React.FC<Props> = ({ children }) => {
  const pathname = useRouter().pathname;
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl lg:text-[30px] font-[600] lg:leading-[40px] text-primary">
        Settings
      </h1>
      <div className="bg-secondary-white flex lg:flex-row flex-col  lg:divide-x-[1px] p-2 lg:p-10 divide-secondary">
        <div className="flex flex-col gap-5">
          <div className="flex flex-row overflow-x-auto lg:flex-col gap-4 pr-4 lg:pr-10 p-2 lg:p-5">
            {navs.map((nav, id) => (
              <Link
                key={`settings-nav-${id}`}
                className={`flex-shrink-0 mb-4 lg:mb-0 p-2 text-[17px] leading-[16px] ${
                  pathname === nav.link
                    ? "bg-secondary rounded-[22px] font-[600]"
                    : "font-[300]"
                } `}
                href={nav.link}
              >
                {nav.title}
              </Link>
            ))}
          </div>
          <Button
            onClick={() => setOpenDeleteModal(true)}
            variant="text"
            className="px-0 text-[#FF0000] font-[400] leading-[16px] text-[17px]"
          >
            Delete Account
          </Button>
        </div>
        <div className="flex-1 p-2 lg:p-5">{children}</div>
      </div>
      <DeleteModal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
      />
    </div>
  );
};

export default DashboardSettingLayout;

interface DeleteModalProps {
  open: boolean;
  onClose: () => void;
}
const DeleteModal: React.FC<DeleteModalProps> = ({ open, onClose }) => {
  const axiosAuth = useAxiosAuth();
  // TODO complete the account deletion function
  // const { mutate } = useMutation({
  //   mutationFn: () => {},
  //   onSuccess: () => {},
  //   onError: () => {},
  // });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm">
      <DialogTitle>Delete Account</DialogTitle>
      <DialogContent dividers>
        <p>Are you sure you want to delete your account?</p>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" onClick={onClose}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
