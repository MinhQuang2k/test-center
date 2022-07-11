import i18n from "i18next";
// import Backend from 'i18next-http-backend';
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import commonEN from "./locales/en/common";
import authEN from "./locales/en/auth";
import dashboardEN from "./locales/en/dashboard";
import categoryEN from "./locales/en/category";
import testEN from "./locales/en/test.json";
import statisticEN from "./locales/en/statistic.json";
import testCampaignEN from "./locales/en/testCampaign.json";
import bankEN from "./locales/en/bank.json";
import accountEN from "./locales/en/account.json";
import loginEN from "./locales/en/login.json";
import adminEN from "./locales/en/admin.json";

import commonVI from "./locales/vi/common";
import authVI from "./locales/vi/auth";
import dashboardVI from "./locales/vi/dashboard";
import categoryVI from "./locales/vi/category";
import testVI from "./locales/vi/test.json";
import statisticVI from "./locales/vi/statistic.json";
import testCampaignVI from "./locales/vi/testCampaign.json";
import bankVI from "./locales/vi/bank.json";
import accountVI from "./locales/vi/account.json";
import loginVI from "./locales/vi/login.json";
import adminVI from "./locales/vi/admin.json";

const resources = {
  en: {
    common: commonEN,
    auth: authEN,
    dashboard: dashboardEN,
    category: categoryEN,
    test: testEN,
    statistic: statisticEN,
    testCampaign: testCampaignEN,
    bank: bankEN,
    account: accountEN,
    login: loginEN,
    admin: adminEN,
  },

  vi: {
    common: commonVI,
    auth: authVI,
    dashboard: dashboardVI,
    category: categoryVI,
    test: testVI,
    statistic: statisticVI,
    testCampaign: testCampaignVI,
    bank: bankVI,
    account: accountVI,
    login: loginVI,
    admin: adminVI,
  },
};

i18n
  // .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    defaultNS: "common", // Set default namespace
    fallbackLng: "vi",
    debug: true, // turn off log
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
