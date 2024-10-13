export type NavigationItem = {
  id: number;
  name: string;
  url: string;
};

export type Answer = {
  id: number;
  answer: string;
  points: number;
};

export type Quiz = {
  id: number;
  question: string;
  weight: number;
  answers: Answer[];
};

export type MentalState = {
  state: string;
  tagline: string;
};

export type User = {
  id: string;
  name: string;
};
