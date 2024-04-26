import google from '@chaos-design/translate-google-api';
import bing from '@chaos-design/translate-bing-api';
import type { TranslateOptions, TranslateResult } from './types';

const DEFAULT_OPTIONS: Required<
  Pick<TranslateOptions, 'from' | 'to' | 'host' | 'platform'>
> = {
  from: 'auto',
  to: 'en',
  host: 'translate.google.com',
  platform: 'google',
};

export async function translate(
  inputText: string,
  options: TranslateOptions = DEFAULT_OPTIONS,
): Promise<TranslateResult> {
  switch (options.platform) {
    case 'bing':
      return await bing(inputText, options);

    default:
      return await google(inputText, options);
  }
}
