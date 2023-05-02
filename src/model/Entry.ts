import { Range, parseRange } from "./Range";

export interface Entry {
  accounts: Range<string>;
  fiscalEstablishments: Range<number>;
  departments: Range<number>;
  costCenters: Range<number>;
  purposes: Range<number>;
  source: string;
}

export function parseEntry(input: string[]): Entry {
  const [account, fiscalEstablishment, department, costCenter, purpose] = input;

  return {
    accounts: parseRange(account, (value) => value),
    fiscalEstablishments: parseRange(fiscalEstablishment, parseNumber),
    departments: parseRange(department, parseNumber),
    costCenters: parseRange(costCenter, parseNumber),
    purposes: parseRange(purpose, parseNumber),
    source: JSON.stringify(input),
  };
}

function parseNumber(value: string): number {
  const result = parseInt(value);
  if (isNaN(result)) return Number.MIN_VALUE;
  return result;
}
