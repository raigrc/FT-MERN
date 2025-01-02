import TransactionForm from "@/components/transactions/transactions-form";
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

export interface InsertDataProps {
  buttonTitle: string;
  title: string;
  children: React.ReactNode;
}

const InsertData: React.FC<InsertDataProps> = ({
  buttonTitle,
  title,
  children,
}) => {
  return (
    <Dialog>
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
