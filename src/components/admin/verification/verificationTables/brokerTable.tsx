import {
  Paper,
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
  broker: any;
}
const BrokerTable: React.FC<Props> = ({ broker }) => {
  const handleDownload = (asset: string) => {
    const link = document.createElement("a");
    link.href = asset;
    link.download = asset;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    link.remove();
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            {["Broker Type", "Agreement Document", "Notes"].map((col) => (
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
          <TableRow className="bg-white text-black cursor-pointer border-[1px] border-primary">
            <TableCell>
              {broker?.brokerAsIndividual ? "Individual" : "Organization"}
            </TableCell>

            <TableCell>
              {" "}
              <Link
                target="_blank"
                href={broker?.agreementAttachment}
                download
                className="p-2 rounded cursor-pointer bg-secondary"
              >
                {broker?.agreementAttachment?.split("/").pop()}
              </Link>{" "}
            </TableCell>
            <TableCell>{broker?.notes}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BrokerTable;
