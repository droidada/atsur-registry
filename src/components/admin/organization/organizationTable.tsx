import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Skeleton,
} from "@mui/material";
import { Edit, Delete, Visibility } from "@mui/icons-material";
import { format } from "date-fns";
import TableLoading from "@/components/dashboard/loadingComponents/TableLoading";
import Image from "next/image";

interface Props {
  organizations: any[];
  isFetching: boolean;
  isError: boolean;
}
const OrganizationTable: React.FC<Props> = ({
  organizations,
  isFetching,
  isError,
}) => {
  const renderStatus = (status) => {
    const statusColors = {
      rejected: "bg-red-100 text-red-800",
      pending: "bg-yellow-100 text-yellow-800",
      approved: "bg-green-100 text-green-800",
    };

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          statusColors[status] || "bg-gray-100 text-gray-800"
        }`}
      >
        {status}
      </span>
    );
  };

  if (isFetching) {
    return <TableLoading isBlackHeader />;
  }

  if (isError) {
    return (
      <div className="p-4 text-center text-red-500">
        Error loading organizations. Please try again later.
      </div>
    );
  }

  const tableHeading = [
    "Organization",
    "Contact",
    "Creator",
    "KYB Status",
    "Created Date",
    "Actions",
  ];

  return (
    <TableContainer component={Paper} className="shadow-lg">
      <Table>
        <TableHead className="">
          <TableRow>
            {tableHeading.map((heading) => (
              <TableCell
                className="bg-primary text-white text-md font-[600]"
                key={heading}
              >
                {heading}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {organizations?.map((org) => (
            <TableRow key={org._id} className="hover:bg-gray-50">
              <TableCell>
                <div className="flex items-center space-x-3">
                  {org.image ? (
                    <Image
                      width={40}
                      height={40}
                      src={org.image}
                      alt={org.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      {org.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <div className="font-medium">{org.name}</div>
                    <div className="text-sm text-gray-500">{org.country}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm">
                  <div>{org.email}</div>
                  <div className="text-gray-500">{org.phone}</div>
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm">
                  {org.creator.firstName} {org.creator.lastName}
                </div>
              </TableCell>
              <TableCell>{renderStatus(org.kybVerification.status)}</TableCell>
              <TableCell>
                <div className="text-sm">
                  {format(new Date(org.createdAt), "MMM d, yyyy")}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <IconButton size="small" className="text-blue-600">
                    <Visibility fontSize="small" />
                  </IconButton>
                  <IconButton size="small" className="text-green-600">
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton size="small" className="text-red-600">
                    <Delete fontSize="small" />
                  </IconButton>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrganizationTable;
