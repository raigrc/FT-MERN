import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CardWrapperProps } from "@/types/card-wrapper.types";
import React from "react";

const CardWrapper: React.FC<CardWrapperProps> = ({
  children,
  title,
  footer,
  description,
}) => {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter className="flex items-center justify-center">
        {footer}
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;
