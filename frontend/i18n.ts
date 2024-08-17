import { createI18n } from "vue-i18n";

interface Messages {
  en: Record<string, string>;
  pl: Record<string, string>;
}

const i18n = createI18n({
  locale: "en",
  fallbackLocale: "en",
  messages: {},
});

export default i18n;
