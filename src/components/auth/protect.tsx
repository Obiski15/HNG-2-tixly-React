import { createContext, useEffect, useState, type ReactNode } from "react";

import { useNavigate } from "react-router";
import { toast } from "sonner";
import { authenticate as authenticateService } from "../../services/auth.service";
import type { User } from "../../types";

const UserContext = createContext<{ user: User | null } | undefined>(undefined);

function Protect({ children }: { children: ReactNode }) {
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<null | User>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const authenticate = async () => {
      try {
        setIsAuthenticating(true);
        const data = await authenticateService();
        if (!data.isAuthenticated) {
          navigate("/login", { replace: true });
          toast.error("You must be logged in to access this page.");
          return;
        }
        setIsAuthenticated(data.isAuthenticated);
        setUser(data.user);
      } catch (e) {
        setIsAuthenticated(false);
        navigate("/login", { replace: true });
        toast.error((e as unknown as Error).message);
      } finally {
        setIsAuthenticating(false);
      }
    };

    authenticate();
  }, [navigate]);

  if (isAuthenticating)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
          <p className="text-muted-foreground mt-4 text-sm">Loading...</p>
        </div>
      </div>
    );

  if (!isAuthenticated) return;

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
}

export { UserContext };

export default Protect;
