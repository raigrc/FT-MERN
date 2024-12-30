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
        `mt-4 flex items-center ${isActive ? "font-bold text-primary" : ""}`
      }
    >
      <span className="mx-2">{icon}</span>
      <h1 className="text-sm">{name}</h1>
    </NavLink>
  );
};

export default SidebarItem;
