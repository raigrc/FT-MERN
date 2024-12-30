const SidebarHeader = ({ name, email }: { name: string; email: string }) => {
  return (
    <div>
      <h1 className="text-lg font-semibold">{name}</h1>
      <p className="text-xs text-gray-400">{email}</p>
    </div>
  );
};

export default SidebarHeader;
