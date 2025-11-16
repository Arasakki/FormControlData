export function parseLabels(raw?: string) {
  if (!raw) return [];
  return raw
    .split(";")
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
    .map((text) => ({ text }));
}

export function labelsToRaw(labels: { text: string }[]) {
  return labels.map((l) => l.text).join("; ");
}
