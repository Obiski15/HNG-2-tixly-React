import { useNavigate } from "react-router";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="bg-muted/30 flex min-h-screen flex-col items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-primary mb-4 text-9xl font-bold">404</h1>
        <h2 className="mb-4 text-3xl font-semibold">Page Not Found</h2>
        <p className="text-muted-foreground mb-8 text-lg">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center rounded-md px-6 py-3 text-base font-medium transition-colors"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
}

export default NotFound;
