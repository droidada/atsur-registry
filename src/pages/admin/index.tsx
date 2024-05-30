import { useState } from "react";
import Link from "next/link";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Layout from "@/open9/layout/Layout";
import AdminDashboardLayout from "@/components/layout/AdminDashboardLayout";
import {
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Fade,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { IoMdMore } from "react-icons/io";
import { useToast } from "@/providers/ToastProvider";
import TableLoading from "@/components/dashboard/loadingComponents/TableLoading";
import { IoFilter, IoRefreshCircle, IoSearch } from "react-icons/io5";
import { FaSortAlphaDown } from "react-icons/fa";

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
  const queryClient = useQueryClient();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [menuState, setMenuState] = useState({ anchorEl: null, rowId: null });
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    role: "",
  });
  const [sort, setSort] = useState({
    field: "firstName",
    order: "asc",
  });

  const toast = useToast();
  const [meta, setMeta] = useState({
    total: 0,
    page: 0,
    limit: 0,
    totalPages: 0,
  });

  const axiosFetch = useAxiosAuth();
  const {
    data: rows,
    isFetching,
    isError,
    refetch,
  } = useQuery(
    [
      "organizations",
      {
        page,
        rowsPerPage,
        search,
        sort,
        filters,
      },
    ],
    () =>
      axiosFetch
        .get(
          `/user/list?limit=${rowsPerPage}&page=${page}&search=${search}&sort=${sort.field}&order=${sort.order}&status=${filters.status}&role=${filters.role}`,
        )
        .then((res) => {
          console.log(res.data?.meta);
          setMeta(res.data?.meta);

          return res.data?.users;
        }),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      onSuccess: () => {
        if (page < meta.totalPages) {
          queryClient.prefetchQuery([
            "organizations",
            {
              page: page + 1,
              rowsPerPage,
              search,
              sort,
              filters,
            },
          ]);
        }
      },
    },
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
    onSuccess: async () => {
      toast.success("User is now an admin");
      await refetch();
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
    onSuccess: async () => {
      toast.success("User is no longer an admin");
      await refetch();
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

  const handleChangePage = async (event: unknown, newPage: number) => {
    setPage(newPage);
    refetch();
  };

  const handleChangeRowsPerPage = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value);
    refetch();
  };

  const handleSuspendUser = async (user_id: string, suspended: boolean) => {
    if (suspended) {
      // @ts-ignore
      activateUser(user_id);
    } else {
      // @ts-ignore
      suspendUser(user_id);
    }

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
      <AdminDashboardLayout>
        <Stack spacing={4}>
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold">Users</h1>
            <div className="flex justify-between items-center gap-4">
              <form
                onChange={(e) => {
                  e.preventDefault();
                  refetch();
                }}
                className="max-w-[400px] flex px-3 items-center overflow-hidden h-[46px] w-[50%] bg-secondary-white rounded-[20px] "
              >
                <IoSearch className="text-2xl text-primary" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search users..."
                  type="text"
                  className="flex-1 w-full outline-none h-full focus:outline-[none] px-5 text-black border-none bg-transparent"
                />
              </form>

              <div className="flex gap-2 items-center">
                <Tooltip title="Refresh">
                  <IconButton onClick={() => refetch()}>
                    <IoRefreshCircle className="text-2xl" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Filter">
                  <IconButton>
                    <IoFilter className="text-2xl" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Sort">
                  <IconButton>
                    <FaSortAlphaDown className="text-2xl" />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          </div>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            {isFetching ? (
              <TableLoading
                isBlackHeader
                noOfRows={rowsPerPage || 10}
                noOfColumns={6}
              />
            ) : (
              <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          className="bg-primary text-white text-md font-[600]"
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody className="bg-white text-black border-[1px] border-primary ">
                    {rows &&
                      rows?.map((row) => {
                        return (
                          <TableRow
                            hover
                            className="bg-white text-black cursor-pointer   px-3 hover:bg-secondary"
                            role="checkbox"
                            tabIndex={-1}
                            key={row?.id}
                          >
                            {columns.map((column) => {
                              const value = row[column.id];
                              return (
                                <TableCell
                                  className="py-2 text-base font-[300] ml-2  border-b-[1px] border-primary"
                                  key={column.id}
                                  align={column.align}
                                >
                                  {column.id === "actions" ? (
                                    <>
                                      <IconButton
                                        id="fade-button"
                                        aria-controls={
                                          open ? "fade-menu" : undefined
                                        }
                                        aria-haspopup="true"
                                        aria-expanded={
                                          open ? "true" : undefined
                                        }
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
                                        open={
                                          open && menuState.rowId === row.id
                                        }
                                        onClose={handleClose}
                                        TransitionComponent={Fade}
                                      >
                                        <MenuItem
                                          className="text-sm"
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
                                          className="text-sm"
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
                                          className="text-sm"
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
                                      <Chip label="Suspended" color="error" />
                                    ) : (
                                      <Chip label="Active" color="success" />
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
            )}
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={meta?.total || 0}
              rowsPerPage={rowsPerPage || 10}
              page={page || 0}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Stack>
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
