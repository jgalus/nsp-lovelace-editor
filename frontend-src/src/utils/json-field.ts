export function parseOptionalJsonObject(
  raw: string,
  fieldLabel: string
): { value: Record<string, unknown> | undefined; error: string | null } {
  const trimmed = raw.trim();

  if (!trimmed) {
    return { value: undefined, error: null };
  }

  try {
    const parsed: unknown = JSON.parse(trimmed);
    if (
      typeof parsed !== "object" ||
      parsed === null ||
      Array.isArray(parsed)
    ) {
      return {
        value: undefined,
        error: `${fieldLabel} must be a JSON object.`,
      };
    }

    return {
      value:
        Object.keys(parsed).length > 0
          ? (parsed as Record<string, unknown>)
          : undefined,
      error: null,
    };
  } catch {
    return {
      value: undefined,
      error: `${fieldLabel} must be valid JSON.`,
    };
  }
}
