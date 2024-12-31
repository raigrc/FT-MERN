import { items } from "@/data/navbar.data";
import SidebarHeader from "./sidebar-header";
import SidebarItem from "./sidebar-item";

const Sidebar = () => {
  return (
    <div className="min-w-[250px] space-y-6 overflow-auto border-r-2 px-2 py-6">
      <SidebarHeader name="Raven Justin Garcia" email="example@gmail.com" />
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
