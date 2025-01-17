// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isValidCartItem = (item: any) => {
  return (
    typeof item.id === 'string' &&
    typeof item.name === 'string' &&
    typeof item.quantity === 'number' &&
    typeof item.price === 'number' &&
    typeof item.imageUrl === 'string'
  )
}
