import useAxiosAuth from "@/hooks/useAxiosAuth";
import { useToast } from "@/providers/ToastProvider";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import NoData from "../NoData";
import {
  Avatar,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

interface MembersTableProps {
  members: any[];
}
const MembersTable: React.FC<MembersTableProps> = ({ members }) => {
  const router = useRouter();
  const toast = useToast();
  const axiosAuth = useAxiosAuth();

  const { mutate } = useMutation({
    mutationFn: () => axiosAuth.post(``),
  });

  if (members.length === 0) {
    return <NoData text="No member found" />;
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 925 }}>
        <TableHead>
          <TableRow>
            {["", "Name", "Email", "Phone", "Action"].map((col) => (
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
                {member?.invitaion?.name}
              </TableCell>
              <TableCell className="py-2 text-base capitalize font-[300] border-b-[1px] border-primary">
                {member?.address}
              </TableCell>

              <TableCell className="py-2 text-base font-[300] border-b-[1px] border-primary">
                {/* {moment(organization?.createdAt).format("Do MMM, YYYY")} */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MembersTable;
