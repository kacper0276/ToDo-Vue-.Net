import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { createI18n } from "vue-i18n";

import App from "./App.vue";
import router from "./router";

import en from "./locales/en.json";
import pl from "./locales/pl.json";

const i18n = createI18n({
  locale: "en",
  messages: {
    en,
    pl,
  },
});

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(i18n);

app.mount("#app");
