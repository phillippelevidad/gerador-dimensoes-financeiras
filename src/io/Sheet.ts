import { Entry, parseEntry } from "../model/Entry";
import sheet from "../data/sheet.json";

export function readSheet(): Entry[] {
  const entries: Entry[] = [];
  for (const line of sheet) {
    const entry = parseEntry(line);
    entries.push(entry);
  }
  return entries;
}
