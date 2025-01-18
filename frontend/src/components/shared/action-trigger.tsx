import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import DeleteDialogue from "../shared/delete-dialog";

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
  handleEdit: () => void;
  handleDelete: (id: string) => void;
}) => {
  return (
    <Popover>
      <PopoverTrigger>{icon}</PopoverTrigger>
      <PopoverContent className="flex w-auto flex-col p-0">
        <Button variant="ghost" onClick={handleEdit}>
          Edit
        </Button>
        <DeleteDialogue
          item={title}
          handleDelete={() => handleDelete(_id)}
          trigger={
            <Button variant="ghost" className="text-destructive">
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
