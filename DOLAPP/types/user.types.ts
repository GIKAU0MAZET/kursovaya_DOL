export type UserRole = "parent" | "educator" | "medic";

export type User = {
  id: string;
  email: string;
  username?: string;
  role: UserRole;
};
