import { AdminCartProps } from "@/constant/Type";
import React from "react";

const AdminCart = ({ headerText, Icon, IconStyle, count }: AdminCartProps) => {
  return (
    <div className="bg-white p-4 rounded-2xl space-y-4">
      <div className="flex flex-row items-center justify-between">
        <p className="text-xl">{headerText}</p>
        <div className={`p-2 ${IconStyle} rounded-xl`}>
          <Icon size={30} />
        </div>
      </div>
      <p className="text-2xl font-bold">{count}</p>
    </div>
  );
};

export default AdminCart;
