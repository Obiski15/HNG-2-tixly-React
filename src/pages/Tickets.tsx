import { AlertCircle, ArrowLeft, Edit2, Plus, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

import Layout from "../components/Layout";
import CreateTicket from "../components/ticket/create-ticket";
import EditTicket from "../components/ticket/edit-ticket";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";

import DeleteTicket from "../components/ticket/delete-ticket";
import { useTicket } from "../hooks/useTicket";

const Tickets = () => {
  const createTicketRef = useRef<HTMLButtonElement | null>(null);
  const deleteTicketRefs = useRef<{ [id: string]: HTMLButtonElement | null }>(
    {},
  );
  const editTicketRefs = useRef<{ [id: string]: HTMLButtonElement | null }>({});

  const [error, setError] = useState<null | string>(null);
  const { tickets, getTickets, status } = useTicket();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        await getTickets();
      } catch (e) {
        setError((e as unknown as Error).message);
      }
    })();
  }, []);

  const getStatusBadge = (status: string) => {
    const variants = {
      open: "bg-success text-success-foreground",
      in_progress: "bg-warning text-warning-foreground",
      closed: "bg-muted text-muted-foreground",
    };

    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {status.replace("_", " ").toUpperCase()}
      </Badge>
    );
  };

  return (
    <Layout>
      <div className="bg-muted/30 min-h-screen">
        <header className="bg-card border-border border-b">
          <div className="container-app flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/dashboard")}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Ticket Management</h1>
                <p className="text-muted-foreground text-sm">
                  {tickets?.length} total tickets
                </p>
              </div>
            </div>
            <Button
              disabled={status !== "idle"}
              onClick={() => createTicketRef.current?.click()}
            >
              <Plus className="mr-2 h-4 w-4" />
              Create Ticket
            </Button>
          </div>
        </header>

        {status === "isFetching" ? (
          <div className="container-app py-8">
            <div className="flex min-h-[400px] items-center justify-center">
              <div className="text-center">
                <div className="border-primary inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-r-transparent"></div>
                <p className="text-muted-foreground mt-4 text-sm">
                  Loading tickets...
                </p>
              </div>
            </div>
          </div>
        ) : error ? (
          <div className="container-app py-8">
            <Card className="border-destructive/50 shadow-md">
              <CardContent className="py-12 text-center">
                <AlertCircle className="text-destructive mx-auto mb-4 h-12 w-12" />
                <h3 className="mb-2 text-lg font-semibold">
                  Failed to Load Tickets
                </h3>
                <p className="text-muted-foreground mb-4 text-sm">{error}</p>
                <Button
                  onClick={async () => {
                    setError(null);
                    try {
                      await getTickets();
                    } catch (e) {
                      setError((e as unknown as Error).message);
                    }
                  }}
                  variant="outline"
                >
                  Try Again
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="container-app py-8">
            {tickets?.length === 0 ? (
              <Card className="shadow-md">
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground mb-4">No tickets yet</p>
                  <Button onClick={() => createTicketRef.current?.click()}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Your First Ticket
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {tickets?.map((ticket) => (
                  <Card
                    key={ticket.id}
                    className="shadow-md transition-shadow hover:shadow-lg"
                  >
                    <CardHeader>
                      <div className="mb-2 flex items-start justify-between">
                        {getStatusBadge(ticket.status)}
                        <Badge variant="outline">{ticket.priority}</Badge>
                      </div>
                      <CardTitle className="line-clamp-2">
                        {ticket.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-3">
                        {ticket.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-2">
                        <Button
                          onClick={() =>
                            editTicketRefs.current[ticket.id]?.click()
                          }
                          size="sm"
                          variant="outline"
                          className="flex-1"
                        >
                          <Edit2 className="mr-2 h-4 w-4" />
                          Edit
                        </Button>
                        <EditTicket
                          ticket={ticket}
                          ref={
                            ((el) => {
                              editTicketRefs.current[ticket.id] = el;
                            }) as React.Ref<HTMLButtonElement>
                          }
                        />

                        <Button
                          size="sm"
                          variant="destructive"
                          className="flex-1"
                          onClick={() =>
                            deleteTicketRefs.current[ticket.id]?.click()
                          }
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </Button>
                        <DeleteTicket
                          ticket={{ id: ticket.id, title: ticket.title }}
                          ref={
                            ((el) => {
                              deleteTicketRefs.current[ticket.id] = el;
                            }) as React.Ref<HTMLButtonElement>
                          }
                        />
                      </div>
                      <p className="text-muted-foreground mt-3 text-xs">
                        Created{" "}
                        {new Date(ticket.createdAt).toLocaleDateString()}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <CreateTicket ref={createTicketRef} />
    </Layout>
  );
};

export default Tickets;
