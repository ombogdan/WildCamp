export default function searchItemUtils<T>(
  searchText: string,
  data: T[],
  fieldOrFields: keyof T | string | Array<keyof T | string>,
  nestedField?: keyof T | string
): T[] {
  const query = (searchText ?? '').toString().trim().toLowerCase();
  if (!query) return data;

  const fields = Array.isArray(fieldOrFields) ? fieldOrFields : [fieldOrFields];

  return data.filter((item) => {
    const container: any = nestedField ? (item as any)?.[nestedField as any] : item;
    if (!container) return false;

    for (const f of fields) {
      const v = container?.[f as any];
      if (v == null) continue;
      const s = typeof v === 'string' ? v : String(v);
      if (s.toLowerCase().includes(query)) return true;
    }
    return false;
  });
}
