import { Button, Menu, MenuItem, Stack } from "@mui/material";
import React, { useState } from "react";
import { BsShare } from "react-icons/bs";
import { HiOutlineMenu } from "react-icons/hi";
import { IconType } from "react-icons/lib";
import { TbLayoutList } from "react-icons/tb";

interface Props {
  title: string;
  setView: React.Dispatch<React.SetStateAction<"list" | "grid">>;
  view: "list" | "grid";
}
const FilterLine: React.FC<Props> = ({ title, setView, view }) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      spacing={4}
      className="pb-4 border-b-[1px] overflow-x-auto  border-primary"
    >
      <h2 className="capitalize whitespace-nowrap lg:text-[30px] lg:leading-[70px] text-primary text-[20px] leading-[30px] ">
        {title}
      </h2>
      <Stack direction="row" spacing={2} alignContent="center">
        <CustomMenu Icon={BsShare} title="Share">
          <MenuItem>Share on Facebook</MenuItem>
        </CustomMenu>
        <CustomMenu Icon={HiOutlineMenu} title="Filter">
          <MenuItem>Artpiece</MenuItem>
          <MenuItem>Artifact</MenuItem>
        </CustomMenu>
        <CustomMenu Icon={TbLayoutList} title="View">
          <MenuItem onClick={() => setView("list")} selected={view === "list"}>
            List
          </MenuItem>
          <MenuItem onClick={() => setView("grid")} selected={view === "grid"}>
            Grid
          </MenuItem>
        </CustomMenu>
      </Stack>
    </Stack>
  );
};

export default FilterLine;

interface CustomMenuProps {
  Icon: IconType;
  title: string;
  children: React.ReactNode;
}

const CustomMenu: React.FC<CustomMenuProps> = ({ Icon, title, children }) => {
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
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        startIcon={<Icon></Icon>}
        variant="text"
        className="text-[14px] leading-[16px] text-primary"
      >
        {title}
      </Button>
      <Menu
        className="text-sm text-primary font-[400]"
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClick={handleClose}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {children}
      </Menu>
    </div>
  );
};