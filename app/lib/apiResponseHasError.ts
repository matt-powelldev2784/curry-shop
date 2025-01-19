// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const apiResponseHasError = (obj: any): obj is { error: string } => {
  return obj && typeof obj.error === 'string'
}
