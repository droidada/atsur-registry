import {
  Card,
  CardContent,
  Checkbox,
  IconButton,
  Radio,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { GrPowerReset } from "react-icons/gr";
interface Props {
  setQuery: React.Dispatch<React.SetStateAction<any>>;
}

const ExploreLeft: React.FC<Props> = ({ setQuery }) => {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedRarity, setSelectedRarity] = useState<string | null>(null);
  const [forSaleChecked, setForSaleChecked] = useState<boolean>(false);
  const [priceRange, setPriceRange] = useState<string | null>(null);
  const [type, setType] = useState<string | null>(null);

  const handleTypeChange = (value: string) => {
    if (type === value) {
      setType(null);
      setQuery((prev) => ({
        ...prev,
        filter: {
          ...prev.filter,
          artType: null,
        },
      }));
    } else {
      setType(value);
      setQuery((prev) => ({
        ...prev,
        filter: {
          ...prev.filter,
          artType: value === "contemporary" ? "art-piece" : "artifact",
        },
      }));
    }
  };

  const handleRatingChange = (value: number) => {
    if (selectedRating === value) {
      // If the same rating is clicked again, deselect it
      setSelectedRating(null);
      setQuery((prev) => ({
        ...prev,
        rating: null,
      }));
    } else {
      // Otherwise, select the new rating
      setSelectedRating(value);
      setQuery((prev) => ({
        ...prev,
        rating: value,
      }));
    }
  };

  const handleForSaleChange = (checked: boolean) => {
    setForSaleChecked(checked);
    setQuery((prev) => ({
      ...prev,
      filter: {
        ...prev.filter,
        forSale: checked,
      },
    }));
  };

  const handleRarityChange = (value: string) => {
    if (selectedRarity === value) {
      setSelectedRarity(null);
      setQuery((prev) => ({
        ...prev,
        filter: {
          ...prev.filter,
          rarity: undefined,
        },
      }));
    } else {
      setSelectedRarity(value);
      setQuery((prev) => ({
        ...prev,
        filter: {
          ...prev.filter,
          rarity: value,
        },
      }));
    }
  };

  const handlePriceRangeChange = (range: string) => {
    if (priceRange === range) {
      setPriceRange(null);
      setQuery((prev) => ({
        ...prev,
        filter: {
          ...prev.filter,
          priceRange: null,
        },
      }));
    } else {
      setPriceRange(range);
      setQuery((prev) => ({
        ...prev,
        filter: {
          ...prev.filter,
          priceRange: priceRange,
        },
      }));
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Card className="rounded-xl">
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          px={2}
        >
          <Typography variant="h3" className="text-center">
            Filter
          </Typography>

          <IconButton
            title="Reset filters"
            className="hover:bg-transpa"
            onClick={() => {
              setSelectedRarity(null);
              setSelectedRating(null);
              setForSaleChecked(false);
              setPriceRange(null);
              setQuery((prev) => ({ ...prev, filter: {} }));
            }}
          >
            <GrPowerReset />
          </IconButton>
        </Stack>
      </Card>
      <Card className="p-4 rounded-xl">
        <Typography variant="h4" className="text-center">
          Status
        </Typography>
        <CardContent component={Stack} direction={"column"} spacing={"1rem"}>
          <Stack direction={"row"} alignItems={"center"}>
            <Checkbox
              id="verified"
              onChange={(e) =>
                setQuery((prev) => ({
                  ...prev,
                  filter: {
                    ...prev.filter,
                    verificationStatus: e.target.checked ? "verified" : null,
                  },
                }))
              }
            />
            <Typography
              className="text-xl "
              component={"label"}
              htmlFor="verified"
            >
              Verified
            </Typography>
          </Stack>
          <Stack direction={"row"} alignItems={"center"}>
            <Checkbox
              id="forSale"
              checked={forSaleChecked}
              onChange={(e) => handleForSaleChange(e.target.checked)}
            />
            <Typography
              className="text-xl "
              component={"label"}
              htmlFor="forSale"
            >
              For Sale
            </Typography>
          </Stack>
        </CardContent>
      </Card>
      <Card className="p-4 rounded-xl">
        <Typography variant="h4" className="text-center">
          Ratings
        </Typography>
        <CardContent component={Stack} direction={"column"} spacing={"1rem"}>
          {[...Array(5)].map((_, index) => (
            <Stack
              key={`rating-${index + 1}Stars`}
              direction={"row"}
              alignItems={"center"}
              spacing={1}
            >
              <Radio
                id={`${index + 1}Stars`}
                name="rating"
                checked={selectedRating === index + 1}
                onChange={() => handleRatingChange(index + 1)}
              />
              <Typography component={"label"} htmlFor={`${index + 1}Stars`}>
                <Rating readOnly value={index + 1} />
              </Typography>
            </Stack>
          ))}
        </CardContent>
      </Card>
      <Card className="p-4 rounded-xl">
        <Typography variant="h4" className="text-center">
          Price
        </Typography>
        {["0-100", "100-200", "200-300", "600 and more"].map((range, index) => (
          <Stack
            key={index}
            direction={"row"}
            alignItems={"center"}
            spacing={1}
          >
            <Radio
              id={`priceRange-${index}`}
              name="priceRange"
              checked={priceRange === range}
              onChange={() => handlePriceRangeChange(range)}
            />
            <Typography
              variant="body1"
              className="font-bold"
              component={"label"}
              htmlFor={`priceRange-${index}`}
            >
              {range}
            </Typography>
          </Stack>
        ))}
      </Card>
      <Card className="p-4 rounded-xl">
        <Typography variant="h4" className="text-center">
          Rarity
        </Typography>
        <Stack direction={"column"} spacing={1}>
          {["unique", "limited_edition", "open_edition", "unknown"].map(
            (value) => (
              <Stack
                key={value}
                direction={"row"}
                alignItems={"center"}
                spacing={1}
              >
                <Radio
                  id={value}
                  name="rarity"
                  checked={selectedRarity === value}
                  onChange={(e) => handleRarityChange(value)}
                />
                <Typography
                  className="capitalize"
                  component={"label"}
                  htmlFor={value}
                >
                  {value.replace("_", " ")}
                </Typography>
              </Stack>
            ),
          )}
        </Stack>
      </Card>
      <Card className="p-4 rounded-xl">
        <Typography variant="h4" className="text-center">
          Type
        </Typography>
        <Stack direction={"column"} spacing={1}>
          {["contemporary", "historical"].map((value) => (
            <Stack
              key={value}
              direction={"row"}
              alignItems={"center"}
              spacing={1}
            >
              <Radio
                id={value}
                name="type"
                checked={type === value}
                onChange={(e) => handleTypeChange(value)}
              />
              <Typography
                className="capitalize"
                component={"label"}
                htmlFor={value}
              >
                {value.replace("_", " ")}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Card>
    </div>
  );
};

export default ExploreLeft;
