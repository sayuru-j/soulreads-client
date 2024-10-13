export type NavigationItem = {
  id: number;
  name: string;
  url: string;
};

export type Quiz = {
  id: number;
  question: string;
  answers: {
    id: number;
    answer: string;
    points: number;
  }[];
};

export type MentalState = {
  state: string;
  tagline: string;
};
