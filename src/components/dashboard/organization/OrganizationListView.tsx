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
import React from "react";
interface Props {
  organizations: any[];
  baseUrl: string;
  isFetching: boolean;
  isError: boolean;
}
import moment from "moment";
import Image from "next/image";
import NoData from "../NoData";
import TableLoading from "../loadingComponents/TableLoading";
import { useRouter } from "next/router";

const OrganizationListView: React.FC<Props> = ({
  organizations,
  baseUrl,
  isFetching,
  isError,
}) => {
  const router = useRouter();

  if (isFetching) {
    return <TableLoading isBlackHeader />;
  }

  if (organizations.length === 0) {
    return <NoData text="We have nothing in your organizations" />;
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 925 }}>
        <TableHead>
          <TableRow>
            {["Organization", "Location", "Members", "Date Created"].map(
              (col) => (
                <TableCell
                  key={`table-head-${col}`}
                  className="bg-primary text-white text-md font-[600]"
                >
                  {col}
                </TableCell>
              ),
            )}
          </TableRow>
        </TableHead>
        <TableBody className="bg-white text-black border-[1px] border-primary ">
          {organizations.map((organization) => (
            <TableRow
              onClick={() => router.push(`/${baseUrl}/${organization?._id}`)}
              className="bg-white text-black cursor-pointer   px-3 hover:bg-secondary"
              key={organization?._id}
            >
              <TableCell className="py-2 text-base font-[300] border-b-[1px] border-primary">
                {organization?.name}
              </TableCell>
              <TableCell className="py-2 text-base capitalize font-[300] border-b-[1px] border-primary">
                {organization?.address}
              </TableCell>
              <TableCell className="py-2 text-base font-[300] border-b-[1px] border-primary">
                <div className="flex">
                  {organization?.members?.slice(0, 3)?.map((member, index) => (
                    <Avatar
                      key={member?.invitaion?._id}
                      alt={member?.invitaion?.name}
                      src={member?.invitaion?.image}
                      sx={{ translate: `-${40 * index}%` }}
                      className={`w-[29px] h-[29px] relative `}
                    />
                  ))}
                </div>
              </TableCell>
              <TableCell className="py-2 text-base font-[300] border-b-[1px] border-primary">
                {moment(organization?.createdAt).format("Do MMM, YYYY")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrganizationListView;
