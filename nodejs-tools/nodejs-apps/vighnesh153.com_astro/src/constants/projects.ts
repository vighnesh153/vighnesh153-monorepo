import type { HTMLAttributes } from 'astro/types';
import GithubIcon from '@/icons/GithubIcon.astro';
import EyeIcon from '@/icons/EyeIcon.astro';

interface ProjectLink {
  Icon: (props: HTMLAttributes<'svg'>) => unknown;
  href: string;
}

interface Project {
  title: string;
  description: string;
  tags: string[];
  links: {
    github: ProjectLink;
    demo: ProjectLink;
  };
}

export const allProjects: Project[] = [
  {
    title: 'Coding language (SPL)',
    description: `A Simple Programming Language (SPL) who's syntax is close to English Grammar`,
    tags: ['Compiler', 'Interpreter', 'Typescript'],
    links: {
      github: {
        Icon: GithubIcon,
        href: 'https://github.com/vighnesh153/vighnesh153-monorepo/tree/main/nodejs-tools/nodejs-lib/spl',
      },
      demo: {
        Icon: EyeIcon,
        href: 'https://spl.vighnesh153.com',
      },
    },
  },
  {
    title: 'Drawing app',
    description:
      'A simple drawing application hosted on the web. Features include, ' +
      'free-hand drawing, closed-region filling, color-picking for brush & fill, ' +
      'brush thickness picking, undo, redo and clear-screen.',
    tags: ['Canvas API', 'Typescript', 'Astro'],
    links: {
      github: {
        Icon: GithubIcon,
        href:
          'https://github.com/vighnesh153/vighnesh153-monorepo/tree/main/nodejs-tools/nodejs-apps/' +
          'draw.vighnesh153.com',
      },
      demo: {
        Icon: EyeIcon,
        href: 'https://draw.vighnesh153.com',
      },
    },
  },
  {
    title: 'Graphics Illustrations',
    description: 'Manipulating the graphics pixels using the HTML Canvas API in Typescript',
    tags: ['Canvas API', 'Astro', 'Typescript'],
    links: {
      github: {
        Icon: GithubIcon,
        href: 'https://github.com/vighnesh153/canvas-api-illustrations',
      },
      demo: {
        Icon: EyeIcon,
        href: 'https://graphics.vighnesh153.com',
      },
    },
  },
  {
    title: 'React.js playground',
    description: `Play with React.js code and import any npm module securely in your browser`,
    tags: ['ESBuild', 'Astro', 'React.js', 'Golang'],
    links: {
      github: {
        Icon: GithubIcon,
        href:
          'https://github.com/vighnesh153/vighnesh153-monorepo/tree/main/nodejs-tools/nodejs-apps/' +
          'tsx.vighnesh153.com',
      },
      demo: {
        Icon: EyeIcon,
        href: 'https://tsx.vighnesh153.com',
      },
    },
  },
  {
    title: 'React useGlobalState library',
    description:
      'A React.js hook to hold a piece of global state. It is similar to the ' +
      'useState hook but with the only addition that this hook persists the state globally.',
    tags: ['React.js', 'Typescript', 'NPM'],
    links: {
      github: {
        Icon: GithubIcon,
        href:
          'https://github.com/vighnesh153/vighnesh153-monorepo/tree' +
          '/main/nodejs-tools/nodejs-packages/react-use-global-state',
      },
      demo: {
        Icon: EyeIcon,
        href: 'https://www.npmjs.com/package/@vighnesh153/react-use-global-state',
      },
    },
  },
];
