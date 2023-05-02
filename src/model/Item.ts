import { listValidIdsByType } from "./OtherColumns";
import { Range, RangeType, FromToRange } from "./Range";

export function listMatchingItems<TValue>(
  range: Range<TValue>,
  otherColumnsFilter: string,
  blankItemValue: TValue
): TValue[] {
  const matchingItems: TValue[] = [];
  const validItems = listValidIdsByType<TValue>(otherColumnsFilter);
  for (const item of validItems) {
    if (isItemInRange(item, range, blankItemValue)) {
      matchingItems.push(item);
    }
  }
  return matchingItems;
}

function isItemInRange<TValue>(
  item: TValue,
  range: Range<TValue>,
  blankItemValue: TValue
): boolean {
  switch (range.type) {
    case RangeType.Single:
      return item === range.value;
    case RangeType.Multiple:
      return (range.value as TValue[]).includes(item);
    case RangeType.FromTo:
      return isInFromToRange(item, range.value as FromToRange<TValue>);
    case RangeType.Any:
      return true;
    case RangeType.Blank:
      return item === blankItemValue;
  }
}

function isInFromToRange<TValue>(
  item: TValue,
  fromToRange: FromToRange<TValue>
): boolean {
  const [from, to] = fromToRange;
  return item >= from && item <= to;
}
