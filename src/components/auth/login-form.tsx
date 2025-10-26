import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { loginSchema, type LoginInput } from "../../schema/auth.schema";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

function LoginForm() {
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });
  const { login, status } = useAuth();

  const handleLogin: SubmitHandler<LoginInput> = async (values) => {
    await login(values);
  };

  return (
    <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4">
      <div className="space-y-2">
        <div>
          <Label htmlFor="email">Email</Label>
        </div>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          {...form.register("email")}
          aria-invalid={!!form.formState.errors.email}
        />
        {form.formState.errors.email && (
          <p className="text-destructive text-sm">
            {form.formState.errors.email.message}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <div>
          <Label htmlFor="password">Password</Label>
        </div>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          {...form.register("password")}
          aria-invalid={!!form.formState.errors.password}
        />
        {form.formState.errors.password && (
          <p className="text-destructive text-sm">
            {form.formState.errors.password.message}
          </p>
        )}
      </div>
      <Button
        disabled={status === "isLoggingIn"}
        type="submit"
        className="w-full"
      >
        {status === "isLoggingIn" ? "Logging in..." : "Login"}
      </Button>
      <div className="text-primary text-center text-sm">
        <span>Don't have an account? </span>
        <Link to="/signup" className="hover:underline">
          Sign up
        </Link>
      </div>
    </form>
  );
}

export default LoginForm;
