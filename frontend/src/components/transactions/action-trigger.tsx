import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BsThreeDots } from "react-icons/bs";
import { Button } from "../ui/button";

const ActionTrigger = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <BsThreeDots />
      </PopoverTrigger>
      <PopoverContent className="flex flex-col w-auto p-0">
        <Button variant="ghost">Edit</Button>
        <Button variant="ghost" className="text-red-400">
          Delete
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default ActionTrigger;
