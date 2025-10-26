import { UserPlus } from "lucide-react";
import SignupForm from "../components/auth/sigup-form";
import Layout from "../components/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";

export default function Signup() {
  return (
    <Layout showFooter={false}>
      <div className="wave-bg flex min-h-screen items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="space-y-1">
            <div className="mb-2 flex items-center gap-2">
              <UserPlus className="text-primary h-6 w-6" />
              <CardTitle className="text-2xl">Create Account</CardTitle>
            </div>
            <CardDescription>
              Sign up to start managing your tickets
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignupForm />
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
