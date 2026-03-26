const DATE_ONLY_REGEX = /^\d{4}-\d{2}-\d{2}$/;

const DATE_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

export function formatPostDate(value: string, locale = "es-ES"): string {
  if (DATE_ONLY_REGEX.test(value)) {
    const [year, month, day] = value.split("-").map(Number);
    return new Intl.DateTimeFormat(locale, DATE_FORMAT_OPTIONS).format(
      new Date(year, month - 1, day, 12),
    );
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat(locale, DATE_FORMAT_OPTIONS).format(date);
}
