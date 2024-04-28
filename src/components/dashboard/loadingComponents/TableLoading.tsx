import {
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

interface Props {
  noOfRows?: number;
  noOfColumns?: number;
  isBlackHeader?: boolean;
}

const TableLoading: React.FC<Props> = ({
  noOfRows = 4,
  noOfColumns = 4,
  isBlackHeader,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {[...Array(noOfColumns)].map((_, col) => (
              <TableCell
                key={`table-head-${col}`}
                className={` ${
                  isBlackHeader ? "bg-black text-white" : ""
                }  text-md font-[600]`}
              >
                <Skeleton
                  animation="wave"
                  className={`${isBlackHeader ? "bg-secondary" : ""}`}
                  height="100%"
                />
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody className="bg-white  text-black border-[1px] border-primary ">
          {[...Array(noOfColumns)].map((_, row) => (
            <TableRow
              key={`table-row-${row}`}
              className="bg-white text-black   px-3 "
            >
              {[...Array(noOfColumns)].map((_, col) => (
                <TableCell
                  key={`table-cell-${row}-${col}`}
                  className="py-2 text-base font-[300] border-b-[1px] border-primary"
                >
                  <Skeleton animation="wave" height="100%" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableLoading;
