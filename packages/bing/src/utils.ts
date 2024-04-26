import fetch from 'node-fetch';
import type { Tld } from './types';
import { CONFIG } from './config';

export const getHost = (tld: string = 'cn') => `https://${tld}.bing.com`;

export const getTokenAndKey = async ({
  tld,
  text: input,
  from,
  to = 'es',
}: {
  tld: Tld;
  text: string;
  from?: string;
  to?: string;
}) => {
  let token = '';
  let key = 0;
  let duration = 0;
  let expiry = 0;
  let IG = 'IG';
  const IID = 'translator.5026';

  const currentTime = Number(new Date());

  if (token && key && expiry && expiry > currentTime) {
    return { key, token, IG, IID };
  }
  const url = `${getHost(tld)}${
    CONFIG.translator
  }?ref=TThis&text=${input}&from=${from}&to=${to}`;
  console.log('url', url);

  const res = await fetch(url);
  const text = await res.text();

  const code = text
    .match(/params_RichTranslateHelper = \[.*?\]/g)![0]
    .split('[')[1]
    .replace(/"|\]/g, '');

  const [tKey, tToken, tDuration] = code.split(',');

  IG = text.match(/(?<=,IG:")[a-zA-Z0-9]+(?=")/)![0];
  key = Number(tKey);
  duration = Number(tDuration);
  expiry = currentTime + duration;
  token = tToken || 'WNHxaWngf8AF4xnTPNojQnpriKh7Db0o';

  return { key, token, IG, IID };
};
