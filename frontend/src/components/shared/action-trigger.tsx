import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import DeleteDialogue from "../shared/delete-dialog";
import EditDialog from "./edit-dialog";

const ActionTrigger = ({
  icon,
  title,
  _id,
  handleEdit,
  handleDelete,
}: {
  icon: React.ReactNode;
  title: string;
  _id: string;
  handleEdit: any;
  handleDelete: (id: string) => void;
}) => {
  return (
    <Popover>
      <PopoverTrigger>{icon}</PopoverTrigger>
      <PopoverContent className="flex flex-col w-auto p-0">
        <EditDialog
          title={title}
          trigger={
            <Button variant="ghost" className="w-full">
              Edit
            </Button>
          }
        >
          {handleEdit}
        </EditDialog>
        <DeleteDialogue
          item={title}
          handleDelete={() => handleDelete(_id)}
          trigger={
            <Button variant="ghost" className="w-full text-destructive">
              Delete
            </Button>
          }
        />
        {/* {children} */}
      </PopoverContent>
    </Popover>
  );
};

export default ActionTrigger;
