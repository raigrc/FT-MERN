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

const AddTransaction = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button>
            <CiCirclePlus />
            Add Transaction
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Transaction</DialogTitle>
          </DialogHeader>
          <TransactionForm />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddTransaction;
