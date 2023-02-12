export function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message
  return String(error)
}

export function getErrorStack(error: unknown) {
  if (error instanceof Error) return error.stack
  return String(error)
}

export const logError = ({
  error,
  label,
}: {
  error: unknown
  label?: string
}) => {
  const stack = getErrorMessage(error)

  console.log('🚫', label, stack)
}
