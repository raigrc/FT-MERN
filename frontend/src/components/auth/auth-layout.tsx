import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AuthLayoutProps } from "@/types/auth.types";
import React from "react";

const AuthLayout: React.FC<AuthLayoutProps> = ({
  title,
  description,
  children,
}) => {
  return (
    <div className="flex h-full items-center justify-center">
      <Card className="min-w-[450px]">
        <CardHeader>
          <CardTitle className="text-2xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
};

export default AuthLayout;
