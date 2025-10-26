import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { signupSchema, type SignupInput } from "../../schema/auth.schema";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

function SignupForm() {
  const form = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
  });
  const { status, signup } = useAuth();

  const handleSignup: SubmitHandler<SignupInput> = async (values) => {
    await signup(values);
  };

  return (
    <form onSubmit={form.handleSubmit(handleSignup)} className="space-y-4">
      <div className="space-y-2">
        <div>
          <Label htmlFor="name">Name</Label>
        </div>
        <Input
          id="name"
          type="text"
          placeholder="John Doe"
          {...form.register("name")}
          aria-invalid={!!form.formState.errors.name}
        />
        {form.formState.errors.name && (
          <p className="text-destructive text-sm">
            {form.formState.errors.name.message}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <div>
          <Label htmlFor="signup-email">Email</Label>
        </div>
        <Input
          id="signup-email"
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
          <Label htmlFor="signup-password">Password</Label>
        </div>
        <Input
          id="signup-password"
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
      <div className="space-y-2">
        <div>
          <Label htmlFor="confirm-password">Confirm Password</Label>
        </div>
        <Input
          id="confirm-password"
          type="password"
          placeholder="••••••••"
          {...form.register("confirmPassword")}
          aria-invalid={!!form.formState.errors.confirmPassword}
        />
        {form.formState.errors.confirmPassword && (
          <p className="text-destructive text-sm">
            {form.formState.errors.confirmPassword.message}
          </p>
        )}
      </div>
      <Button
        disabled={status === "isSigningUp"}
        type="submit"
        className="w-full"
      >
        {status === "isSigningUp" ? "Creating account..." : "Sign Up"}
      </Button>
      <div className="text-primary text-center text-sm">
        <span>Already have an account? </span>
        <Link to="/login" type="button" className="hover:underline">
          Login
        </Link>
      </div>
    </form>
  );
}

export default SignupForm;
