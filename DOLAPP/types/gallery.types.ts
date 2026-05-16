export type Gallery = {
  id: number;
  image: string;
  caption: string | null;
  child: number | null;
  group: number | null;
  created_at: string;
  event_date: string;
  type?: "event" | "squad" | "corps";
};
