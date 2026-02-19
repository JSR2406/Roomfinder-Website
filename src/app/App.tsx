import { RouterProvider } from "react-router";
import { router } from "./routes";
import { AuthProvider } from "./data/auth";
import { MessagingProvider } from "./data/messaging";

export default function App() {
  return (
    <AuthProvider>
      <MessagingProvider>
        <RouterProvider router={router} />
      </MessagingProvider>
    </AuthProvider>
  );
}
