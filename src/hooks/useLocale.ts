import { useContext } from "react";
import LanguageContext from "./context/LanguageContext";
import type ILanguageService from "../services/language/ILanguageService";

export default function useLocale(): ILanguageService {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLocale must be used within a LanguageProvider");
  }
  return context;
}
