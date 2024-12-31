import React from "react";
import { NavLink } from "react-router-dom";

const SidebarItem = ({
  name,
  href,
  icon,
}: {
  name: string;
  href: string;
  icon: React.ReactNode;
}) => {
  return (
    <NavLink
      to={href}
      className={({ isActive }) =>
        `flex items-center rounded-lg px-4 py-2 hover:bg-gray-700/20 ${isActive ? "bg-gray-500/20 font-bold text-primary" : ""}`
      }
    >
      <span className="mr-4">{icon}</span>
      <h1 className="text-sm">{name}</h1>
    </NavLink>
  );
};

export default SidebarItem;
