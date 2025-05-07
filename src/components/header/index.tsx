"use client";

import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { CreateTicket } from "../create-ticket";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const { logout, getUser, authState } = useAuth();

  useEffect(() => {
    getUser();
  }, []);

  const handleLogout = () => {
    logout();
    router.refresh();
  };

  const { user } = authState;

  return (
    <header className="flex w-full justify-between">
      <div className="flex gap-[10px] items-center">
        <div className="flex gap-[10px] items-center">
          <Avatar>
            {user?.image ? (
              <AvatarImage src={user.image} alt={user.name || ""} />
            ) : null}
            <AvatarFallback className={!user?.image ? "bg-gray-300" : ""}>
              {user?.name ? user.name[0].toUpperCase() : "?"}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <p className="text-xs font-bold">{user?.name || "Loading..."}</p>
            <p className="text-xs">{user?.email || ""}</p>
          </div>
        </div>

        <Button
          variant="secondary"
          className="cursor-pointer"
          onClick={handleLogout}
        >
          logout
        </Button>
      </div>

      <CreateTicket />
    </header>
  );
};

export default Header;
