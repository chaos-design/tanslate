import type {
  TranslateOptions as GoogleTranslateOptions,
  TranslateResult as GoogleTranslateResult,
} from '@chaos-design/translate-google-api';
import type {
  TranslateOptions as BingTranslateOptions,
  TranslateResult as BingTranslateResult,
} from '@chaos-design/translate-bing-api';

export interface TranslateOptions
  extends GoogleTranslateOptions,
  BingTranslateOptions {
  platform?: 'google' | 'bing';
}

export interface TranslateResult
  extends Omit<GoogleTranslateResult, 'raw'>,
  Omit<BingTranslateResult, 'raw'> {
  raw?: BingTranslateResult['raw'] | GoogleTranslateResult['raw'];
}
