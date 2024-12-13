import React from "react";

const ReactionButton = ({ icon, label, onClick, like }) => {
  return (
    <div
      className="grow flex cursor-pointer py-1 hover:bg-gray-100 rounded-md justify-center gap-2 items-center"
      onClick={onClick}
    >
      {icon}
      <p
        className={`font-semibold  ${like ? "text-blue-500" : "text-gray-500"}`}
      >
        {label}
      </p>
    </div>
  );
};

export default ReactionButton;
