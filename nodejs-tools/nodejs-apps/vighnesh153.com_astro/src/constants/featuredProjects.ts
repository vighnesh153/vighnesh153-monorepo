import type { HTMLAttributes } from 'astro/types';
import GithubIcon from '@/icons/GithubIcon.astro';
import EyeIcon from '@/icons/EyeIcon.astro';

interface FeaturedProjects {
  imageUrl: string;
  title: string;
  description: string;
  tags: string[];
  links: Array<{
    Icon: (props: HTMLAttributes<'svg'>) => unknown;
    ariaLabel: string;
    href: string;
  }>;
}

export const featuredProjects: FeaturedProjects[] = [
  {
    imageUrl: '/static/spl.webp',
    title: 'Simple Programming Language (SPL)',
    description: 'A programming language interpreter with syntax which is closer to the English Grammar',
    tags: ['Compiler', 'Interpreter', 'Typescript'],
    links: [
      {
        Icon: GithubIcon,
        ariaLabel: 'source code',
        href: 'https://github.com/vighnesh153/spl',
      },
      {
        Icon: EyeIcon,
        ariaLabel: 'project demo',
        href: 'https://spl.vighnesh153.com',
      },
    ],
  },
  {
    imageUrl: '/static/tsx-playground.webp',
    title: 'Typescript & React playground',
    description:
      'An interactive, browser-based, coding environment which supports importing' +
      ' any NPM module (which works on browsers) from the NPM registry. You can use' +
      ' this to test out any React and/or Typescript snippet directly in the browser' +
      ' without having to create a test project. Run your code safely and securely in ' +
      'your browser, without having to worry about anything, because your code never ' +
      'leaves your browser',
    tags: ['ESBuild', 'Astro', 'React', 'Typescript', 'Golang'],
    links: [
      {
        Icon: GithubIcon,
        ariaLabel: 'source code',
        href: 'https://github.com/vighnesh153/tsx-playground',
      },
      {
        Icon: EyeIcon,
        ariaLabel: 'project demo',
        href: 'https://tsx.vighnesh153.com',
      },
    ],
  },
  {
    imageUrl: '/static/graphics-illustrations.webp',
    title: 'Graphics Illustrations',
    description: 'Manipulating the graphics pixels using the HTML Canvas API in Typescript',
    tags: ['Canvas API', 'Astro', 'Typescript'],
    links: [
      {
        Icon: GithubIcon,
        ariaLabel: 'source code',
        href: 'https://github.com/vighnesh153/canvas-api-illustrations',
      },
      {
        Icon: EyeIcon,
        ariaLabel: 'project demo',
        href: 'https://graphics.vighnesh153.com',
      },
    ],
  },
];
