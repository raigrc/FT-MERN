const SidebarHeader = ({ name, email }: { name: string; email: string }) => {
  return (
    <div className="border-b-2 pb-4">
      <h1 className="font-semibold">{name}</h1>
      <p className="text-xs text-gray-400">{email}</p>
    </div>
  );
};

export default SidebarHeader;
