import React from "react";
import CardWrapper from "../shared/card-wrapper";

const CategoryLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto flex h-full w-full max-w-xl items-center justify-center">
      <CardWrapper title="Add Category">{children}</CardWrapper>
    </div>
  );
};

export default CategoryLayout;
