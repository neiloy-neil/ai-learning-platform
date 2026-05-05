
import ProtectedRoute from "@/features/auth/components/protected-route";

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute role="student">
      {children}
    </ProtectedRoute>
  );
}
