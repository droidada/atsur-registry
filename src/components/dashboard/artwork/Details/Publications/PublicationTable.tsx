import {
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";
import moment from "moment";
import { IoMdMore } from "react-icons/io";
import { useToast } from "@/providers/ToastProvider";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { useMutation } from "@tanstack/react-query";
import DeleteDialog from "../../DeleteDialog";
import { useRouter } from "next/router";

interface Props {
  publications: any[];
  setCurrentPublication: React.Dispatch<any>;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  artpieceId: string;
}
const PublicationTable: React.FC<Props> = ({
  publications,
  setCurrentPublication,
  setOpenDialog,
  artpieceId,
}) => {
  const router = useRouter();

  const MoreButton = ({ publication }: { publication: any }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    console.log(publication);
    const toast = useToast();
    const [openDelete, setOpenDelete] = useState(false);
    const axiosAuth = useAxiosAuth();
    const {
      isLoading,
      isSuccess,
      mutate: submit,
    } = useMutation({
      mutationFn: (data: any) =>
        axiosAuth.post(`/publication/delete`, {
          artPieceId: artpieceId,
          publicationId: data?._id,
        }),
      onSuccess: () => {
        setOpenDelete(false);
        // toast.success("publication deleted successfully.");
        router.replace(router.asPath);
      },
      onError: (error: any) => {
        const errorMessage =
          // @ts-ignore
          error.response?.data?.message ||
          "An error occurred while deleting the publication.";
        toast.error(errorMessage);
      },
    });

    return (
      <div>
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? "long-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <IoMdMore />
        </IconButton>
        <Menu
          id="long-menu"
          MenuListProps={{
            "aria-labelledby": "long-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={() => setOpenDelete(true)}>Delete</MenuItem>
          <MenuItem
            onClick={() => {
              setCurrentPublication(publication);
              setOpenDialog(true);
            }}
          >
            Edit
          </MenuItem>
        </Menu>
        <DeleteDialog
          isLoading={isLoading}
          handleClose={() => setOpenDelete(false)}
          handleDelete={() => {
            submit(publication);
          }}
          open={openDelete}
          title="publication"
          body={`Are you sure you want to delete '${publication?.publicationName}' publication`}
        />
      </div>
    );
  };

  return (
    <TableContainer className="mb-4" component={Paper}>
      <Table sx={{ minWidth: 550 }}>
        <TableHead>
          <TableRow>
            {["Publication Name", "Author", "Creation Date", ""].map((col) => (
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
          {publications?.map((publication) => (
            <TableRow
              className="bg-white text-black cursor-pointer   px-3 "
              key={publication?._id}
            >
              <TableCell className="py-2 text-base font-[300] ml-2  border-b-[1px] border-primary">
                {publication?.publicationName}
              </TableCell>
              <TableCell className="py-2 text-base font-[300] ml-2  border-b-[1px] border-primary">
                {publication?.authorName}
              </TableCell>
              <TableCell className="py-2 text-base font-[300] ml-2  border-b-[1px] border-primary">
                {moment(publication?.createdAt)?.format("Do MMM, YYYY")}
              </TableCell>

              {/* <TableCell className="py-2 text-base font-[300] ml-2  border-b-[1px] border-primary">
                {moment(publication?.endDate)?.format("Do MMM, YYYY")}
              </TableCell> */}
              <TableCell className="py-2 text-base font-[300] ml-2  border-b-[1px] border-primary">
                <MoreButton publication={publication} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PublicationTable;
