import { useState } from "react";
import NoData from "../NoData";
import {
  Chip,
  Fade,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { IoMdMore } from "react-icons/io";
import RemoveMemberDialog from "./RemoveMemberDialog";

interface InviteesTableProps {
  invitees: any[];
  organizationId: string;
  creatorId: string;
}
const InviteesTable: React.FC<InviteesTableProps> = ({
  invitees,
  organizationId,
  creatorId,
}) => {
  const [menuState, setMenuState] = useState({ anchorEl: null, rowId: null });
  const [openRemoveUserDialog, setOpenRemoveUserDialog] = useState(false);
  const [currentMember, setCurrentMember] = useState<any>(null);

  if (invitees.length === 0) {
    return <NoData text="No member found" />;
  }

  const open = Boolean(menuState.anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>, rowId: string) => {
    const currentMember = invitees.find((member) => member?._id === rowId);
    setCurrentMember(currentMember);
    setMenuState({ anchorEl: event.currentTarget, rowId });
  };
  const handleClose = () => {
    setMenuState({ anchorEl: null, rowId: null });
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 925 }}>
        <TableHead>
          <TableRow>
            {["Name", "Email", "Status", "Responded", "Actions"].map((col) => (
              <TableCell
                key={`table-head-${col}`}
                className="bg-primary text-white text-md font-[600]"
              >
                {col}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody className="bg-white text-black border-[1px] border-primary ">
          {invitees?.map((member, index) => (
            <TableRow
              // onClick={() => router.push(`/explore/artist/${member?._id}`)}
              className="bg-white text-black cursor-pointer   px-3 hover:bg-secondary"
              key={member?._id}
            >
              <TableCell className="py-2 text-base font-[300] border-b-[1px] border-primary">
                {/* {member?.invitaion?.invitee?.firstName} */}
                {member?.invitation?.invitee?.firstName}{" "}
                {member?.invitation?.invitee?.lastName}
              </TableCell>
              <TableCell className="py-2 text-base font-[300] border-b-[1px] border-primary">
                {member?.invitation?.invitee?.email}
              </TableCell>
              <TableCell className="py-2 text-base capitalize font-[300] border-b-[1px] border-primary">
                {member?.invitation?.invitationAccepted ? (
                  <Chip label="Accepted" color="success" />
                ) : !member?.invitation?.invitationAccepted &&
                  member?.invitation?.responded ? (
                  <Chip label="Rejected" color="error" />
                ) : (
                  <Chip label={"Pending"} color="info" />
                )}
              </TableCell>

              <TableCell className="py-2 text-base font-[300] border-b-[1px] border-primary">
                {member?.invitation?.responded ? "Yes" : "No"}
              </TableCell>
              <TableCell className="py-2 text-base font-[300] border-b-[1px] border-primary">
                <IconButton
                  id="fade-button"
                  aria-controls={open ? "fade-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={(event) => handleClick(event, member?._id)}
                >
                  <IoMdMore />
                </IconButton>
                <Menu
                  id="fade-menu"
                  MenuListProps={{
                    "aria-labelledby": "fade-button",
                  }}
                  anchorEl={menuState.anchorEl}
                  open={open && menuState.rowId === member?._id}
                  onClose={handleClose}
                  TransitionComponent={Fade}
                >
                  <MenuItem
                    onClick={() => {
                      setOpenRemoveUserDialog(true);
                      handleClose();
                    }}
                    className="text-sm"
                    // onClick={() => handleSuspendUser(row?.id, row?.suspended)}
                  >
                    Remove Invitee
                  </MenuItem>
                  <MenuItem
                    className="text-sm"
                    // onClick={() =>
                    //   handleMakeAdmin(row?.id, row?.roles?.includes("admin"))
                    // }
                  >
                    Resend Invitation
                  </MenuItem>
                  {/* <MenuItem
                    className="text-sm"
                    onClick={() => handleViewDetails(row)}
                  >
                    View Details
                  </MenuItem> */}
                </Menu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <RemoveMemberDialog
        memberName={` ${currentMember?.invitation?.invitee?.firstName}
                ${currentMember?.invitation?.invitee?.lastName}`}
        organizationId={organizationId}
        memberId={currentMember?.invitation?._id}
        open={openRemoveUserDialog}
        handleClose={() => setOpenRemoveUserDialog(false)}
      />
    </TableContainer>
  );
};

export default InviteesTable;
