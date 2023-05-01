import { FaCodepen, FaGithub, FaLinkedin, FaStackOverflow } from 'react-icons/fa';

export const myPersonalizedEmail = 'me@vighnesh153.com';
export const myGmailEmail = 'vighnesh.raut13@gmail.com';
export const myGoogleEmail = 'rvighnesh@google.com';

export const adminEmails = [myGmailEmail];

export const commonConstants = {
  email: {
    personal: {
      primary: myGmailEmail,
      secondary: myPersonalizedEmail,
    },
    work: {
      google: myGoogleEmail,
    },
  },
  appGithubLink: 'https://github.com/vighnesh153/vighnesh153-turbo',
  resumeLink: 'https://bit.ly/vighnesh153-resume',
  work: {
    google: { url: 'https://about.google' },
    amazon: { url: 'https://amazon.com' },
    smarterCodes: { url: 'https://smarter.codes' },
    tavisca: { url: 'https://tavisca.com' },
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
  pageLinks: {
    common: {
      adminSection: '/admin',
    },
    homePage: {
      aboutSection: '/#about',
      experienceSection: '/#experience',
      blogsSection: '/blog',
      projectsSection: '/projects',
      contactMeSection: '/#contact',
    },
  },
};
