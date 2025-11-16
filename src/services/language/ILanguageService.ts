export interface Locale {
  localeFull: string;
  localeShort: string;
  translation: Record<string, string>;
}

export default interface ILanguageService {
  getCurrentLocale(): Locale;
  translate(key: string, options?: any): string;
}
