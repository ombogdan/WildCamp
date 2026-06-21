// pivot визначає, які двозначні роки вважати 19xx/20xx.
// Напр., pivot=50 => 00–49 → 2000–2049, 50–99 → 1950–1999
const TWO_DIGIT_YEAR_PIVOT = 50;

function parseDmyString(s: string): Date | null {
  // Підтримка dd/MM/yy, dd/MM/yyyy, а також роздільників . і -
  const m = s.trim().match(
    /^(\d{1,2})[\/.\-](\d{1,2})[\/.\-](\d{2}|\d{4})(?:[ T](\d{1,2}):(\d{2})(?::(\d{2}))?)?$/
  );
  if (!m) return null;

  let [, dStr, mStr, yStr, hh = '0', mm = '0', ss = '0'] = m;
  const day = Number(dStr);
  const mon = Number(mStr);
  let year = Number(yStr);

  if (yStr.length === 2) {
    year = year <= TWO_DIGIT_YEAR_PIVOT ? 2000 + year : 1900 + year;
  }

  // Перевірка валідності
  if (!(year >= 1 && mon >= 1 && mon <= 12 && day >= 1 && day <= 31)) return null;

  const date = new Date(year, mon - 1, day, Number(hh), Number(mm), Number(ss));
  return isNaN(date.getTime()) ? null : date;
}

export function toDate(input: unknown): Date | null {
  if (input == null || input === '') return null;

  // Уже Date
  if (input instanceof Date) {
    return isNaN(input.getTime()) ? null : input;
  }

  // Число: сек чи мс
  if (typeof input === 'number') {
    const ms = input < 1e12 ? input * 1000 : input; // <1e12 => в секундах
    const d = new Date(ms);
    return isNaN(d.getTime()) ? null : d;
  }

  // Рядок: спочатку спробуємо нативний парсер (ISO тощо),
  // якщо ні — наш dd/MM/yy парсер
  if (typeof input === 'string') {
    const iso = new Date(input);
    if (!isNaN(iso.getTime())) return iso;

    const dmy = parseDmyString(input);
    if (dmy) return dmy;

    return null;
  }

  // Невідомий тип
  return null;
}
