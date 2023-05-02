export interface Range<TValue> {
  type: RangeType;
  value: TValue | TValue[] | FromToRange<TValue>;
  source: string;
}

export enum RangeType {
  Single = "single",
  Multiple = "multiple",
  FromTo = "fromTo",
  Any = "any",
  Blank = "blank",
}

export type FromToRange<TValue> = [TValue, TValue];

export function parseRange<TValue>(
  input: string,
  valueParser: (value: string) => TValue
): Range<TValue> {
  if (input.includes("..")) {
    const [start, end] = input.split("..");
    return {
      type: RangeType.FromTo,
      value: [valueParser(start), valueParser(end)],
      source: input,
    };
  }

  if (input.includes("!")) {
    return {
      type: RangeType.Blank,
      value: valueParser(""),
      source: input,
    };
  }

  if (input.includes("*")) {
    return {
      type: RangeType.Any,
      value: valueParser("*"),
      source: input,
    };
  }

  if (input.includes(";")) {
    const values = input.split(";");
    return {
      type: RangeType.Multiple,
      value: values.map(valueParser),
      source: input,
    };
  }

  return {
    type: RangeType.Single,
    value: valueParser(input),
    source: input,
  };
}
