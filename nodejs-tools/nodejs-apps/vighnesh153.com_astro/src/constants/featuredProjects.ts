import type { HTMLAttributes } from 'astro/types';
import GithubIcon from '@/icons/GithubIcon.astro';
import EyeIcon from '@/icons/EyeIcon.astro';

interface FeaturedProjects {
  imageUrl: string;
  title: string;
  description: string;
  tags: string[];
  links: Array<{
    type: 'github' | 'demo';
    Icon: (props: HTMLAttributes<'svg'>) => unknown;
    ariaLabel: string;
    href: string;
  }>;
}

export const featuredProjects: FeaturedProjects[] = [
  {
    imageUrl: '/static/spl.webp',
    title: 'SPL',
    description: `A programming language who's syntax which is closer to English Grammar`,
    tags: ['Compiler', 'Interpreter', 'Typescript'],
    links: [
      {
        type: 'github',
        Icon: GithubIcon,
        ariaLabel: 'source code',
        href: 'https://github.com/vighnesh153/spl',
      },
      {
        type: 'demo',
        Icon: EyeIcon,
        ariaLabel: 'project demo',
        href: 'https://spl.vighnesh153.com',
      },
    ],
  },
  {
    imageUrl: '/static/tsx-playground.webp',
    title: 'React.js playground',
    description: `Play with React.js code and import any npm module securely in your browser`,
    tags: ['ESBuild', 'Astro', 'React', 'Golang'],
    links: [
      {
        type: 'github',
        Icon: GithubIcon,
        ariaLabel: 'source code',
        href: 'https://github.com/vighnesh153/tsx-playground',
      },
      {
        type: 'demo',
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
        type: 'github',
        Icon: GithubIcon,
        ariaLabel: 'source code',
        href: 'https://github.com/vighnesh153/canvas-api-illustrations',
      },
      {
        type: 'demo',
        Icon: EyeIcon,
        ariaLabel: 'project demo',
        href: 'https://graphics.vighnesh153.com',
      },
    ],
  },
];
