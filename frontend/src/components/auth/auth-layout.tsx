import { AuthLayoutProps } from "@/types/auth.types";
import React from "react";
import CardWrapper from "../shared/card-wrapper";

const AuthLayout: React.FC<AuthLayoutProps> = ({
  title,
  description,
  children,
  footer,
}) => {
  return (
    <div className="flex h-full items-center justify-center">
      <CardWrapper title={title} description={description} footer={footer}>
        {children}
      </CardWrapper>
    </div>
  );
};

export default AuthLayout;
