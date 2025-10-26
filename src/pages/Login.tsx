import { LogIn } from "lucide-react";
import LoginForm from "../components/auth/login-form";
import Layout from "../components/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";

export default function Login() {
  return (
    <Layout showFooter={false}>
      <div className="wave-bg flex min-h-screen items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="space-y-1">
            <div className="mb-2 flex items-center gap-2">
              <LogIn className="text-primary h-6 w-6" />

              <CardTitle className="text-2xl">Welcome Back</CardTitle>
            </div>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
