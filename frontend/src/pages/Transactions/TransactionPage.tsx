import {
  PrivateContent,
  PrivateHeader,
  PrivateLayout,
  PrivateTitle,
} from "@/components/shared/private-layout";
import { Outlet } from "react-router-dom";

import AddTransaction from "./AddTransaction";

const TransactionPage = () => {
  return (
    <PrivateLayout>
      <PrivateHeader className="space-y-4">
        <PrivateTitle>Transactions</PrivateTitle>
        <AddTransaction />
      </PrivateHeader>
      <PrivateContent>
        <Outlet />
      </PrivateContent>
    </PrivateLayout>
  );
};

export default TransactionPage;
