import { createBrowserRouter, RouterProvider } from "react-router";

import { Toaster } from "./components/ui/sonner";

import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import NotFound from "./pages/not_found";
import Signup from "./pages/Signup";
import Tickets from "./pages/Tickets";

import Protect from "./components/auth/protect";
import AuthProvider from "./providers/auth.provider";
import TicketProvider from "./providers/ticket.provider";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Landing /> },
    {
      path: "/login",
      element: (
        <AuthProvider>
          <Login />
        </AuthProvider>
      ),
    },
    {
      path: "/signup",
      element: (
        <AuthProvider>
          <Signup />
        </AuthProvider>
      ),
    },
    {
      path: "/dashboard",
      element: (
        <Protect>
          <AuthProvider>
            <TicketProvider>
              <Dashboard />
            </TicketProvider>
          </AuthProvider>
        </Protect>
      ),
    },
    {
      path: "/tickets",
      element: (
        <Protect>
          <AuthProvider>
            <TicketProvider>
              <Tickets />
            </TicketProvider>
          </AuthProvider>
        </Protect>
      ),
    },

    { path: "*", element: <NotFound /> },
  ]);

  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
