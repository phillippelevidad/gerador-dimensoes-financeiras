import { Entry } from "./model/Entry";
import { listMatchingAccounts } from "./model/MainAccount";
import { listMatchingCostCenters } from "./model/CostCenter";
import { listMatchingPurposes } from "./model/Purpose";
import { readSheet } from "./io/Sheet";
import { writeFile } from "./io/Output";
import { listMatchingFiscalEstablishments } from "./model/FiscalEstablishment";

export function processFile(): void {
  const entries = readSheet();

  generateColumnAByColumnB(
    entries,
    (entry) => listMatchingAccounts(entry.accounts),
    (entry) => listMatchingCostCenters(entry.costCenters),
    "1.accountsByCostCenters.json"
  );

  generateColumnAByColumnB(
    entries,
    (entry) => listMatchingAccounts(entry.accounts),
    (entry) => listMatchingPurposes(entry.purposes),
    "2.accountsByPurpose.json"
  );

  generateColumnAByColumnB(
    entries,
    (entry) => listMatchingAccounts(entry.accounts),
    (entry) => listMatchingFiscalEstablishments(entry.fiscalEstablishments),
    "3.accountsByFiscalEstablishment.json"
  );

  generateColumnAByColumnB(
    entries,
    (entry) => [
      ...new Set(
        listMatchingAccounts(entry.accounts).flatMap((_) =>
          listMatchingCostCenters(entry.costCenters)
        )
      ),
    ],
    (entry) => [
      ...new Set(
        listMatchingAccounts(entry.accounts).flatMap((_) =>
          listMatchingPurposes(entry.purposes)
        )
      ),
    ],
    "4.costCentersByPurposes.json"
  );

  generateColumnAByColumnB(
    entries,
    (entry) => [
      ...new Set(
        listMatchingAccounts(entry.accounts).flatMap((_) =>
          listMatchingFiscalEstablishments(entry.fiscalEstablishments)
        )
      ),
    ],
    (entry) => [
      ...new Set(
        listMatchingAccounts(entry.accounts).flatMap((_) =>
          listMatchingCostCenters(entry.costCenters)
        )
      ),
    ],
    "5.fiscalEstablishmentsByCostCenters.json"
  );

  generateColumnAByColumnB(
    entries,
    (entry) => [
      ...new Set(
        listMatchingAccounts(entry.accounts).flatMap((_) =>
          listMatchingFiscalEstablishments(entry.fiscalEstablishments)
        )
      ),
    ],
    (entry) => [
      ...new Set(
        listMatchingAccounts(entry.accounts).flatMap((_) =>
          listMatchingPurposes(entry.purposes)
        )
      ),
    ],
    "6.fiscalEstablishmentsByPurposes.json"
  );
}

type ColumnGeneratorFunction = (entry: Entry) => unknown[];

function generateColumnAByColumnB(
  entries: Entry[],
  generateColumnA: ColumnGeneratorFunction,
  generateColumnB: ColumnGeneratorFunction,
  fileName: string
): void {
  console.log("Processing", fileName);
  const output: Array<[unknown, unknown, string]> = [];
  for (const entry of entries) {
    const bItems = generateColumnB(entry);
    for (const a of generateColumnA(entry)) {
      for (const b of bItems) {
        output.push([a, b, entry.source]);
      }
    }
  }
  writeFile(fileName, output);
}
