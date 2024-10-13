import { MentalState } from "../@types";

export const calculateMentalStateAndProvideTagLine = (
  score: number
): MentalState => {
  let diagnosedState: string;
  let tagline: string;

  if (score <= 20) {
    diagnosedState = "Depression";
    tagline =
      "It seems like you're going through a tough time with feelings of depression. It's important to know that help is available.";
  } else if (score <= 40) {
    diagnosedState = "Suicidal";
    tagline =
      "Your responses indicate you may be feeling overwhelmed by suicidal thoughts. Please reach out to a professional, friend, or helpline immediately.";
  } else if (score <= 50) {
    diagnosedState = "Anxiety";
    tagline =
      "It looks like you may be experiencing some anxiety. Remember, it's okay to seek help if you're feeling overwhelmed.";
  } else if (score <= 60) {
    diagnosedState = "Stress";
    tagline =
      "It appears that stress may be affecting you. Remember to take breaks and focus on self-care when possible.";
  } else if (score <= 70) {
    diagnosedState = "Bipolar";
    tagline =
      "Your results suggest you may be experiencing some mood swings associated with bipolar disorder. A professional can provide more clarity and support.";
  } else if (score <= 80) {
    diagnosedState = "Personality Disorder";
    tagline =
      "Your results show signs that might be associated with a personality disorder. It's always helpful to talk to a professional for guidance.";
  } else {
    diagnosedState = "Normal";
    tagline =
      "You seem to be in a balanced state of mind. Keep up with your self-care and well-being practices!";
  }

  return { state: diagnosedState, tagline };
};
