import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  TablePagination,
  IconButton,
  Tooltip,
} from "@mui/material";
import { LuEye, LuClock, LuCheckCircle, LuXCircle } from "react-icons/lu";
import { useRouter } from "next/router";

const OrderStatusChip = ({ status }) => {
  const statusConfig = {
    pending: { color: "warning", icon: LuClock },
    completed: { color: "success", icon: LuCheckCircle },
    cancelled: { color: "error", icon: LuXCircle },
  };

  const StatusIcon = statusConfig[status]?.icon || LuClock;

  return (
    <Chip
      icon={<StatusIcon size={16} />}
      label={status.charAt(0).toUpperCase() + status.slice(1)}
      color={statusConfig[status]?.color || "default"}
      size="small"
      className="capitalize"
    />
  );
};

const OrdersPage = ({ orders, meta }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const router = useRouter();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const formatDate = (dateString) => {
    return format(new Date(dateString), "MMM dd, yyyy");
  };

  const tableHeading = [
    "Order ID",
    "Art Piece",
    "Available Date",
    "Status",
    "Last Updated",
    // "Actions",
  ];

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">My Orders</h1>
        </div>

        <Paper className="overflow-hidden">
          <TableContainer className="max-h-[calc(100vh-300px)]">
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {tableHeading?.map((col) => (
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
                {orders?.map((order) => (
                  <TableRow
                    key={order._id}
                    className=" transition-colors bg-white text-black cursor-pointer   px-3 hover:bg-secondary"
                  >
                    <TableCell className="font-mono text-sm">
                      {order?._id?.slice(-8)}
                    </TableCell>
                    <TableCell>{order.artPiece.title}</TableCell>
                    <TableCell>{formatDate(order.availableTime)}</TableCell>
                    <TableCell>
                      <OrderStatusChip status={order.status} />
                    </TableCell>
                    <TableCell>{formatDate(order.updatedAt)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    </DashboardLayout>
  );
};

export default OrdersPage;
