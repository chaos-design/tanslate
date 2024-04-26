import { franc } from 'franc-min';
import type { Language } from './type';

const langMap = new Map<string, Language>([
  ['eng', 'en'],
  ['jpn', 'ja'],
  ['kor', 'ko'],
  ['cmn', 'zh-CN'],
]);

const options = { minLength: 1, whitelist: [...langMap.keys()] };

export function detectLang(text: string): Language {
  return langMap.get(franc(text, options)) || 'auto';
}
