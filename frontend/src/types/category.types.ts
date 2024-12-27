export interface ICategory {
  _id: string;
  userId: string;
  name: string;
  type: "income" | "expense";
}
