import React from "react";
import NoData from "../NoData";
import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import TableLoading from "../loadingComponents/TableLoading";

interface Props {
  collections: any[];
  baseUrl: string;
  isFetching: boolean;
  isError: boolean;
}

const CollectionListView: React.FC<Props> = ({
  collections,
  baseUrl,
  isFetching,
  isError,
}) => {
  if (isFetching) {
    return <TableLoading isBlackHeader />;
  }

  if (collections.length === 0) {
    return <NoData text="We have nothing in your collections" />;
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 925 }}>
        <TableHead>
          <TableRow>
            {["Collection", "Details", "Attachment"].map((col) => (
              <TableCell
                key={`table-head-${col}`}
                className="bg-primary text-white text-md font-[600]"
              >
                {col}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
      </Table>
    </TableContainer>
  );
};

export default CollectionListView;
