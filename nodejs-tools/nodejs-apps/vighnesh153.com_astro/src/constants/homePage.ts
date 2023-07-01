const hashTags = {
  main: 'main',
  aboutMe: 'about-me',
  experience: 'experience',
  contactMe: 'contact-me',
};

const companyUrls = {
  google: 'https://about.google',
  amazon: 'https://www.aboutamazon.com/about-us',
  smarterCodes: 'https://smarter.codes',
  tavisca: 'https://tavisca.com',
};

const internalLinks = {
  main: `/#${hashTags.main}`,
  aboutMe: `/#${hashTags.aboutMe}`,
  experience: `/#${hashTags.experience}`,
  contactMe: `/#${hashTags.contactMe}`,
};

const currentTechnologies = [
  {
    text: 'Go programming language',
    link: 'https://go.dev',
  },
  {
    text: 'Kotlin programming language',
    link: 'https://kotlinlang.org',
  },
  {
    text: 'Typescript',
    link: 'https://www.typescriptlang.org',
  },
  {
    text: 'Amazon Web Services (AWS)',
    link: 'https://aws.amazon.com',
  },
  {
    text: 'Astro.build',
    link: 'https://astro.build',
  },
];

export const homePage = {
  hashTags,
  internalLinks,
  companyUrls,
  currentTechnologies,
};
