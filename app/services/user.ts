import {
  loadFromLocalStorage,
  removeFromLocalStorage,
  saveToLocalStorage,
} from "../utils/ls";
import { randomId, randomName } from "../utils/name";

export const createUser = () => {
  const existinguser = loadFromLocalStorage("user");

  if (existinguser) {
    return;
  }

  const id = randomId();
  const name = randomName();

  saveToLocalStorage("user", {
    id: id,
    name: name,
  });
};

export const loadUser = () => {
  const user = loadFromLocalStorage("user");
  return user ? user : null;
};

export const deleteUser = () => {
  removeFromLocalStorage("user");
};
