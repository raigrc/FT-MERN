const NothingFound = ({ title }: { title: string }) => {
  return (
    <div className="flex items-center justify-center w-full">
      No {title} Found
    </div>
  );
};

export default NothingFound;
