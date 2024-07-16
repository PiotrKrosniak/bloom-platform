import logo from "./extensions/bloom.png";

const config = {
  auth: {
    logo,
  },
  head: {
    favicon: logo,
  },
  menu: {
    logo,
  },
  translations: {
    en: {
      "app.components.LeftMenu.navbrand.title": "Bloom Dashboard",

      "app.components.LeftMenu.navbrand.workplace" : "The Bloom",

      "Auth.form.welcome.title": "Welcome to The Bloom",

      "Auth.form.welcome.subtitle": "Login to your account",

      "Settings.profile.form.section.experience.interfaceLanguageHelp":
        "Preference changes will apply only to you.",
    }
  }
};

const bootstrap = (app) => {
  console.log(app);
};

export default {
  config,
  bootstrap,
};
