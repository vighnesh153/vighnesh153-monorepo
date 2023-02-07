export const constants = {
  urls: {
    github: {
      rateLimit: 'https://api.github.com/rate_limit',
      gists: 'https://api.github.com/gists',
    },
    corsAnywherePrefix: 'https://cors-anywhere.herokuapp.com/',
  },
  identifier: {
    prefix: '__',
    suffix: '-db-from-github-gist.txt',
    content:
      'Hi there. This file indicates that the gist is being used as a persistent ' +
      'store by one of your applications (<APP-NAME>). If you are manually updating the ' +
      'gist, proceed with caution as your application might not be aware of the external changes.',
  },
};
