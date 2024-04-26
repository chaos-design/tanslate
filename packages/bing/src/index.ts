import { Translator } from './translator';
import type { TranslateOptions, TranslateResult } from './types';

export async function translate(
  inputText: string,
  options?: TranslateOptions,
): Promise<TranslateResult> {
  return new Translator(inputText, options).translate();
}

export default translate;

export { TranslateOptions, TranslateResult };
