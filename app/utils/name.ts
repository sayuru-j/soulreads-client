export const randomName = () => {
  const adjectives = [
    "Calm",
    "Brave",
    "Wise",
    "Bold",
    "Swift",
    "Silent",
    "Lucky",
    "Clever",
    "Wild",
    "Gentle",
    "Loyal",
    "Bright",
    "Mighty",
    "Sharp",
    "Friendly",
    "Quiet",
    "Quick",
    "Fierce",
    "Sly",
    "Jolly",
  ];

  const animals = [
    "Lion",
    "Tiger",
    "Wolf",
    "Bear",
    "Eagle",
    "Fox",
    "Shark",
    "Falcon",
    "Panther",
    "Dragon",
    "Raven",
    "Owl",
    "Hawk",
    "Phoenix",
    "Leopard",
    "Dolphin",
    "Lynx",
    "Bison",
    "Gorilla",
    "Monkey",
  ];

  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
  const randomNumber = Math.floor(Math.random() * 100);

  return `${randomAdjective}${randomAnimal}${randomNumber}`;
};

export const randomId = () => {
  return Math.random().toString(36).substr(2, 9);
};
