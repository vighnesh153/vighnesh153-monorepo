import {
  CodepenIcon,
  GithubIcon,
  LinkedInIcon,
  StackoverflowIcon,
} from "@/icons";
import { externalLinks } from "./links";

externalLinks;

export const socialProfiles = [
  {
    identifier: "github",
    title: "Github profile",
    link: externalLinks.social.github,
    Icon: GithubIcon,
  },
  {
    identifier: "linkedIn",
    title: "LinkedIn profile",
    link: externalLinks.social.linkedin,
    Icon: LinkedInIcon,
  },
  {
    identifier: "stackoverflow",
    title: "Stackoverflow profile",
    link: externalLinks.social.stackoverflow,
    Icon: StackoverflowIcon,
  },
  {
    identifier: "codepen",
    title: "Codepen profile",
    link: externalLinks.social.codepen,
    Icon: CodepenIcon,
  },
];
