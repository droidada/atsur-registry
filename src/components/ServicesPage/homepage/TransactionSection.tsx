import Image from "next/image";
import Link from "next/link";
import React from "react";

const items = [
  {
    title: "Transparent Transactions",
    content: "Tamper-proof records ensuring transparency",
    image:
      "/assets/images/services/transaction-section/transparent-transactions.svg",
    link: "/services/sales-smart-contract",
  },
  {
    title: "Secure Ownership Records",
    content: "Immutable digital certificates for each transaction.",
    image: "/assets/images/services/transaction-section/secure-ownership.svg",
    link: "/services/asset-ownership",
  },
  {
    title: "Efficient Transfers",
    content: "Seamless transfer of ownership through smart contracts.",
    image: "/assets/images/services/transaction-section/efficient-transfer.svg",
    link: "/services/sales-smart-contract",
  },
];
const TransactionSection = () => {
  return (
    <div
      data-aos="fade-up"
      className="flex justify-center page-container items-stretch py-8  gap-6 flex-wrap"
    >
      {items?.map((item, index) => (
        <Link
          data-aos="fade-up"
          data-aos-delay={index * 200}
          href={item?.link}
          key={item?.title}
          className="p-6 bg-primary max-w-[395px] w-full text-white flex flex-col gap-4 items-center"
        >
          <div className="w-full max-w-[295px] h-[160px]   bg-white flex justify-center items-center">
            <Image src={item?.image} alt={item?.title} width={88} height={88} />
          </div>
          <h5 className="text-2xl font-semibold text-center">{item?.title}</h5>
          <p className="text-center"> {item?.content}</p>
        </Link>
      ))}
    </div>
  );
};

export default TransactionSection;
