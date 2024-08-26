import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import moment from "moment";
import Link from "next/link";
import React from "react";

interface Props {
  data: any;
}
const CollectorTable: React.FC<Props> = ({ data }) => {
  console.log(data);
  return (
    <>
      <span className="font-[600]  ">Type</span>
      <span className="font-[400]">{data?.acquisition?.type}</span>
      <span className="font-[600]  ">Purpose</span>
      <span className="font-[400]">{data?.acquisition?.purpose}</span>
      <span className="font-[600]  ">Method</span>
      <span className="font-[400]">{data?.acquisition?.method}</span>
      <span className="font-[600]  ">Date of Purchase</span>
      <span className="font-[400]">
        {moment(data?.acquisition?.date).format("YYYY")}
      </span>
      {data?.acquisition?.acquiredFromOrganization?.orgInfo?.name && (
        <>
          <span className="font-[600]  ">Organization Acquired From</span>
          <span className="font-[400]">
            {data?.acquisition?.acquiredFromOrganization?.orgInfo?.name}
          </span>
        </>
      )}

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
    //         {["Type", "Purpose", " Method"].map((col) => (
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
    //         <TableCell className="capitalize">
    //           {data?.acquisition?.type}
    //         </TableCell>
    //         <TableCell className="capitalize">
    //           {data?.acquisition?.purpose}
    //         </TableCell>
    //         <TableCell className="capitalize">
    //           {data?.acquisition?.method}
    //         </TableCell>
    //       </TableRow>
    //     </TableBody>
    //   </Table>
    // </TableContainer>
  );
};

export default CollectorTable;
