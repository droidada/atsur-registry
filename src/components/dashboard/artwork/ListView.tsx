import {
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
  artworks: any[];
  baseUrl: string;
  isFetching: boolean;
  isError: boolean;
}
import moment from "moment";
import Image from "next/image";
import NoData from "../NoData";
import TableLoading from "../loadingComponents/TableLoading";
import { useRouter } from "next/router";

const ListView: React.FC<Props> = ({
  artworks,
  baseUrl,
  isFetching,
  isError,
}) => {
  const router = useRouter();

  if (isFetching) {
    return <TableLoading isBlackHeader />;
  }

  if (artworks.length === 0) {
    return <NoData text="We have nothing in your artworks" />;
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 925 }}>
        <TableHead>
          <TableRow>
            {["Artwork", "Type", "Date", "Attachment"].map((col) => (
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
          {artworks.map((artwork) => (
            <TableRow
              onClick={() => router.push(`/${baseUrl}/${artwork?._id}`)}
              className="bg-white text-black cursor-pointer   px-3 hover:bg-secondary"
              key={artwork?._id}
            >
              <TableCell className="py-2 text-base font-[300] border-b-[1px] border-primary">
                {artwork?.title}
              </TableCell>
              <TableCell className="py-2 text-base capitalize font-[300] border-b-[1px] border-primary">
                {artwork?.artType.replace("-", "")}
              </TableCell>
              <TableCell className="py-2 text-base font-[300] border-b-[1px] border-primary">
                {moment(artwork?.createdAt).format("Do MMM, YYYY")}
              </TableCell>
              <TableCell className="px-2 text-base font-[300] border-b-[1px] border-primary">
                {
                  artwork?.assets[0]?.url?.split("/")[
                    artwork?.assets[0]?.url?.split("/").length - 1
                  ]
                }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ListView;
