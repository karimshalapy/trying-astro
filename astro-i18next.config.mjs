import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

/** @type {import('astro-i18next').AstroI18nextConfig} */
export default {
  defaultLanguage: process.env.PLACEHOLDER_LANG,
  supportedLanguages: ["en", "ar"],
  i18next: {
    debug: true,
    initImmediate: false,
    backend: {
      loadPath: "./src/locales/{{lng}}.json",
    },
  },
  i18nextPlugins: { fsBackend: "i18next-fs-backend" },
};
