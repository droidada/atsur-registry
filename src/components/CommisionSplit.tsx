import React, { useEffect, useState } from "react";
import InviteArtist from "./invite-artist";
import { IArtist } from "@/types/models";

import { TiDeleteOutline } from "react-icons/ti";

interface Props {
  percentages: any;
  setPercentages: React.Dispatch<React.SetStateAction<any>>;
  setErrorTree: React.Dispatch<React.SetStateAction<any>>;
  errorTree: any;
}

const CommisionSplit = ({
  percentages,
  setPercentages,
  setErrorTree,
  errorTree,
}: Props) => {
  const [users, setUsers] = useState<IArtist[]>();

  const [totalPercentage, setTotalPercentage] = useState(0);

  const calcuteTotalPercentage = () => {
    const updateError = { ...errorTree };
    delete updateError.commision;
    setErrorTree({ ...updateError });

    const totalPercentage = Object.values(percentages).reduce(
      (acc: number, curr: number | undefined) => acc + (curr || 0),
      0,
    );

    setTotalPercentage(totalPercentage as number);

    if (Math.abs(Number(totalPercentage) - 100) > 0.001) {
      setErrorTree((prev) => ({
        ...prev,
        commision: "Commision split error: The total percentage must be 100%",
      }));
    }
  };

  useEffect(() => {
    if (percentages) {
      calcuteTotalPercentage();
    }
    // checkPercentError();
  }, [JSON.stringify(percentages)]);

  const handlePercentageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    userId: string,
  ) => {
    const value = parseFloat(e.target.value);
    setPercentages({ ...percentages, [userId]: value });
  };

  const handleSubmit = () => {};

  const removeUser = (user: IArtist, id) => {
    const filter = users.filter((user) => user._id !== id);
    setUsers(filter);

    const updatedPercentages = { ...percentages };
    delete updatedPercentages[user._id];
    setPercentages(updatedPercentages);
  };

  return (
    <div className="flex flex-col gap-4 my-4">
      <InviteArtist
        showList={false}
        label="Add Partners"
        placeholder="Partner Name"
        prompt="Add Partners"
        listedArtists={users}
        setListedArtists={setUsers}
      />
      {users?.map((user, index) => (
        <div
          key={`commission-split-${index}`}
          className="grid grid-cols-2  w-fit place-items-center  mx-auto items-center justify-center"
        >
          <label
            className="font-bold text-center text-2xl  w-full"
            htmlFor={user?._id}
          >
            {user?.firstName} {user?.lastName}
          </label>
          <div className="flex items-center gap-2">
            <input
              min="0"
              step="0.01"
              id={user?._id}
              type="number"
              placeholder="0.00"
              value={percentages[user?._id] || ""}
              onChange={(e) => handlePercentageChange(e, user?._id)}
              className=""
            />
            <TiDeleteOutline
              size={24}
              onClick={() => removeUser(user, user?._id)}
            />
          </div>
        </div>
      ))}
      {users?.length > 0 && (
        <div className="text-center mt-2">
          <h6
            className={`${
              totalPercentage > 100 || totalPercentage < 100
                ? "text-red-500"
                : ""
            }`}
          >
            Total Percentage: {totalPercentage}%
          </h6>
        </div>
      )}
    </div>
  );
};

export default CommisionSplit;
