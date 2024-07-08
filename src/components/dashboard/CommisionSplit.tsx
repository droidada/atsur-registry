import React, { useEffect, useMemo, useState } from "react";
import InviteUsers from "./InviteUsers";
import { TiDeleteOutline } from "react-icons/ti";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  MenuItem,
  Paper,
  Switch,
} from "@mui/material";
import { number, object, string, TypeOf } from "zod";
import InputField from "../Form/InputField";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SelectField from "../Form/SelectField";
import { IoMdCheckmarkCircle } from "react-icons/io";

interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  role?: string;
  _id?: string;
}

interface Percentage {
  userInfo: UserInfo;
  percentage: number;
}

interface Props {
  percentages: Percentage[];
  setPercentages: React.Dispatch<React.SetStateAction<Percentage[]>>;
  setErrorTree: React.Dispatch<React.SetStateAction<any>>;
  errorTree: any;
  defaultValues?: any;
  selectedUsers: UserInfo[];
  setSelectedUsers: React.Dispatch<React.SetStateAction<UserInfo[]>>;
}

const CommissionSplit: React.FC<Props> = ({
  percentages,
  setPercentages,
  setErrorTree,
  errorTree,
  defaultValues,
  selectedUsers,
  setSelectedUsers,
}) => {
  // const [totalPercentage, setTotalPercentage] = useState(0);
  const [open, setOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState<UserInfo | null>(null);
  const [roleInputs, setRoleInputs] = useState<{ [key: string]: string }>({});

  const totalPercentage = useMemo(
    () => percentages.reduce((acc, curr) => acc + (curr.percentage || 0), 0),
    [percentages],
  );

  useEffect(() => {
    if (Math.abs(totalPercentage - 100) > 0.001) {
      setErrorTree((prev) => ({
        ...prev,
        commission: "Commission split error: The total percentage must be 100%",
      }));
    } else {
      setErrorTree((prev) => {
        const { commission, ...rest } = prev;
        return rest;
      });
    }
  }, [totalPercentage]);

  useEffect(() => {
    if (defaultValues) {
      setSelectedUsers(defaultValues.map((user) => user.userInfo));
      setPercentages(
        defaultValues.map((user) => ({
          userInfo: user.userInfo,
          percentage: user.percentageNumerator,
        })),
      );
    }
  }, [defaultValues, setPercentages, setSelectedUsers]);

  const handlePercentageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    user: UserInfo,
  ) => {
    const value = parseFloat(e.target.value);
    const updated = percentages.filter(
      (item) => item.userInfo.email !== user.email,
    );
    updated.push({ userInfo: user, percentage: value });
    setPercentages(updated);
  };

  const removeUser = (email: string) => {
    setSelectedUsers(selectedUsers.filter((user) => user.email !== email));
    setPercentages(percentages.filter((item) => item.userInfo.email !== email));
  };

  const handleRoleChange = (user: UserInfo, isMainArtist: boolean) => {
    console.log(isMainArtist);
    if (isMainArtist) {
      setSelectedUsers((prev) =>
        prev.map((item) =>
          item.email === user.email ? { ...item, role: "main artist" } : item,
        ),
      );
      setRoleInputs((prev) => ({ ...prev, [user.email]: "main artist" }));
    } else {
      setSelectedUsers((prev) =>
        prev.map((item) =>
          item.email === user.email ? { ...item, role: "" } : item,
        ),
      );
    }
  };

  console.log(roleInputs);
  const handleCustomRoleChange = (user: UserInfo, customRole: string) => {
    setSelectedUsers((prev) =>
      prev.map((item) =>
        item.email === user.email ? { ...item, role: customRole } : item,
      ),
    );
    setRoleInputs((prev) => ({ ...prev, [user.email]: customRole }));
  };

  console.log(percentages);

  return (
    <div>
      <label className="font-semibold text-[17px] leading-[17px] mb-7">
        Commission Split
      </label>
      <InviteUsers
        isMultiple
        isBrokerInvite
        labelClassName="text-sm font-[400] leading-[16px"
        label="Broker"
        className="mt-4"
        selectedUsers={selectedUsers}
        setSelectedUsers={setSelectedUsers}
        removeUser={removeUser}
      />
      <div className="flex flex-col mt-8 gap-2">
        {selectedUsers.map((user) => (
          <div key={user.email}>
            <div className="flex  gap-4 w-full items-center">
              <label
                className={`${
                  user.role === "main artist" ? "bg-[#00FF94]" : "bg-secondary"
                } text-xs h-full flex-shrink-0  flex gap-4 items-center capitalize px-4 py-2`}
              >
                {user.firstName} {user.lastName}
                <div
                  className={`px-2 py-1 rounded-full items-center flex gap-2 ${
                    user.role === "main artist"
                      ? "bg-secondary"
                      : "bg-secondary-white"
                  }`}
                >
                  {user?.role}
                  {user.role === "main artist" && (
                    <IoMdCheckmarkCircle className="text-primary text-[11px]" />
                  )}
                </div>
              </label>

              <FormControlLabel
                control={<Switch />}
                checked={user.role === "main artist"}
                // @ts-ignore
                onChange={(e) => handleRoleChange(user, e.target.checked)}
                label="is main artist?"
                labelPlacement="start"
                className="text-xs flex-shrink-0"
              />
              {/* <Switch
                checked={user.role === "main artist"}
                onChange={(e) => handleRoleChange(user, e.target.checked)}
              /> */}
              {user.role !== "main artist" && (
                <input
                  type="text"
                  placeholder="Enter role"
                  value={roleInputs[user.email] || ""}
                  onChange={(e) => handleCustomRoleChange(user, e.target.value)}
                  className="w-fit"
                />
              )}
              {user.role && (
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
                    onClick={() => removeUser(user.email)}
                    className="text-red-600"
                  />
                </div>
              )}
              {/* <div
                style={{
                  width: `${
                    percentages.find(
                      (item) => item.userInfo.email === user.email,
                    )?.percentage
                  }%`,
                }}
                className="block  bg-primary"
              />
              <div className="flex items-center   w-fit px-2">
                {percentages.find((item) => item.userInfo.email === user.email)
                  ?.percentage || 0}
                %
              </div> */}
            </div>
          </div>
        ))}
        {selectedUsers.length > 0 && (
          <div className="mt-2">
            <h6
              className={`font-[300] text-[16px] leading-[17px] ${
                totalPercentage !== 100 ? "text-[#FF0808]" : ""
              }`}
            >
              Total Percentage {totalPercentage}%.{" "}
              {totalPercentage !== 100 && "Percentage must be 100%"}
            </h6>
          </div>
        )}
      </div>
      {/* <PercentageModal
        totalPercentage={totalPercentage}
        open={open}
        setSelectedUsers={setSelectedUsers}
        handleClose={() => setOpen(false)}
        handlePercentageChange={handlePercentageChange}
        removeUser={removeUser}
        user={currentUser}
        percentages={percentages}
        selectedUsers={selectedUsers}
      /> */}
    </div>
  );
};

