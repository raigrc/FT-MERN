export interface TotalBalanceType {
  totalBalance: number;
  totalExpense: number;
  totalSavings: number;
}

export interface BalanceCategoriesType {
  _id: string;
  name: string;
  totalTransactions: number;
}

export interface BalanceBudgetsType {
  _id: string;
  category: {
    name: string;
  };
  amount: number;
  totalSpent: number;
  start_date: Date;
  end_date: Date;
}

export interface BalanceTransactions {
  _id: string;
  transaction_date: Date;
  description?: string;
  amount: number;
  type: "income" | " expense" | "savings";
}
