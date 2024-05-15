import { useState } from "react";
import Link from "next/link";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { useMutation, useQuery } from "@tanstack/react-query";
import Layout from "@/open9/layout/Layout";
import AdminDashboardLayout from "@/components/layout/AdminDashboardLayout";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Fade,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { IoMdMore } from "react-icons/io";
import { useToast } from "@/providers/ToastProvider";

interface Column {
  id: "firstName" | "lastName" | "email" | "status" | "actions" | "roles";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "firstName", label: "First Name", minWidth: 170 },
  { id: "lastName", label: "Last Name", minWidth: 170 },
  { id: "email", label: "Email", minWidth: 170 },
  { id: "status", label: "Status", minWidth: 170 },
  { id: "roles", label: "Roles", minWidth: 170 },
  // {
  //   id: "size",
  //   label: "Size\u00a0(km\u00b2)",
  //   minWidth: 170,
  //   align: "right",
  //   format: (value: number) => value.toLocaleString("en-US"),
  // },
  // {
  //   id: "density",
  //   label: "Density",
  //   minWidth: 170,
  //   align: "right",
  //   format: (value: number) => value.toFixed(2),
  // },
  { id: "actions", label: "Actions", minWidth: 170, align: "right" },
];

export default function UserList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [menuState, setMenuState] = useState({ anchorEl: null, rowId: null });
  const [currentUser, setCurrentUser] = useState<any>(null);
  const toast = useToast();

  const axiosFetch = useAxiosAuth();
  const {
    data: rows,
    isFetching,
    isError,
    refetch,
  } = useQuery(["organizations"], () =>
    axiosFetch
      .get(`/user/list?limit=${rowsPerPage}&skip=${page}`)
      .then((res) => {
        return res.data?.users;
      }),
  );

  const { isLoading: suspendLoading, mutate: suspendUser } = useMutation({
    mutationFn: (id) => axiosFetch.post(`/user/suspend/${id}`),
    onSuccess: () => {
      toast.success("User account is suspended");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong",
      );
    },
  });

  const { isLoading: activateLoading, mutate: activateUser } = useMutation({
    mutationFn: (id) => axiosFetch.post(`/user/activate/${id}`),
    onSuccess: () => {
      toast.success("User account is activated");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong",
      );
    },
  });

  const { mutate: makeAdmin } = useMutation({
    mutationFn: (id) => axiosFetch.post(`/user/make-admin/${id}`),
    onSuccess: () => {
      toast.success("User is now an admin");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong",
      );
    },
  });

  const { mutate: removeAdmin } = useMutation({
    mutationFn: (id) => axiosFetch.post(`/user/remove-admin/${id}`),
    onSuccess: () => {
      toast.success("User is no longer an admin");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong",
      );
    },
  });

  const open = Boolean(menuState.anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>, rowId: string) => {
    setMenuState({ anchorEl: event.currentTarget, rowId });
  };
  const handleClose = () => {
    setMenuState({ anchorEl: null, rowId: null });
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSuspendUser = async (user_id: string, suspended: boolean) => {
    if (suspended) {
      // @ts-ignore
      activateUser(user_id);
    } else {
      // @ts-ignore
      suspendUser(user_id);
    }
    await refetch();
    handleClose();
  };

  const handleMakeAdmin = async (user_id: string, isAdmin: boolean) => {
    if (isAdmin) {
      // @ts-ignore
      removeAdmin(user_id);
    } else {
      // @ts-ignore
      makeAdmin(user_id);
    }
    await refetch();
    handleClose();
  };

  const handleViewDetails = (data) => {
    setCurrentUser(data);
    setOpenDetailsDialog(true);
    handleClose();
  };

  return (
    // eslint-disable-next-line react/jsx-no-comment-textnodes
    <>
      {/* // TODO add layout */}
      <AdminDashboardLayout>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows &&
                  rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row?.id}
                        >
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.id === "actions" ? (
                                  <>
                                    <IconButton
                                      id="fade-button"
                                      aria-controls={
                                        open ? "fade-menu" : undefined
                                      }
                                      aria-haspopup="true"
                                      aria-expanded={open ? "true" : undefined}
                                      onClick={(event) =>
                                        handleClick(event, row.id)
                                      }
                                    >
                                      <IoMdMore />
                                    </IconButton>
                                    <Menu
                                      id="fade-menu"
                                      MenuListProps={{
                                        "aria-labelledby": "fade-button",
                                      }}
                                      anchorEl={menuState.anchorEl}
                                      open={open && menuState.rowId === row.id}
                                      onClose={handleClose}
                                      TransitionComponent={Fade}
                                    >
                                      <MenuItem
                                        onClick={() =>
                                          handleSuspendUser(
                                            row?.id,
                                            row?.suspended,
                                          )
                                        }
                                      >
                                        {row?.suspended
                                          ? "Activate"
                                          : "Suspend"}
                                      </MenuItem>
                                      <MenuItem
                                        onClick={() =>
                                          handleMakeAdmin(
                                            row?.id,
                                            row?.roles?.includes("admin"),
                                          )
                                        }
                                      >
                                        {row?.roles?.includes("admin")
                                          ? "Remove Admin"
                                          : "Make Admin"}
                                      </MenuItem>
                                      <MenuItem
                                        onClick={() => handleViewDetails(row)}
                                      >
                                        View Details
                                      </MenuItem>
                                    </Menu>
                                  </>
                                ) : column.format &&
                                  typeof value === "number" ? (
                                  column.format(value)
                                ) : column.id === "status" ? (
                                  row?.suspended ? (
                                    "Suspended"
                                  ) : (
                                    "Active"
                                  )
                                ) : column.id === "roles" ? (
                                  row?.roles?.join(", ")
                                ) : (
                                  value
                                )}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows?.length || 0}
            rowsPerPage={rowsPerPage || 10}
            page={page || 0}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </AdminDashboardLayout>

      <UserDetailsDialog
        userData={currentUser}
        handleClose={() => {
          setOpenDetailsDialog(false);
          setCurrentUser(null);
        }}
        open={openDetailsDialog}
      />
    </>
  );
}

const UserDetailsDialog = ({ userData, handleClose, open }) => {
  return (
    <Dialog
      PaperComponent={Paper}
      fullWidth={true}
      maxWidth={"sm"}
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>User Details</DialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom>
          <b>Name:</b> {userData?.firstName} {userData?.lastName}
        </Typography>
        <Typography gutterBottom>
          <b>Email:</b> {userData?.email}
        </Typography>
        <Typography gutterBottom>
          <b>Roles:</b> {userData?.roles.join(", ")}
        </Typography>
        <Typography gutterBottom>
          <b>Status:</b> {userData?.suspended ? "Suspended" : "Active"}
        </Typography>
        <Typography gutterBottom>
          <b>Verification Status:</b>{" "}
          {userData?.kycVerification?.verificationStatus.replace(/-/g, " ")}
        </Typography>
      </DialogContent>
    </Dialog>
  );
};
