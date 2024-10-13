import { AvatarGenerator } from "random-avatar-generator";
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
  const generator = new AvatarGenerator();
  const avatar = generator.generateRandomAvatar();


  saveToLocalStorage("user", {
    id,
    name,
    avatar
  });
};

export const loadUser = () => {
  const user = loadFromLocalStorage("user");
  return user ? user : null;
};

export const deleteUser = () => {
  removeFromLocalStorage("user");
};
