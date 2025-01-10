import { items } from "@/data/navbar.data";
import SidebarHeader from "./sidebar-header";
import SidebarItem from "./sidebar-item";
import { useUserStore } from "@/store/useUserStore";

const Sidebar = () => {
  const { user } = useUserStore();
  return (
    <div className="min-w-[250px] space-y-6 overflow-auto border-r-2 px-2 py-6">
      <SidebarHeader name={user?.name} email={user?.email} />
      <div className="space-y-1">
        {items.map((item) => (
          <SidebarItem
            key={item.name}
            href={item.href}
            name={item.name}
            icon={<item.icon size={16} />}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
