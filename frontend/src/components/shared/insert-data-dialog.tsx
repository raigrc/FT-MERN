import { Button } from "@/components/ui/button";
import { CiCirclePlus } from "react-icons/ci";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import { InsertDataProps } from "@/types/insert-data.types";

const InsertData: React.FC<InsertDataProps> = ({
  buttonTitle,
  title,
  children,
}) => {
  return (
    <Dialog modal={false}>
      <DialogTrigger>
        <Button>
          <CiCirclePlus />
          {buttonTitle}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default InsertData;
