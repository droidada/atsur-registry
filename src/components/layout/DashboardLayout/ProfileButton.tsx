import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdLogout } from "react-icons/md";

interface ProfileButtonProps {
  user: any;
}

const ProfileButton: React.FC<ProfileButtonProps> = ({ user }) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <Button
        aria-controls={open ? "menu-appbar" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="outlined"
        onClick={handleClick}
        className="rounded-[23px] flex px-2 gap-2"
      >
        {/* @ts-ignore */}
        <Avatar className="w-[25px] h-[25px] " src={user?.avatar} />
        <span className="text-[19px] md:block hidden leading-[16px] capitalize font-[600]">
          {/* @ts-ignore */}
          {user?.firstName} {user?.lastName ? user?.lastName[0] : ""}.
        </span>
      </Button>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "menu-appbar",
        }}
      >
        <MenuItem
          className="flex gap-2 items-center"
          onClick={() => {
            router.push("/dashboard/settings");
            handleClose();
          }}
        >
          <FaUser /> <span>Profile</span>
        </MenuItem>

        <MenuItem className="flex gap-2 items-center" onClick={() => signOut()}>
          <MdLogout /> <span>Logout</span>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default ProfileButton;
