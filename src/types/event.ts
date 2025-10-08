export interface Event {
  id: string;
  title: string;
  club_id: string | null;
  description: string | null;
  category: string | null;
  tags: string[] | null;
  event_date_time: string;
  venue: string | null;
  created_by: string;
  interested_count: number;
  going_count: number;
  created_at: string;
}
