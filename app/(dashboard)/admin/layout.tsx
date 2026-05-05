
import ProtectedRoute from "@/features/auth/components/protected-route";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute role="admin">
      {children}
    </ProtectedRoute>
  );
}
