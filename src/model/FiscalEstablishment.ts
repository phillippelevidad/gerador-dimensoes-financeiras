import { listMatchingItems } from "./Item";
import { Range } from "./Range";

export const BLANK_FISCAL_ESTABLISHMENT = Number.MIN_VALUE;

export function listMatchingFiscalEstablishments(
  fiscalEstablishmentRange: Range<number>
): number[] {
  return listMatchingItems(
    fiscalEstablishmentRange,
    "A_EstabelecimentoFiscal",
    BLANK_FISCAL_ESTABLISHMENT
  );
}
