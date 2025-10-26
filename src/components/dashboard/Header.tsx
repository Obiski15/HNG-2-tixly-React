import { LogOut } from "lucide-react";

import { useAuth } from "../../hooks/useAuth";

import { useUser } from "../../hooks/useUser";
import { Button } from "../ui/button";

function Header() {
  const { logout, status } = useAuth();
  const { user } = useUser();

  return (
    <header className="bg-card border-border border-b">
      <div className="container-app flex items-center justify-between py-4">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground text-sm">
            Welcome back, {user?.name ?? "User"}
          </p>
        </div>
        <Button
          disabled={status === "isLoggingOut"}
          variant="outline"
          onClick={async () => {
            await logout();
          }}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </header>
  );
}

export default Header;
