import { Ticket } from "lucide-react";
import { useRef } from "react";
import { useNavigate } from "react-router";

import Header from "../components/dashboard/Header";
import Stats from "../components/dashboard/Stats";
import Layout from "../components/Layout";
import CreateTicket from "../components/ticket/create-ticket";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";

const Dashboard = () => {
  const createTicketRef = useRef<HTMLButtonElement | null>(null);
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="bg-muted/30 min-h-screen">
        <Header />

        <div className="container-app py-8">
          <Stats />

          {/* Quick Actions */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Manage your tickets efficiently</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button onClick={() => navigate("/tickets")} className="flex-1">
                  <Ticket className="mr-2 h-4 w-4" />
                  View All Tickets
                </Button>
                <Button
                  onClick={() => createTicketRef.current?.click()}
                  variant="outline"
                  className="flex-1"
                >
                  Create New Ticket
                </Button>
                <CreateTicket ref={createTicketRef} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
