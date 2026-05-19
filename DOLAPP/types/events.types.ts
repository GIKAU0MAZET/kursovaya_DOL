export type EventStats = {
  attended: number;
  total: number;
  activity: number;
};

export type AttendanceStatus = "attended" | "absent" | null;

export type EventAttendanceItem = {
  child_id: number;
  name: string;
  status: AttendanceStatus;
};
