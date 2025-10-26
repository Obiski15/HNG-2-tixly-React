import { useContext } from "react";
import { AuthContext } from "../providers/auth.provider";

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context)
    throw new Error("Auth context is being accessed outside of it's provider");

  return context;
};
