import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Link from "next/link";
import React from "react";

interface Props {
  data: any;
}
const InstitutionTable: React.FC<Props> = ({ data }) => {
  console.log(data);
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            {[
              "Type",
              "Purpose",
              " Method",
              "Attachment",
              "Organization Acquired from",
            ].map((col) => (
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
            <TableCell>{data?.acquisition?.type}</TableCell>
            <TableCell>{data?.acquisition?.purpose}</TableCell>
            <TableCell>{data?.acquisition?.method}</TableCell>
            <TableCell>
              <Link
                target="_blank"
                href={data?.acquisition?.attachment}
                download
                className="p-2 bg-secondary"
              >
                {data?.acquisition?.attachment?.split("/").pop()}
              </Link>
            </TableCell>
            <TableCell>
              {data?.acquisition?.acquiredFromOrganization?.orgInfo?.name}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InstitutionTable;
