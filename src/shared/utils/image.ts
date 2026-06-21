// Можна винести у файл helpers/image.ts
const PLACEHOLDER_PATHS = new Set<string>([
  'storage/img/photo-empty.jpg',
  'img/no-image-stock.svg',
]);

/** Чи це справжня картинка, а не заглушка? */
export const hasRealImage = (src?: string | null): boolean => {
  if (!src) return false;

  // прибираємо всі початкові слеші, щоб '/img/...' і 'img/...' збігались
  const normalized = src.replace(/^\/+/, '');

  // напряму перевіряємо шлях або залишаємо можливість додати нові
  return !PLACEHOLDER_PATHS.has(normalized);
};
