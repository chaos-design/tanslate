export type Tld = 'www' | 'cn';

export interface TranslateOptions {
  from?: string;
  to?: string;
  tld?: Tld;
  /**
   * INFO: the result contains raw response
   */
  raw?: boolean;
  /**
   * INFO: the expected user agent header
   */
  userAgent?: string;
  autoDetect?: boolean;
}

export interface TranslateResult {
  text: string;
  result?: string[];
  raw: object[];
}

export type DetectResult = string;

export type AudioResult = string;
