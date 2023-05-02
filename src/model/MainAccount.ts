import { FromToRange, Range, RangeType } from "./Range";
import validAccounts from "../data/mainAccount.json";

export function listMatchingAccounts(accountRange: Range<string>): string[] {
  const matchingAccounts: string[] = [];
  for (const account of validAccounts) {
    if (isAccountInRange(account, accountRange)) {
      matchingAccounts.push(account);
    }
  }
  return matchingAccounts;
}

function isAccountInRange(mainAccount: string, range: Range<string>): boolean {
  switch (range.type) {
    case RangeType.Single:
      return mainAccount === range.value;
    case RangeType.Multiple:
      return range.value.includes(mainAccount);
    case RangeType.FromTo:
      return isMainAccountInFromToRange(
        mainAccount,
        range.value as FromToRange<string>
      );
    case RangeType.Any:
      return true;
    case RangeType.Blank:
      return mainAccount === "";
  }
}

function isMainAccountInFromToRange(
  mainAccount: string,
  fromToRange: FromToRange<string>
): boolean {
  const [from, to] = fromToRange;
  return mainAccount >= from && mainAccount <= to;
}
