export interface INewsEntityProps {
  _id?: string;
  title?: string;
  description?: string;
  date?: string;
  link?: string;
  sentiment?: {
    positive?: number;
    neutral?: number;
    negative?: number;
  };
}
