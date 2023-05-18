export interface CreateDTO {
  automatic?: {
    link: string;
  };
  manual?: {
    title: string;
    description: string;
    date: string;
    link: string;
    sentiment: {
      positive: number;
      neutral: number;
      negative: number;
    };
  };
}
