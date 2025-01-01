import {
  PrivateContent,
  PrivateHeader,
  PrivateLayout,
  PrivateTitle,
} from "@/components/shared/private-layout";
import { Outlet } from "react-router-dom";

const TransactionPage = () => {
  return (
    <PrivateLayout>
      <PrivateHeader>
        <PrivateTitle>Transactions</PrivateTitle>
      </PrivateHeader>
      <PrivateContent>
        <Outlet />
      </PrivateContent>
    </PrivateLayout>
  );
};

export default TransactionPage;
