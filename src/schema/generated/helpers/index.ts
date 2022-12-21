// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

export function getEnumValues<T>(enumType: T): Array<string> {
  return [
    ...new Set(
      Object.entries(enumType)
        .filter(([key]) => !~~key)
        .flatMap((item) => item)
    ),
  ]
}
