import { items } from "@/data/navbar.data";
import SidebarHeader from "./sidebar-header";
import SidebarItem from "./sidebar-item";
import { useUserStore } from "@/store/useUserStore";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { signOut } from "@/api/axios.signOut";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useTransition } from "react";
import LoadingState from "../shared/loading";
import useScreenWidth from "@/hooks/useScreenWidth";
import NavigationMeidum from "./navigation-medium";
import NavigationSmall from "./navigation-small";

const Sidebar = () => {
  const { user, clearUser } = useUserStore();
  const screenWidth = useScreenWidth();
  const [isPending, startTransition] = useTransition();
  const navigate = useNavigate();

  const handleSignout = () => {
    startTransition(() => {
      signOut().then((response) => {
        if (response.success) {
          toast.info(response.message);
          clearUser();
          navigate("/login");
        }
      });
    });
  };
  if (screenWidth >= 1024) {
    return (
      <div className="h-full min-w-[250px] space-y-6 overflow-auto border-r-2 px-2 py-6">
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
        <Separator />
        <Button onClick={handleSignout} className="w-full" disabled={isPending}>
          {isPending ? (
            <>
              <LoadingState>Signing out...</LoadingState>
            </>
          ) : (
            "Sign out"
          )}
        </Button>
      </div>
    );
  } else if (screenWidth >= 768) {
    return <NavigationMeidum />;
  } else {
    return (
      <NavigationSmall
        title={<SidebarHeader name={user?.name} email={user?.email} />}
      >
        <div className="space-y-1">
          {items.map((item) => (
            <SidebarItem
              key={item.name}
              href={item.href}
              name={item.name}
              icon={<item.icon size={16} />}
            />
          ))}
          <Separator />
          <Button
            onClick={handleSignout}
            className="w-full"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <LoadingState>Signing out...</LoadingState>
              </>
            ) : (
              "Sign out"
            )}
          </Button>
        </div>
      </NavigationSmall>
    );
  }
};

export default Sidebar;
