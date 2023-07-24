export function capitalizeFirstLetter(str: string): string {
  const firstLetter = str.charAt(0);

  return str.replace(firstLetter, firstLetter.toUpperCase());
}
