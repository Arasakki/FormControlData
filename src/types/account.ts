export type LabelItem = { text: string };

export interface Account {
  id: string;
  labels: LabelItem[];
  labelsRaw?: string;
  type: "LOCAL" | "LDAP";
  login: string;
  password: string | null;
}
