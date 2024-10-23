import { dashboardContext } from "@/providers/DashboardContext.context";
import {
  Avatar,
  Button,
  Menu,
  MenuItem,
  Typography,
  Divider,
  Collapse,
  IconButton,
} from "@mui/material";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { FaUser, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { MdLogout } from "react-icons/md";

interface ProfileButtonProps {
  user: any;
}

const ProfileButton: React.FC<ProfileButtonProps> = ({ user }) => {
  const router = useRouter();
  const { credits, refetchCredits } = useContext(dashboardContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [creditsOpen, setCreditsOpen] = useState(false);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Calculate the credits
  const digitalCoaCredits =
    credits?.find((credit: any) => credit.item.sku === "digi-coa")?.quantity ||
    0;
  const tokenizationCredits =
    credits?.find((credit: any) => credit.item.sku === "lazy-tkn")?.quantity || 0;
  const totalCredits =
    credits?.reduce((acc: number, credit: any) => acc + credit.quantity, 0) ||
    0;
  const rfidCredits =
    credits?.find((credit: any) => credit.item.sku === "phy-coa")?.quantity ||
    0;

  return (
    <div>
      <Button
        aria-controls={open ? "menu-appbar" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="outlined"
        onClick={handleClick}
        className="rounded-[23px] flex px-2 gap-2 items-center"
      >
        {/* @ts-ignore */}
        <Avatar className="w-[30px] h-[30px]" src={user?.avatar} />
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
        PaperProps={{
          elevation: 3,
          sx: {
            minWidth: 200,
            padding: "8px 0",
          },
        }}
      >
        {/* Toggle Credits Visibility */}
        <MenuItem
          className="flex justify-between items-center px-4"
          onClick={() => setCreditsOpen(!creditsOpen)}
        >
          <Typography variant="subtitle1">Credits </Typography>
          <IconButton size="small">
            {creditsOpen ? <FaChevronUp /> : <FaChevronDown />}
          </IconButton>
        </MenuItem>
        <Collapse in={creditsOpen}>
          <Divider />
          <MenuItem className="flex justify-between items-center px-4">
            <span>Digital COA </span>
            <span className="font-bold">{digitalCoaCredits}</span>
          </MenuItem>
          <MenuItem className="flex justify-between items-center px-4">
            <span>Tokenization </span>
            <span className="font-bold">{tokenizationCredits}</span>
          </MenuItem>
          <MenuItem className="flex justify-between items-center px-4">
            <span>RFID </span>
            <span className="font-bold">{rfidCredits}</span>
          </MenuItem>
          <MenuItem className="flex justify-between items-center px-4">
            <span>Total Credits</span>
            <span className="font-bold">{totalCredits}</span>
          </MenuItem>
          <Divider />
        </Collapse>

        {/* Profile Link */}
        <MenuItem
          className="flex gap-2 items-center px-4"
          onClick={() => {
            router.push("/dashboard/settings");
            handleClose();
          }}
        >
          <FaUser /> <span>Profile</span>
        </MenuItem>

        {/* Logout */}
        <MenuItem
          className="flex gap-2 items-center px-4"
          onClick={() => signOut()}
        >
          <MdLogout /> <span>Logout</span>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default ProfileButton;
