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

export type State =
  | "Depression"
  | "Suicidal"
  | "Anxiety"
  | "Stress"
  | "Bipolar"
  | "Personality disorder"
  | "Normal";

export type MentalState = {
  state: State;
  tagline: string;
};

export type User = {
  id: string;
  name: string;
  avatar :string;
};

export type BookInfoBrief = {
  title: string;
  authors: string;
  categories: string;
  isbn: string;
  predicted_status?: string;
};

export type BookInfo = {
  title: string;
  authors: string[];
  description: string;
  image_url: string;
  published_date: string;
  categories: string[];
  page_count: number;
};
