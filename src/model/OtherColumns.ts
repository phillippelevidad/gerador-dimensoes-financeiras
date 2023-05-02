import otherColumns from "../data/otherColumns.json";

export function listValidIdsByType<TValue>(type: string): TValue[] {
  const typedColumns = otherColumns as unknown as { [key: string]: TValue }[];
  const ids: TValue[] = [];
  for (const line of typedColumns.filter((line) => type in line)) {
    ids.push(line[type]);
  }
  return ids;
}
