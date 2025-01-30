import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import React from "react";
import { IoMenu } from "react-icons/io5";

const NavigationSmall = ({
  title,
  children,
}: {
  title: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <>
      <div className="just-between flex w-full flex-row items-center">
        <Sheet>
          <SheetTrigger>
            <IoMenu size={32} />
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>{title}</SheetTitle>
              <SheetDescription>{children}</SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>

        <div></div>
      </div>
    </>
  );
};

export default NavigationSmall;
