export default function getLanguage(inRouterType: string, inKeys?: string[]) {
  if (typeof inRouterType !== 'string') throw new Error('inRouterType must be a string');

  const isHashType = inRouterType === 'hash';
  const keys = inKeys || ['language', 'lang'];
  const suburl = isHashType ? window.location.hash.slice(1) : window.location.search;
  const uri = new URL(suburl, 'http://localhost');
  for (const key of keys) {
    const lang = uri.searchParams.get(key);
    if (lang) return lang;
  }
  return null;
}
