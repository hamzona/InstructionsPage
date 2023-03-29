import { useContext } from "react";
import { ProfilContext } from "../contexts/ProfilContext";

export default function useProfilContext() {
  const context = useContext(ProfilContext);
  if (!context) {
    throw Error("context is null");
  }
  return context;
}
