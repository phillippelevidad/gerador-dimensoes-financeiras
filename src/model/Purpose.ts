import { listMatchingItems } from "./Item";
import { Range } from "./Range";

export const BLANK_PURPOSE = NaN;

export function listMatchingPurposes(purposeRange: Range<number>): number[] {
  return listMatchingItems(purposeRange, "D_Finalidade", BLANK_PURPOSE);
}
