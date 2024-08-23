import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

interface Props {
  data: any;
}
const CollectorTable: React.FC<Props> = ({ data }) => {
  console.log(data);
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            {["Type", "Purpose", " Method"].map((col) => (
              <TableCell
                key={`table-head-${col}`}
                className="bg-primary text-white text-md font-[600]"
              >
                {col}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell className="capitalize">
              {data?.acquisition?.type}
            </TableCell>
            <TableCell className="capitalize">
              {data?.acquisition?.purpose}
            </TableCell>
            <TableCell className="capitalize">
              {data?.acquisition?.method}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CollectorTable;
