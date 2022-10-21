export function invariant(value: unknown, message: string): asserts value {
  if (!value) {
    const error = new Error(message);
    error.name = "InvariantViolation";
    throw error;
  }
}
