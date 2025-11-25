export function normalizeKey(s?: string) {
  if (!s) return '';
  // Remove accents, convert to NFD and strip diacritics, make lowercase
  const normalized = s.normalize('NFD').replace(/\p{Diacritic}/gu, '');
  return normalized
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-]/g, '')
    .replace(/-+/g, '-');
}
