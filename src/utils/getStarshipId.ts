export function getStarshipIdFromUrl(url: string): string {
  return url.split("/")[5];
}
