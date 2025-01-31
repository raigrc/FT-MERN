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
      <div className="flex flex-row items-center w-full p-4 just-between">
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
