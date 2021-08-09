export function sleep(time = 250): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, time));
}
