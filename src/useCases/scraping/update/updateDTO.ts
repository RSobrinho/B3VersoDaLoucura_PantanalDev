export interface UpdateDTO {
  id: string;
  title?: string;
  description?: string;
  date?: string;
  link?: string;
  sentiment?: {
    positive: number;
    neutral: number;
    negative: number;
  };
}
