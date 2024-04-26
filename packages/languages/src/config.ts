import { LANGUAGES } from './languages';

export const getLangCode = (lang?: string) => {
  if (!lang || typeof lang !== 'string') {
    return;
  }

  if (LANGUAGES[lang]) {
    return lang;
  }

  lang = lang.toLowerCase();

  const supportedLangCodes = Object.keys(LANGUAGES);

  for (let i = 0, len = supportedLangCodes.length, code; i < len; i++) {
    code = supportedLangCodes[i];

    if (code.toLowerCase() === lang || LANGUAGES[code].toLowerCase() === lang) {
      return code;
    }
  }
};

export const isSupported = (lang?: string) => {
  return !!getLangCode(lang);
};
