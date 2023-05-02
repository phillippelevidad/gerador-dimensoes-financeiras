import { listMatchingItems } from "./Item";
import { Range } from "./Range";

export const BLANK_COST_CENTER = NaN;

export function listMatchingCostCenters(
  costCenterRange: Range<number>
): number[] {
  return listMatchingItems(costCenterRange, "C_CentroCusto", BLANK_COST_CENTER);
}
