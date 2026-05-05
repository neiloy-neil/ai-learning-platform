
import ProtectedRoute from "@/features/auth/components/protected-route";

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute role="teacher">
      {children}
    </ProtectedRoute>
  );
}
