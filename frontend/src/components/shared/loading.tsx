import { AiOutlineLoading } from "react-icons/ai";
import React from "react";

const LoadingState = ({ children }: { children?: React.ReactNode }) => {
  return (
    <>
      <span className="mr-2 animate-spin">
        <AiOutlineLoading />
      </span>
      {children}
    </>
  );
};

export default LoadingState;
