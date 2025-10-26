import { createContext, useState, type ReactNode } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import type { LoginInput, SignupInput } from "../schema/auth.schema";
import {
  login as loginService,
  logout as logoutService,
  signup as signupService,
} from "../services/auth.service";

interface Auth {
  status:
    | "isLoggingIn"
    | "isSigningUp"
    | "isLoggingOut"
    | "idle"
    | "isFetchingUser";
  logout: () => Promise<void>;
  login: (data: LoginInput) => Promise<void>;
  signup: (data: SignupInput) => Promise<void>;
}

const AuthContext = createContext<Auth | undefined>(undefined);

function AuthProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<Auth["status"]>("idle");
  const navigate = useNavigate();

  const logout = async () => {
    try {
      setStatus("isLoggingOut");
      await logoutService();
      toast.success("Logged out successfully");
      navigate("/login", { replace: true });
    } catch (e) {
      toast.error((e as unknown as Error).message);
    } finally {
      setStatus("idle");
    }
  };

  const signup = async (data: SignupInput) => {
    try {
      setStatus("isSigningUp");
      await signupService(data);
      toast.success("Account created successfully");
      navigate("/dashboard", { replace: true });
    } catch (e) {
      toast.error((e as unknown as Error).message);
    } finally {
      setStatus("idle");
    }
  };

  const login = async (data: LoginInput) => {
    try {
      setStatus("isLoggingIn");
      await loginService(data);
      toast.success("Logged in successfully");
      navigate("/dashboard", { replace: true });
    } catch (e) {
      toast.error((e as unknown as Error).message);
    } finally {
      setStatus("idle");
    }
  };

  return (
    <AuthContext.Provider value={{ status, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };

export default AuthProvider;
