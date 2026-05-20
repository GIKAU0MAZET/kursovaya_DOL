export type Alert = {
  id: number;
  child_id: number;
  child_name: string;
  temp: number;
  created_at: string;
  severity: "warning" | "critical";
};
