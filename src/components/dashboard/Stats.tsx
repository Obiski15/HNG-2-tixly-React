import { CheckCircle2, Clock, Ticket, XCircle } from "lucide-react";
import { useEffect, useState } from "react";

import { useTicket } from "../../hooks/useTicket";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";

function Stats() {
  const [error, setError] = useState("");
  const { stats, status, getTickets } = useTicket();

  useEffect(() => {
    (async () => {
      try {
        await getTickets();
      } catch (e) {
        setError((e as unknown as Error).message);
      }
    })();
  }, []);

  return status === "isFetching" ? (
    "isFetching"
  ) : error ? (
    "An error occurred"
  ) : (
    <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card className="shadow-md">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
          <Ticket className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{stats.total}</div>
          <p className="text-muted-foreground mt-1 text-xs">All time</p>
        </CardContent>
      </Card>

      <Card className="shadow-md">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
          <CheckCircle2 className="text-success h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-success text-3xl font-bold">{stats.open}</div>
          <p className="text-muted-foreground mt-1 text-xs">Awaiting action</p>
        </CardContent>
      </Card>

      <Card className="shadow-md">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">In Progress</CardTitle>
          <Clock className="text-warning h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-warning text-3xl font-bold">
            {stats.inProgress}
          </div>
          <p className="text-muted-foreground mt-1 text-xs">Being worked on</p>
        </CardContent>
      </Card>

      <Card className="shadow-md">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Closed Tickets</CardTitle>
          <XCircle className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground text-3xl font-bold">
            {stats.closed}
          </div>
          <p className="text-muted-foreground mt-1 text-xs">Resolved</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default Stats;
