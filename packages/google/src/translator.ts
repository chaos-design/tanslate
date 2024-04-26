import type { Response } from 'node-fetch';
import fetch from 'node-fetch';
import createHttpError from 'http-errors';
import type { RawResponse, Sentence, TranslateOptions } from './types';
import { extractTooManyRequestsInfo } from './utils';

export const defaults: Required<
  Pick<TranslateOptions, 'from' | 'to' | 'host'>
> = {
  from: 'auto',
  to: 'en',
  host: 'translate.google.com',
};

export class Translator {
  protected options: typeof defaults & TranslateOptions;

  constructor(protected inputText: string, options?: TranslateOptions) {
    this.options = Object.assign({}, defaults, options);
  }

  async translate() {
    const url = this.getRequestUrl();
    const fetchOptions = this.getFetchOptions();
    const res = await fetch(url, fetchOptions);

    if (!res.ok) {
      throw await this.catchError(res);
    }

    const raw = (await res.json()) as RawResponse;
    const text = this.getResText(raw);

    return { text, raw };
  }

  protected getRequestUrl() {
    const { host } = this.options;

    return [
      `https://${host}/translate_a/single`,
      '?client=at',
      '&dt=t', // return sentences
      '&dt=rm', // add translit to sentences
      '&dj=1', // result as pretty json instead of deep nested arrays
    ].join('');
  }

  protected getBody() {
    const { from, to } = this.options;
    const params = {
      sl: from,
      tl: to,
      q: this.inputText,
    };

    return new URLSearchParams(params).toString();
  }

  protected getFetchOptions() {
    const { fetchOptions } = this.options;
    const res = Object.assign({}, fetchOptions);

    res.method = 'POST';
    res.headers = Object.assign({}, res.headers, {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    });
    res.body = this.getBody();

    return res;
  }

  protected getResText({ sentences }: RawResponse) {
    return sentences
      .filter((s): s is Sentence => 'trans' in s)
      .map(s => s.trans)
      .join('');
  }

  protected async catchError(res: Response) {
    if (res.status === 429) {
      const text = await res.text();
      const { ip, time, url } = extractTooManyRequestsInfo(text);
      const message = `${res.statusText} IP: ${ip}, Time: ${time}, Url: ${url}`;

      return createHttpError(res.status, message);
    } else {
      return createHttpError(res.status, res.statusText);
    }
  }
}
