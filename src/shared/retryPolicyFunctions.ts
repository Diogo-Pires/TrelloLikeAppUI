export const appCallMaxNumberOfRetries = 3;
export const ExponentialBackoff = (attempt: number) => Math.min(1000 * 2 ** attempt, 3000)