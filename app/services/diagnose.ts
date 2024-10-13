import { MentalState, User } from "../@types";
import {
  loadFromLocalStorage,
  removeFromLocalStorage,
  saveToLocalStorage,
} from "../utils/ls";

export const saveDiagnosis = (info: { user: User; diagnosis: MentalState }) => {
  const existingDiagnosisInfo = loadFromLocalStorage("diagnosis");
  return existingDiagnosisInfo
    ? undefined
    : saveToLocalStorage("diagnosis", info);
};

export const loadDiagnosis = () => {
  const existingDiagnosisInfo = loadFromLocalStorage("diagnosis");

  return existingDiagnosisInfo?.diagnosis
    ? existingDiagnosisInfo?.diagnosis
    : undefined;
};

export const deleteDiagnosis = () => {
  removeFromLocalStorage("diagnosis");
};
