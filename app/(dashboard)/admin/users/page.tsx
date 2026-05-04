import type { Metadata } from "next";
import UserManagementView from "@/features/admin-dashboard/components/user-management-view";

export const metadata: Metadata = {
  title: "User Management | PCDC AI",
  description: "Manage platform users, roles, and permissions",
};

export default function AdminUsersPage() {
  return <UserManagementView />;
}
