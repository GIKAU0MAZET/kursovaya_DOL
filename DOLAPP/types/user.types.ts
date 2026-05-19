export type UserRole = "parent" | "counselor" | "medic" | "admin";

export type User = {
  id: string;
  email: string;
  username?: string;
  role: UserRole;
};
