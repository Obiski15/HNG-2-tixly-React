import { useContext } from "react";
import { UserContext } from "../components/auth/protect";

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context)
    throw new Error("User context is being accessed outside of it's provider");

  return context;
};
