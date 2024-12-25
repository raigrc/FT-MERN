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

const AuthLayout: React.FC<AuthLayoutProps> = ({
  title,
  description,
  children,
  footer,
}) => {
  return (
    <div className="flex items-center justify-center h-full">
      <Card className="min-w-[350px]">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
        <CardFooter className="flex items-center justify-center">
          {footer}
        </CardFooter>
      </Card>
    </div>
  );
};

export default AuthLayout;
