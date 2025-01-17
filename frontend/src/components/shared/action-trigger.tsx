import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const ActionTrigger = ({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <Popover>
      <PopoverTrigger>{icon}</PopoverTrigger>
      <PopoverContent className="flex flex-col w-auto p-0">
        {children}
      </PopoverContent>
    </Popover>
  );
};

export default ActionTrigger;
