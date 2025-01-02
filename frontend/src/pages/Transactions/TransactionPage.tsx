import {
  PrivateContent,
  PrivateHeader,
  PrivateLayout,
  PrivateTitle,
} from "@/components/shared/private-layout";
import { Button } from "@/components/ui/button";
import { Outlet } from "react-router-dom";
import { CiCirclePlus } from "react-icons/ci";

const TransactionPage = () => {
  return (
    <PrivateLayout>
      <PrivateHeader className="space-y-4">
        <PrivateTitle>Transactions</PrivateTitle>
        <Button>
          <CiCirclePlus />
          Add Transaction
        </Button>
      </PrivateHeader>
      <PrivateContent>
        <Outlet />
      </PrivateContent>
    </PrivateLayout>
  );
};

export default TransactionPage;
