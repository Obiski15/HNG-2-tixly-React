import { CheckCircle2, Clock, TrendingUp, Users } from "lucide-react";
import { useNavigate } from "react-router";

import WavyBackground from "../components/homepage/WavyBackground";
import Layout from "../components/Layout";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <section className="gradient-hero relative overflow-hidden py-20 lg:py-32">
        <div className="container-app relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-primary-foreground mb-6 text-4xl leading-tight font-bold md:text-5xl lg:text-6xl">
              Streamline Your Ticket Management
            </h1>
            <p className="text-primary-foreground/90 mb-8 text-lg leading-relaxed md:text-xl">
              Track, manage, and resolve support tickets efficiently with Tixly.
              Built for teams that value clarity and speed.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                onClick={() => navigate("/signup")}
                className="text-primary bg-white px-8 text-lg shadow-lg hover:bg-white/90"
              >
                Get Started
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/login")}
                className="border-white/30 bg-white/10 px-8 text-lg text-white hover:bg-white/20"
              >
                Login
              </Button>
            </div>
          </div>
        </div>

        <WavyBackground />
      </section>

      <section className="bg-background py-20">
        <div className="container-app">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Everything You Need
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
              Powerful features to help your team stay organized and productive
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="shadow-md transition-shadow hover:shadow-lg">
              <CardHeader>
                <CheckCircle2 className="text-success mb-4 h-12 w-12" />
                <CardTitle>Easy Tracking</CardTitle>
                <CardDescription>
                  Monitor all your tickets in one centralized dashboard
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-md transition-shadow hover:shadow-lg">
              <CardHeader>
                <Clock className="text-warning mb-4 h-12 w-12" />
                <CardTitle>Real-time Updates</CardTitle>
                <CardDescription>
                  Stay informed with instant status changes and notifications
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-md transition-shadow hover:shadow-lg">
              <CardHeader>
                <TrendingUp className="text-primary mb-4 h-12 w-12" />
                <CardTitle>Analytics</CardTitle>
                <CardDescription>
                  Gain insights with comprehensive ticket statistics
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-md transition-shadow hover:shadow-lg">
              <CardHeader>
                <Users className="text-accent mb-4 h-12 w-12" />
                <CardTitle>Team Collaboration</CardTitle>
                <CardDescription>
                  Work together seamlessly on ticket resolution
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-20">
        <div className="container-app relative z-10">
          <Card className="mx-auto max-w-3xl shadow-xl">
            <CardContent className="p-12 text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                Ready to Get Started?
              </h2>
              <p className="text-muted-foreground mb-8 text-lg">
                Join teams who trust Tixly for their support operations
              </p>
              <Button
                size="lg"
                onClick={() => navigate("/signup")}
                className="px-8 text-lg"
              >
                Create Your Account
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default Landing;
