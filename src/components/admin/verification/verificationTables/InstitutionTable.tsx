import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { da } from "date-fns/locale";
import Link from "next/link";
import React from "react";

interface Props {
  data: any;
}
const InstitutionTable: React.FC<Props> = ({ data }) => {
  return (
    <>
      <span className="font-[600]  ">Type</span>
      <span className="font-[400]">{data?.acquisition?.type}</span>
      <span className="font-[600]  ">Purpose</span>
      <span className="font-[400]">{data?.acquisition?.purpose}</span>
      <span className="font-[600]  ">Method</span>
      <span className="font-[400]">{data?.acquisition?.method}</span>
      <span className="font-[600]  ">Attachment</span>
      <span className="font-[400]">
        <Link
          href={data?.acquisition?.attachment}
          download
          className="p-2 bg-secondary"
          target="_blank"
        >
          View Document
        </Link>
      </span>
      <span className="font-[600]  ">Organization Acquired From</span>
      <span className="font-[400]">
        {data?.acquisition?.acquiredFromOrganization?.orgInfo?.name}
      </span>
      {data?.acquisition?.attachment && (
        <>
          <span className="font-[600]  ">Attachment</span>
          <span className="font-[400]">
            <Link
              href={data?.acquisition?.attachment}
              download
              className="p-2 bg-secondary"
            >
              View Document
            </Link>
          </span>
        </>
      )}
    </>
    // <TableContainer>
    //   <Table sx={{ minWidth: 650 }}>
    //     <TableHead>
    //       <TableRow>
    //         {[
    //           "Type",
    //           "Purpose",
    //           " Method",
    //           "Attachment",
    //           "Organization Acquired from",
    //         ].map((col) => (
    //           <TableCell
    //             key={`table-head-${col}`}
    //             className="bg-primary text-white text-md font-[600]"
    //           >
    //             {col}
    //           </TableCell>
    //         ))}
    //       </TableRow>
    //     </TableHead>
    //     <TableBody>
    //       <TableRow>
    //         <TableCell>{data?.acquisition?.type}</TableCell>
    //         <TableCell>{data?.acquisition?.purpose}</TableCell>
    //         <TableCell>{data?.acquisition?.method}</TableCell>
    //         <TableCell>
    //           <Link
    //             target="_blank"
    //             href={data?.acquisition?.attachment}
    //             download
    //             className="p-2 bg-secondary"
    //           >
    //             {data?.acquisition?.attachment?.split("/").pop()}
    //           </Link>
    //         </TableCell>
    //         <TableCell>
    //           {data?.acquisition?.acquiredFromOrganization?.orgInfo?.name}
    //         </TableCell>
    //       </TableRow>
    //     </TableBody>
    //   </Table>
    // </TableContainer>
  );
};

export default InstitutionTable;
