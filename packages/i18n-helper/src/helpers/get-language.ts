export default function getLanguage(keys: string[], inOptions?) {
  const { routerType } = inOptions || {};
  const isHashType = routerType === 'hash';
  const suburl = isHashType ? window.location.hash.slice(1) : window.location.search;
  const uri = new URL(suburl, 'http://localhost');
  for (const key of keys) {
    const lang = uri.searchParams.get(key);
    if (lang) return lang;
  }
  return null;
}