export default CommissionSplit;

interface PercentageModalProps {
  open: boolean;
  handleClose: () => void;
  totalPercentage: number;
  handlePercentageChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    user: UserInfo,
    role: string,
  ) => void;
  removeUser: (email: string) => void;
  user: UserInfo | null;
  setSelectedUsers: React.Dispatch<React.SetStateAction<UserInfo[]>>;
  percentages: Percentage[];
  selectedUsers: UserInfo[];
}

const PercentageModal: React.FC<PercentageModalProps> = ({
  open,
  handleClose,
  handlePercentageChange,
  removeUser,
  setSelectedUsers,
  selectedUsers,
  user,
  percentages,
  totalPercentage,
}) => {
  const percentageSchema = object({
    role: string().optional(),
    percent: string().nonempty("Enter the percentage"),
    isMainArtist: string({
      required_error: "Add the broker role",
    }).nonempty("Select an option"),
  }).superRefine((values, ctx) => {
    // if (totalPercentage > 100) {
    //   ctx.addIssue({
    //     code: "custom",
    //     message: "Percentage sum must be 100%",
    //     fatal: true,
    //     path: ["percent"],
    //   });
    // }
    if (isMainArtist === "no" && !values.role) {
      ctx.addIssue({
        code: "custom",
        message: "Add the broker role",
        fatal: true,
        path: ["role"],
      });
    }
  });
  type Metadata = TypeOf<typeof percentageSchema>;

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<Metadata>({
    resolver: zodResolver(percentageSchema),
  });

  const isMainArtist = watch("isMainArtist");

  const onSubmit: SubmitHandler<Metadata> = (data) => {
    // const check = selectedUsers?.find((item) => item.role === "main artist");

    handlePercentageChange(
      {
        target: { value: data.percent },
      } as React.ChangeEvent<HTMLInputElement>,
      user!,
      data.role,
    );
    if (isMainArtist === "yes") {
      setSelectedUsers((prev) =>
        prev.map((item) =>
          item.email === user.email ? { ...item, role: "main artist" } : item,
        ),
      );
    } else {
      setSelectedUsers((prev) =>
        prev.map((item) =>
          item.email === user.email ? { ...item, role: data.role } : item,
        ),
      );
    }

    handleClose();
    reset();
  };

  useEffect(() => {
    const percentage = percentages.find(
      (item) => user.email === item.userInfo.email,
    )?.percentage;
    const userRole = user?.role;
    setValue("percent", String(percentage));
    setValue("role", userRole);
  }, [user, setValue, percentages]);

  return (
    <Dialog
      PaperComponent={Paper}
      PaperProps={{ component: "form", onSubmit: handleSubmit(onSubmit) }}
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={() => {
        reset();
        handleClose();
      }}
    >
      <DialogTitle>Add Percentage</DialogTitle>
      <DialogContent dividers>
        {/* <p className="text-xs text-right font-[400]">
          Total Percentage Left{" "}
          <span className="font-bold">
            {100 - totalPercentage + Number(watch("percent")) || 0}%
          </span>
        </p> */}
        <div className="flex flex-col gap-4">
          <InputField
            label="Percent"
            labelClassName="text-sm font-[400]"
            type="number"
            id="percent"
            name="percent"
            aria-required="true"
            // onChange={(e) => handlePercentageChange(e, user!)}
            fullWidth
            error={!!errors.percent}
            helperText={errors.percent ? errors.percent.message : ""}
            control={control}
          />
          <SelectField
            name="isMainArtist"
            control={control}
            label="Is Main Artist?"
            defaultValue="no"
            isRequired
            fullWidth
            helperText={errors.isMainArtist ? errors.isMainArtist.message : ""}
            error={!!errors.isMainArtist}
          >
            <MenuItem value="" selected>
              Select Answer
            </MenuItem>
            {["yes", "no"].map((item) => (
              <MenuItem
                key={item}
                value={item}
                className="text-xm capitalize bg-secondary"
              >
                {item}
              </MenuItem>
            ))}
          </SelectField>
          {isMainArtist === "no" && (
            <InputField
              label="Role"
              labelClassName="text-sm font-[400]"
              id="role"
              name="role"
              aria-required="true"
              fullWidth
              error={!!errors.role}
              helperText={errors.role ? errors.role.message : ""}
              control={control}
            />
          )}
        </div>
      </DialogContent>
      <DialogActions className="flex justify-between px-4">
        <div className="flex gap-5">
          <Button
            onClick={() => {
              removeUser(user.email);
              reset();
              handleClose();
            }}
            variant="contained"
            className="bg-red-600 text-white"
          >
            Remove Broker
          </Button>
          <Button
            onClick={() => {
              reset();
              handleClose();
            }}
            variant={"outlined"}
          >
            Cancel
          </Button>
        </div>
        <Button
          variant="contained"
          className="bg-primary text-white"
          type="submit"
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
