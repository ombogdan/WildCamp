import { format, isValid, parse, parseISO } from 'date-fns';

export function dateFormat(
  date?: string | Date | null,
  fmt: string = 'dd/MM/yyyy'
): string {
  if (!date) return '';

  let d: Date;

  if (date instanceof Date) {
    d = date;
  } else if (typeof date === 'string') {
    // якщо рядок схожий на ISO
    if (/^\d{4}-\d{2}-\d{2}/.test(date)) {
      d = parseISO(date);
    }
    // якщо рядок схожий на "dd/MM/yyyy"
    else if (/^\d{2}\/\d{2}\/\d{4}$/.test(date)) {
      d = parse(date, 'dd/MM/yyyy', new Date());
    }
    // fallback
    else {
      d = new Date(date);
    }
  } else {
    return '';
  }

  if (!isValid(d)) return '';
  return format(d, fmt);
}
