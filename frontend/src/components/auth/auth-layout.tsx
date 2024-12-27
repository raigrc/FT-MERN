import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
    <div className="flex items-center justify-center h-full">
      <CardWrapper title={title} description={description} footer={footer}>
        {children}
      </CardWrapper>
      {/* <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
        <CardFooter className="flex items-center justify-center">
          {footer}
        </CardFooter>
      </Card> */}
    </div>
  );
};

export default AuthLayout;
