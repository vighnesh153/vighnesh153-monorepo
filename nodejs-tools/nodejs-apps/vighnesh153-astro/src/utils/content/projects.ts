import type { HTMLAttributes } from "astro/types";
import GithubIcon from "@/icons/GithubIcon.astro";
import EyeIcon from "@/icons/EyeIcon.astro";
import { externalLinks, internalLinks } from "./links.ts";

interface ProjectLink {
  Icon: (props: HTMLAttributes<"svg">) => unknown;
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
    title: "Coding language (SPL)",
    description:
      `A Simple Programming Language (SPL) who's syntax is close to English Grammar`,
    tags: ["Compiler", "Interpreter", "Typescript"],
    links: {
      github: {
        Icon: GithubIcon,
        href: externalLinks.projects.spl.sourceCode,
      },
      demo: {
        Icon: EyeIcon,
        href: internalLinks.projects.spl.mainMenu,
      },
    },
  },
  {
    title: "Drawing app",
    description:
      "A simple drawing application hosted on the web. Features include, " +
      "free-hand drawing, closed-region filling, color-picking for brush & fill, " +
      "brush thickness picking, undo, redo and clear-screen.",
    tags: ["Canvas API", "Typescript", "Astro"],
    links: {
      github: {
        Icon: GithubIcon,
        href: externalLinks.projects.drawingApp.sourceCode,
      },
      demo: {
        Icon: EyeIcon,
        href: internalLinks.projects.drawingApp,
      },
    },
  },
  {
    title: "Graphics Illustrations",
    description:
      "Manipulating the graphics pixels using the HTML Canvas API in Typescript",
    tags: ["Canvas API", "Astro", "Typescript"],
    links: {
      github: {
        Icon: GithubIcon,
        href: externalLinks.projects.graphicsProjects.sourceCode,
      },
      demo: {
        Icon: EyeIcon,
        href: internalLinks.projects.graphicsProjects.root,
      },
    },
  },
  {
    title: "React.js playground",
    description:
      `Play with React.js code and import any npm module securely in your browser`,
    tags: ["ESBuild", "Astro", "React.js", "Golang"],
    links: {
      github: {
        Icon: GithubIcon,
        href: externalLinks.projects.tsxBundler.sourceCode,
      },
      demo: {
        Icon: EyeIcon,
        href: internalLinks.projects.tsxPlayground,
      },
    },
  },
  {
    title: "HTML5 Canvas Games",
    description:
      "Simple arcade style games built using the HTML Canvas API in Typescript",
    tags: ["Canvas API", "Astro", "Typescript"],
    links: {
      github: {
        Icon: GithubIcon,
        href: externalLinks.projects.games.sourceCode,
      },
      demo: {
        Icon: EyeIcon,
        href: internalLinks.projects.games.root,
      },
    },
  },
];
