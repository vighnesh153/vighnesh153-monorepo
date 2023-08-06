export type TutorPlanTag = 'beginner' | 'intermediate' | 'advanced';

export interface TutorPlanProps {
  name: string;
  description: string;
  price: number;
  isPopular: boolean;
  tags: TutorPlanTag[];
  prerequisites: string[];
  features: string[];
  options: string[];
}

export const mathTutorPlans: TutorPlanProps[] = [
  {
    name: 'Permutations, Combinations & Multinomial Theorem',
    description: 'Master the art of counting with permutations and combinations in this comprehensive course',
    price: 8_000,
    isPopular: true,
    tags: ['beginner'],
    prerequisites: [],
    features: ['Permutations', 'Combinations', 'Binomial theorem', 'Multinomial theorem', 'Practice problems'],
    options: [],
  },
  {
    name: 'Algebra',
    description: 'Master the essential concepts of trigonometry with this comprehensive course',
    price: 12_000,
    isPopular: false,
    tags: ['beginner'],
    prerequisites: [],
    features: [
      'Linear equations',
      'Quadratics',
      'Inequalities',
      'Sequences',
      'Exponents & Radicals',
      'Irrational numbers',
      'Complex numbers',
      'Logarithms',
    ],
    options: [],
  },
  {
    name: 'Trigonometry',
    description: 'Master the essential concepts of trigonometry with this comprehensive course',
    price: 8_000,
    isPopular: false,
    tags: ['beginner'],
    prerequisites: [],
    features: ['Basic trigonometry', 'Law of sines & cosines', 'Practice problems'],
    options: [],
  },
  {
    name: 'Calculus',
    description: 'Master the essential concepts of calculus with this comprehensive course',
    price: 12_000,
    isPopular: true,
    tags: ['beginner'],
    prerequisites: [],
    features: ['Limits', 'Differentiation', 'Integration', 'Differential equations', 'Applications'],
    options: [],
  },
];

export const codingTutorPlans: TutorPlanProps[] = [
  {
    name: 'Programming language',
    description: 'Learn the basics of programming with this beginner-friendly course.',
    price: 10_000,
    isPopular: true,
    features: [],
    prerequisites: [],
    tags: ['beginner'],
    options: ['Javascript + Typescript', 'Python', 'Java + Kotlin', 'Golang'],
  },
  {
    name: 'Build a simple website',
    description: 'Learn to create your own website with this beginner-friendly course.',
    price: 12_000,
    isPopular: false,
    tags: ['beginner'],
    prerequisites: [],
    features: ['HTML + CSS', 'Basic Javascript', 'Tailwind CSS', 'Deployment'],
    options: [],
  },
  {
    name: 'Game development with Javascript',
    description: 'Learn to create your simpel games with this beginner-friendly course.',
    price: 15_000,
    isPopular: false,
    tags: ['intermediate'],
    prerequisites: ['HTML + CSS', 'Javascript or Typescript'],
    features: ['Canvas API', 'Creating & moving shapes', 'State machines', 'Deployment'],
    options: [],
  },
  {
    name: 'Data structures and Algorithms',
    description: 'Master the essential concepts of data structures and algorithms with this comprehensive course',
    price: 20_000,
    isPopular: true,
    tags: ['intermediate'],
    prerequisites: ['One programming language'],
    features: [
      'Time complexity analysis',
      'Space complexity analysis',
      'Basic data structures',
      'Basic algorithms',
      'Advanced data structures',
      'Advanded algorithms',
      'Practice problems',
      'Mock interviews',
    ],
    options: [],
  },
  {
    name: 'Complete frontend development',
    description: 'Master the skills you need to build beautiful and responsive websites with this comprehensive course',
    price: 18_000,
    isPopular: false,
    tags: ['beginner'],
    prerequisites: [],
    features: [
      'HTML + CSS',
      'Javascript + Typescript',
      'Tailwind CSS',
      'CSS in JS',
      'State management',
      'SPAs + MPAs',
      'SSG + SSR + ISR',
      'Testing',
      'Deployment',
    ],
    options: ['React.js + Next.js', 'Astro.js', 'Svelte'],
  },
];
