import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

const EditDialog = ({
  trigger,
  title,
  children,
}: {
  trigger: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit {title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;
