export default function stdLanguage(inLaugage: string, inFallbackLng: string = 'en-US') {
  const language = inLaugage.toLowerCase();
  if (language.startsWith('en')) return 'en-US';
  if (language.startsWith('zh')) return 'zh-CN';
  if (language.startsWith('ru')) return 'ru-RU';
  return inFallbackLng;
}
