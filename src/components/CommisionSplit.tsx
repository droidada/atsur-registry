import React, { useEffect, useState } from "react";
import InviteArtist from "./invite-artist";
import { IArtist } from "@/types/models";

import { TiDeleteOutline } from "react-icons/ti";

interface Props {
  percentages: {
    userInfo: {
      firstName: string;
      lastName: string;
      email: string;
    };
    percentage: number;
  }[];
  setPercentages: React.Dispatch<
    React.SetStateAction<
      {
        userInfo: {
          firstName: string;
          lastName: string;
          email: string;
        };
        percentage: number;
      }[]
    >
  >;
  setErrorTree: React.Dispatch<React.SetStateAction<any>>;
  errorTree: any;
  defaultValues?: any;
}

const CommisionSplit = ({
  percentages,
  setPercentages,
  setErrorTree,
  errorTree,
  defaultValues,
}: Props) => {
  const [users, setUsers] = useState<IArtist[]>([]);

  const [totalPercentage, setTotalPercentage] = useState(0);

  const calcuteTotalPercentage = () => {
    const updateError = { ...errorTree };
    delete updateError.commision;
    setErrorTree({ ...updateError });

    const totalPercentage = percentages.reduce(
      (acc: number, curr) => acc + (curr.percentage || 0),
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

  useEffect(() => {
    if (defaultValues) {
      setUsers(defaultValues.map((user) => user.userInfo));

      setPercentages(
        defaultValues.map((user) => ({
          userInfo: user.userInfo,
          percentage: user.percentageNumerator,
        })),
      );
    }
  }, [defaultValues]);

  const handlePercentageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    user: IArtist,
  ) => {
    const value = parseFloat(e.target.value);
    // Get the the current user data from the users array
    const userData: any = users.find((userI) => {
      console.log(userI, user);
      return userI.email === user.email;
    });
    // add the percentage value to the object
    const data = { userInfo: userData, percentage: value };
    // Filter out the current user data from the percentage to
    // allow adding the new value
    const filterData = percentages.filter(
      (userI) => userI.userInfo.email !== user.email,
    );

    setPercentages([...filterData, data]);
  };

  const removeUser = (user: IArtist, email: string) => {
    const filter = users.filter((user) => user.email !== email);
    setUsers(filter);

    setPercentages(
      percentages.filter((userI) => userI.userInfo.email !== email),
    );
  };

  return (
    <div className="flex flex-col gap-4 ">
      <InviteArtist
        showList={false}
        placeholder="Collaborators"
        prompt="Collaborators"
        label="Collaborators"
        listedArtists={users}
        setListedArtists={setUsers}
        type={"user"}
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
              value={
                percentages.find((userI) => userI.userInfo.email === user.email)
                  ?.percentage || ""
              }
              onChange={(e) => handlePercentageChange(e, user)}
              className=""
            />
            <TiDeleteOutline
              size={24}
              onClick={() => removeUser(user, user?.email)}
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
