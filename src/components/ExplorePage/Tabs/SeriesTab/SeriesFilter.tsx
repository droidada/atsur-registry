import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Avatar,
  Autocomplete,
  CircularProgress,
  TextField,
} from "@mui/material";
import axios from "@/lib/axios";
import useDebounce from "@/hooks/useDebounce";

interface Props {
  setSelectedArtist: React.Dispatch<any>;
  selectedArtist: any;
}
const SeriesFilter: React.FC<Props> = ({ setSelectedArtist, selectedArtist }) => {

  const [search, setSearch] = useState("");
  const debounce = useDebounce(search as string, 500);

  const {
    data: artists,
    isLoading,
    isError,
  } = useQuery(["artists-search", debounce], () =>
    axios.get(`/artist?search=${debounce}`),
  );

  console.log(artists?.data);

  return (
    <aside className="hidden md:flex sticky left-0 top-0 flex-col w-full max-w-[281px] bg-secondary-white p-4">
      <h3 className="text-lg font-semibold mb-4">Filter by Artist</h3>

      <Autocomplete
        options={artists?.data?.artists || []}
        getOptionLabel={(artist) => `${artist.firstName} ${artist.lastName}`}
        value={selectedArtist}
        onChange={(event, newValue) => {
          setSelectedArtist(newValue);
        }}
        onInputChange={(event, newInputValue) => {
          setSearch(newInputValue);
        }}
        renderOption={(props, artist) => (
          <li {...props} className="flex gap-2 py-2 items-center">
            <Avatar
              src={artist.avatar}
              alt={`${artist.firstName} ${artist.lastName}`}
              className="w-8 h-8"
            />
            {artist.firstName} {artist.lastName}
          </li>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search Artist"
            variant="outlined"
            fullWidth
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {isLoading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
    </aside>
  );
};

export default SeriesFilter;
