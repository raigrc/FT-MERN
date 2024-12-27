import CardWrapper from "../shared/card-wrapper";

const BudgetLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto flex h-full w-full max-w-xl items-center justify-center">
      <CardWrapper title="Add Budget">{children}</CardWrapper>
    </div>
  );
};

export default BudgetLayout;
