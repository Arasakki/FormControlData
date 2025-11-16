import { createContext, useEffect, useState, type ReactNode } from "react";
import LanguageServiceImpl from "../../services/language/LanguageServiceImpl";
import type ILanguageService from "../../services/language/ILanguageService";
import LoaderComponent from "../../components/ui/LoaderComponent";

const LanguageContext = createContext<ILanguageService | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [languageService, setLanguageService] =
    useState<ILanguageService | null>(null);

  useEffect(() => {
    const service = new LanguageServiceImpl();
    service
      .loadTranslations()
      .then(() => {
        setLanguageService(service);
      })
      .catch(() => {
        setLanguageService(service);
      });
  }, []);

  if (!languageService) {
    return <LoaderComponent />;
  }

  return (
    <LanguageContext.Provider value={languageService}>
      {children}
    </LanguageContext.Provider>
  );
}

export default LanguageContext;
