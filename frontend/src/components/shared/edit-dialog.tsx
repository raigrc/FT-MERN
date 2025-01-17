import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";

const EditDialog = ({
  trigger,
  title,
  handleEdit,
}: {
  trigger: React.ReactNode;
  title: string;
  handleEdit: () => void;
}) => {
  return (
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>Edit {title}</DialogHeader>
        <DialogDescription></DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;
