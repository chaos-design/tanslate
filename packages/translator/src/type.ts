import type { Language as OriginLanguage } from '@chaos-design/translate-languages';
import type { AxiosInstance } from 'axios';

export type Language = OriginLanguage | 'en' | 'ja' | 'ko' | 'zh-CN';

export interface TranslatorProps<Config extends {}> {
  axios?: AxiosInstance;
  config?: Config;
}

export interface TranslateResult {
  engine: string;
  text: string;
  from: Language;
  to: Language;
  origin: {
    paragraphs: string[];
    tts?: string;
  };
  trans: {
    paragraphs: string[];
    tts?: string;
  };
}

export type TranslateQueryResult = Omit<TranslateResult, 'engine'>;
