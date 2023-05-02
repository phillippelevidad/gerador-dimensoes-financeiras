import { listMatchingItems } from "./Item";
import { Range } from "./Range";

export const BLANK_DEPARTMENT = NaN;

export function listMatchingDepartments(
  deparmentRange: Range<number>
): number[] {
  return listMatchingItems(deparmentRange, "B_Departamento", BLANK_DEPARTMENT);
}
