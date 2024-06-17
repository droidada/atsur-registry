import React, { useEffect, useState } from "react";
import InviteUsers from "./InviteUsers";
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
  selectedUsers: any[];
  setSelectedUsers: React.Dispatch<React.SetStateAction<any[]>>;
}
const CommisionSplit: React.FC<Props> = ({
  percentages,
  setPercentages,
  setErrorTree,
  errorTree,
  defaultValues,
  selectedUsers,
  setSelectedUsers,
}) => {
  const [totalPercentage, setTotalPercentage] = useState(0);

  const calcuteTotalPercentage = () => {
    const updateError = { ...errorTree };
    delete updateError.commision;
    setErrorTree({ ...updateError });

    if (Math.abs(Number(totalPercentage) - 100) > 0.001) {
      setErrorTree((prev) => ({
        ...prev,
        commision: "Commision split error: The total percentage must be 100%",
      }));
    } else {
      const errors = { ...errorTree };
      delete errors.commision;
      setErrorTree(errors);
    }
  };

  useEffect(() => {
    const totalPercentage = percentages.reduce(
      (acc: number, curr) => acc + (curr.percentage || 0),
      0,
    );

    setTotalPercentage(totalPercentage as number);
  }, [selectedUsers, percentages]);

  useEffect(() => {
    if (percentages) {
      calcuteTotalPercentage();
    }
    // checkPercentError();
  }, [JSON.stringify(percentages), totalPercentage]);

  console.log(defaultValues);

  useEffect(() => {
    if (defaultValues) {
      // setUsers(defaultValues.map((user) => user.userInfo));

      setSelectedUsers(defaultValues.map((user) => user.userInfo));
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
    user: any,
  ) => {
    const value = parseFloat(e.target.value);
    // Get the the current user data from the users array
    const userData: any = selectedUsers.find((userI) => {
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

  const removeUser = (user: any, email: string) => {
    const filter = selectedUsers.filter((user) => user.email !== email);
    setSelectedUsers(filter);
    setPercentages(
      percentages.filter((userI) => userI.userInfo.email !== email),
    );
  };

  console.log(selectedUsers);

  return (
    <div>
      <label className="font-semibold text-[17px] leading-[17px] mb-7">
        Commission Split
      </label>
      <InviteUsers
        isMultiple
        labelClassName="text-sm font-thin  leading-[16px"
        label="Broker"
        className="mt-4"
        selectedUsers={selectedUsers}
        setSelectedUsers={setSelectedUsers}
      />
      <div className="flex flex-col mt-8 gap-2">
        {selectedUsers.map((user) => (
          <div key={user.email} className="">
            <div className="grid grid-cols-2 max-w-[450xp] w-full  items-center">
              <label
                className="text-xs w-[80%] h-full bg-secondary grid place-items-center capitalize px-4 py-2   "
                htmlFor=""
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
                    percentages.find(
                      (userI) => userI.userInfo.email === user.email,
                    )?.percentage || ""
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
          </div>
        ))}

        {selectedUsers?.length > 0 && (
          <div className=" mt-2">
            <h6
              className={`font-[300] text-[16px] leading-[17px] ${
                totalPercentage > 100 || totalPercentage < 100
                  ? "text-[#FF0808]"
                  : ""
              }`}
            >
              Total Percentage {totalPercentage}%.{" "}
              {(totalPercentage > 100 || totalPercentage < 100) &&
                "Percentage must be 100%"}
            </h6>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommisionSplit;
