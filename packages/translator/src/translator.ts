import type { AxiosPromise, AxiosRequestConfig } from 'axios';
import Axios from 'axios';
import { detectLang } from './detect-lang';
import type {
  Language,
  TranslateQueryResult,
  TranslateResult,
  TranslatorProps,
} from './type';

export abstract class Translator<Config extends {} = {}> {
  axios?: TranslatorProps<Config>['axios'];
  config: Config;

  abstract readonly name: string;

  constructor(props: TranslatorProps<Config>) {
    this.axios = props.axios || Axios;
    this.config = props.config || ({} as Config);
  }

  abstract getSupportLanguages(): Language;

  async translate(
    text: string,
    from: Language,
    to: Language,
    config = {} as Config,
  ): Promise<TranslateResult> {
    const queryResult = await this.query(text, from, to, {
      ...this.config,
      ...config,
    });

    return {
      ...queryResult,
      engine: this.name,
    };
  }

  protected abstract query(
    text: string,
    from: Language,
    to: Language,
    config: Config
  ): Promise<TranslateQueryResult>;

  protected request<R = {}>(
    url: string,
    config?: AxiosRequestConfig,
  ): AxiosPromise<R> {
    return this.axios(url, config);
  }

  async detect(text: string): Promise<Language> {
    return detectLang(text);
  }

  textToSpeech(
    text: string,
    lang: Language,
    meta?: any,
  ): Promise<string | null> {
    return Promise.resolve(null);
  }
}
