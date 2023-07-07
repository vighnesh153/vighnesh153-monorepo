import { FaCodepen, FaGithub, FaLinkedin, FaStackOverflow } from 'react-icons/fa';

export const myPersonalizedEmail = 'me@vighnesh153.com';
export const myGmailEmail = 'vighnesh.raut13@gmail.com';
export const myGoogleEmail = 'rvighnesh@google.com';

export const adminEmails = [myGmailEmail];

export const commonModuleConstants = {
  email: {
    personal: {
      primary: myGmailEmail,
      secondary: myPersonalizedEmail,
    },
    work: {
      google: myGoogleEmail,
    },
  },
  externalLinks: {
    selfGithubLink: 'https://github.com/vighnesh153/vighnesh153-monorepo',
    resumeLink: 'https://bit.ly/vighnesh153-resume',

    // work
    google: 'https://about.google',
    amazon: 'https://www.aboutamazon.com/about-us',
    smarterCodes: 'https://smarter.codes',
    tavisca: 'https://tavisca.com',
  },
  internalLinks: {
    common: {
      adminSection: '/admin',
      blogsSection: '/blog',
      projectsSection: '/projects',
    },
    homePage: {
      aboutSection: '/#about',
      experienceSection: '/#experience',
      contactMeSection: '/#contact',
    },
  },
  profiles: [
    {
      identifier: 'github',
      title: 'Github profile',
      link: 'https://github.com/vighnesh153',
      Icon: FaGithub,
    },
    {
      identifier: 'linkedIn',
      title: 'LinkedIn profile',
      link: 'https://www.linkedin.com/in/vighnesh153',
      Icon: FaLinkedin,
    },
    {
      identifier: 'stackoverflow',
      title: 'Stackoverflow profile',
      link: 'https://stackoverflow.com/users/8822610/vighnesh153',
      Icon: FaStackOverflow,
    },
    {
      identifier: 'codepen',
      title: 'Codepen profile',
      link: 'https://codepen.io/vighnesh153',
      Icon: FaCodepen,
    },
  ],
  currentTechnologies: [
    'Rust (programming language)',
    'Typescript',
    'Kotlin',
    'Amazon Web Services',
    'React.js',
    'Java',
  ],
};
