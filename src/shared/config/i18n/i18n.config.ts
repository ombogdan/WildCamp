import i18n from "i18next";

import {AppLanguages, MMKVStorageKeys} from "shared/constants";
import {MMKVStorageService} from "shared/services/mmkv";
import * as RNLocalize from "react-native-localize";

import {initReactI18next} from "react-i18next";
import en from "./locales/en.json";
import fr from "./locales/fr.json";

const resources = {
  [AppLanguages.En]: {
    translation: en
  },
  [AppLanguages.Fr]: {
    translation: fr
  }
};

const locales = RNLocalize.getLocales();

let locale;
if (Array.isArray(locales) && locales.length > 0) {
  locale = locales[0].languageTag;
} else {
  // Fallback in case locales are not available
  locale = "en-US";
}

// @ts-ignore
export const systemLanguage = locale && Object.values(AppLanguages).includes(locale.substring(0, 2))
  ? (locale as string).substring(0, 2)
  : AppLanguages.En;

export const initLanguage = () => {
  let language = MMKVStorageService.getItem(MMKVStorageKeys.Language);
  if (!language) {
    language = systemLanguage;
  }

  // @ts-ignore
  return i18n
    .use(initReactI18next)
    .init({
      compatibilityJSON: "v3",
      lng: language,
      fallbackLng: AppLanguages.En,
      resources,
      ns: ["translation"],
      defaultNS: "translation",
      debug: false,
      returnObjects: true
    });
};

initLanguage();

export default i18n;
