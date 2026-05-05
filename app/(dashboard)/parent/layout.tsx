
import ProtectedRoute from "@/features/auth/components/protected-route";

export default function ParentLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute role="parent">
      {children}
    </ProtectedRoute>
  );
}
