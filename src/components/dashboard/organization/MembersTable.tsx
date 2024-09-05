import useAxiosAuth from "@/hooks/useAxiosAuth";
import { useToast } from "@/providers/ToastProvider";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import NoData from "../NoData";
import {
  Avatar,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import moment from "moment";
import { RiDeleteBin5Line } from "react-icons/ri";
import { IoIosAt } from "react-icons/io";
import { useState } from "react";
import RemoveMemberDialog from "./RemoveMemberDialog";
import { useSession } from "next-auth/react";

interface MembersTableProps {
  members: any[];
  organizationId: string;
  creatorId: string;
}
const MembersTable: React.FC<MembersTableProps> = ({
  members,
  organizationId,
  creatorId,
}) => {
  const router = useRouter();
  const toast = useToast();
  const axiosAuth = useAxiosAuth();
  const [currentMember, setCurrentMember] = useState<any>(null);
  const [openRemoveUserDialog, setOpenRemoveUserDialog] = useState(false);

  const { data: session } = useSession();

  const cols =
    session?.user?.id === creatorId
      ? ["", "Name", "Email", "Date Joined", "Action"]
      : ["", "Name", "Email", "Date Joined"];

  console.log(members);

  const { mutate } = useMutation({
    mutationFn: () => axiosAuth.post(``),
  });

  if (members?.length === 0) {
    return <NoData text="No member found" />;
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 550 }}>
        <TableHead>
          <TableRow>
            {cols.map((col) => (
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
          {members?.map((member, index) => (
            <TableRow
              onClick={() => router.push(`/explore/artist/${member?._id}`)}
              className="bg-white text-black cursor-pointer   px-3 hover:bg-secondary"
              key={member?._id}
            >
              <TableCell className="py-2 text-base font-[300] border-b-[1px] border-primary">
                <div className="flex">
                  <Avatar
                    key={member?.invitaion?.inivitation?._id}
                    alt={member?.invitaion?.name}
                    src={member?.invitaion?.image}
                    sx={{ translate: `-${40 * index}%` }}
                    className={`w-[29px] h-[29px] relative `}
                  />
                </div>
              </TableCell>
              <TableCell className="py-2 text-base font-[300] border-b-[1px] border-primary">
                {member?.invitation?.invitee?.firstName}{" "}
                {member?.invitation?.invitee?.lastName}
              </TableCell>
              <TableCell className="py-2 text-base  font-[300] border-b-[1px] border-primary">
                {member?.invitation?.invitee?.email}
              </TableCell>

              <TableCell className="py-2 text-base font-[300] border-b-[1px] border-primary">
                {moment(member?.invitation?.createdAt).format("Do MMM, YYYY")}
              </TableCell>
              {session?.user?.id === creatorId && (
                <TableCell className="py-2 text-base font-[300] border-b-[1px] border-primary">
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentMember(member);
                      setOpenRemoveUserDialog(true);
                    }}
                    className="text-[#E60000] text-[14px]"
                  >
                    <IoIosAt />
                    <RiDeleteBin5Line />
                  </IconButton>
                </TableCell>
              )}
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

export default MembersTable;
