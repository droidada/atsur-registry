import { Avatar, Stack } from "@mui/material";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsFillBookmarkDashFill } from "react-icons/bs";
import { IoCalendarClearOutline } from "react-icons/io5";

interface Props {
  organization: any;
  url: string;
}

const OrganizationCard: React.FC<Props> = ({ organization, url }) => {
  return (
    <Link href={url} className="bg-white flex flex-col  w-full text-primary ">
      <Image
        src={organization?.image}
        alt={organization?.name}
        width={281}
        height={273}
        className="object-cover w-full h-[60%]"
      />
      <div className="md:py-[28px] font-[300] flex flex-col gap-3  ">
        <h3 className="text-2xl lg:text-[33px]  pb-4 border-b-[1px] ">
          {organization?.name}
        </h3>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <p className="text-sm font-[300] tracking-[1%]">Members</p>
            <div className="flex ">
              {organization?.members?.slice(0, 3)?.map((member, index) => (
                <Avatar
                  key={member?.invitaion?._id}
                  alt={member?.invitaion?.name}
                  src={member?.invitaion?.image}
                  sx={{ translate: `-${40 * index}%` }}
                  className={`w-[28px] h-[28px] relative `}
                />
              ))}
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <div className="flex gap-2 items-center">
              <BsFillBookmarkDashFill size={12} />
              <span className="text-xs leading-[10px]">
                {organization?.address}
              </span>
            </div>
            <div className="flex gap-2 items-center">
              <IoCalendarClearOutline size={12} />
              <span className="text-xs leading-[8px]">
                {moment(organization?.createdAt).format("Do MMM, YYYY")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default OrganizationCard;
