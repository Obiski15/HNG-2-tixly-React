import type { LoginInput, SignupInput } from "../schema/auth.schema";
import type { User } from "../types";
import { handleAPIError } from "../utils/handleAPIError";

const BASE_URL = import.meta.env.VITE_API_URL;

export const login = async (data: LoginInput) => {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const result = await res.json();

  if (!res.ok) return handleAPIError(result);

  return result;
};

export const signup = async (data: SignupInput) => {
  const res = await fetch(`${BASE_URL}/signup`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const result = await res.json();

  if (!res.ok) return handleAPIError(result);

  return result;
};

export const logout = async () => {
  const res = await fetch(`${BASE_URL}/logout`, {
    method: "POST",
    credentials: "include",
  });

  const result = await res.json();

  if (!res.ok) return handleAPIError(result);

  return result;
};

export const authenticate = async () => {
  const res = await fetch(`${BASE_URL}/authenticate`, {
    method: "POST",
    credentials: "include",
  });

  const result = await res.json();

  if (!res.ok) return handleAPIError(result);

  return result as { isAuthenticated: boolean; user: User | null };
};
