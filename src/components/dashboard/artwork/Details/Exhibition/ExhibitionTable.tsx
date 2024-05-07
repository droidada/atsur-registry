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
  exhibitions: any[];
  setCurrentExhibition: React.Dispatch<any>;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  artpieceId: string;
}
const ExhibitionTable: React.FC<Props> = ({
  exhibitions,
  setCurrentExhibition,
  setOpenDialog,
  artpieceId,
}) => {
  const router = useRouter();

  const MoreButton = ({ exhibition }: { exhibition: any }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    console.log(exhibition);
    const toast = useToast();
    const [openDelete, setOpenDelete] = useState(false);
    const axiosAuth = useAxiosAuth();
    const {
      isLoading,
      isSuccess,
      mutate: submit,
    } = useMutation({
      mutationFn: (data: any) =>
        axiosAuth.post(`/exhibition/delete`, {
          artPieceId: artpieceId,
          exhibitionId: data?._id,
        }),
      onSuccess: () => {
        setOpenDelete(false);
        toast.success("Exhibition added successfully.");
        router.replace(router.asPath);
      },
      onError: (error: any) => {
        const errorMessage =
          // @ts-ignore
          error.response?.data?.message ||
          "An error occurred while adding the exhibition.";
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
              setCurrentExhibition(exhibition);
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
            submit(exhibition);
          }}
          open={openDelete}
          title="Exhibition"
          body={`Are you sure you want to delete '${exhibition?.name}' exhibition`}
        />
      </div>
    );
  };

  return (
    <TableContainer className="mb-4" component={Paper}>
      <Table sx={{ minWidth: 925 }}>
        <TableHead>
          <TableRow>
            {["Name", "Type", "Showing Type", "Creation Date", ""].map(
              (col) => (
                <TableCell
                  key={`table-head-${col}`}
                  className="bg-primary text-white text-md font-[600]"
                >
                  {col}
                </TableCell>
              ),
            )}
          </TableRow>
        </TableHead>
        <TableBody className="bg-white text-black border-[1px] border-primary ">
          {exhibitions?.map((exhibition) => (
            <TableRow
              className="bg-white text-black cursor-pointer   px-3 "
              key={exhibition?._id}
            >
              <TableCell className="py-2 text-base font-[300] ml-2  border-b-[1px] border-primary">
                {exhibition?.name}
              </TableCell>
              <TableCell className="py-2 text-base font-[300] ml-2  border-b-[1px] border-primary">
                {exhibition?.type}
              </TableCell>
              <TableCell className="py-2 text-base font-[300] ml-2  border-b-[1px] border-primary">
                {exhibition?.showingType}
              </TableCell>
              <TableCell className="py-2 text-base font-[300] ml-2  border-b-[1px] border-primary">
                {moment(exhibition?.createdAt)?.format("Do MMM, YYYY")}
              </TableCell>
              <TableCell className="py-2 text-base font-[300] ml-2  border-b-[1px] border-primary">
                <MoreButton exhibition={exhibition} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ExhibitionTable;
