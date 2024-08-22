import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { AiOutlineSwap } from "react-icons/ai";

interface Props {
  type:
    | "publications"
    | "exhibitions"
    | "appraisals"
    | "locations"
    | "competitions";
  columns: string[];
  children: React.ReactNode;
}

const DetailColumn: React.FC<Props> = ({ type, columns, children }) => {
  return (
    <div>
      <div className="flex items-center gap-5">
        <div className="w-[66px] h-[66px] text-white bg-primary grid place-items-center">
          <AiOutlineSwap size={23} className="rotate-90" />
        </div>
        <h2 className="capitalize text-xl lg:text-[25px] font-[600] lg:leading-[16px]">
          {type}
        </h2>
      </div>
      <div className="max-w-[1196px] w-full overflow-x-auto py-4 px-8 border-[1px] border-primary">
        <TableContainer>
          <Table sx={{ minWidth: 550 }} stickyHeader>
            <TableHead>
              <TableRow className="bg-transparent border-b-[0.5px] border-primary">
                {columns.map((column) => (
                  <TableCell
                    key={column}
                    align="left"
                    className="font-[600] bg-transparent text-primary text-sm"
                  >
                    {column}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>{children}</TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default DetailColumn;
