import fetch from 'node-fetch';
import { CONFIG } from './config';
import type { TranslateOptions } from './types';
import { getHost, getTokenAndKey } from './utils';

const langCodeSwitch = (code: string) => {
  switch (code) {
    case 'zh-CN':
      return 'zh-Hans';
    case 'zh-TW':
      return 'zh-Hant';
    case 'tl':
      return 'fil';
    case 'iw':
      return 'he';
    case 'hmn':
      return 'mww';
    case 'sr':
      return 'sr-Cyrl';
    default:
      return code;
  }
};

export const defaults: Required<Pick<TranslateOptions, 'from' | 'to' | 'tld'>>
  = {
    from: 'auto-detect',
    to: 'en',
    tld: 'cn',
  };

export class Translator {
  protected options: typeof defaults & TranslateOptions;

  constructor(protected inputText: string, options?: TranslateOptions) {
    this.options = Object.assign({}, defaults, options);
  }

  async translate() {
    const { url, searchParams, from, to } = await this.getRequestUrl();

    searchParams.append('text', this.inputText);

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: searchParams.toString(),
    });

    try {
      const data = await res.json();
      console.log('data', data, url, searchParams.toString());

      // from = data[0].detectedLanguage.language;
      // const dataResult: string[] = [data[0].translations[0].text];

      // // get dictionary
      // let dict: undefined | string[] = undefined;
      // try {
      //   if (!this.inputText.includes(' ') && (from === 'en' || to === 'en')) {
      //     const dictUrl = `https://${com ? 'www' : 'cn'}.bing.com/tlookupv3`;
      //     searchParams = new URLSearchParams();
      //     searchParams.append('from', from);
      //     searchParams.append('text', text);
      //     searchParams.append('to', to);
      //     searchParams.append('token', token);
      //     searchParams.append('key', key.toString());
      //     const dictRes = await fetchData(dictUrl, {
      //       method: 'POST',
      //       headers: {
      //         'Content-Type': 'application/x-www-form-urlencoded',
      //       },
      //       body: searchParams.toString(),
      //     });
      //     const dictData = await dictRes.json();

      //     const dictObject = dictData[0]?.translations.reduce(
      //       (t: any, c: any) => ({
      //         ...t,
      //         [c.posTag]: t[c.posTag]
      //           ? t[c.posTag].concat(c.normalizedTarget)
      //           : [c.normalizedTarget],
      //       }),
      //       {}
      //     );
      //     dict =
      //       dictObject &&
      //       Object.keys(dictObject).map(
      //         (v) => `${v}: ${dictObject[v].join(', ')}`
      //       );
      //   }
      // } catch {
      //   dict = undefined;
      // }

      return {
        text: '',
        result: [],
        raw: [],
      };
    } catch (err) {
      return {
        text: '',
        result: [],
        raw: [],
      };
    }
  }

  protected async getRequestUrl() {
    let { tld, from, to } = this.options;
    const { token, key, IG, IID } = await getTokenAndKey({
      tld,
      from,
      to,
      text: this.inputText,
    });

    from = from || 'auto-detect';
    to = langCodeSwitch(to) || 'en';

    const url = `${getHost(tld)}${CONFIG.ttranslatev3}IG=${IG}&IID=${IID}`;

    const searchParams = new URLSearchParams();
    searchParams.append('fromLang', from);
    searchParams.append('to', to);
    searchParams.append('token', token);
    searchParams.append('key', key.toString());

    return { url, searchParams, from, to };
  }

  protected getFetchOptions() {
    return this.options;
  }
}
