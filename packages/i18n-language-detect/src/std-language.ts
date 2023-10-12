// en-US, en -> en-US
// zh-CN, zh -> zh-CN
// ru_ru, ru, ru_xx -> ru_RU

export default function stdLanuage(inLaugage: string) {
  const language = inLaugage.toLowerCase();
  if (language.startsWith('en')) return 'en-US';
  if (language.startsWith('zh')) return 'zh-CN';
  if (language.startsWith('ru')) return 'ru-RU';
  return 'en-US';
}
