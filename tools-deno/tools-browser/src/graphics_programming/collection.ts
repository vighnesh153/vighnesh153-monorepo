export interface CanvasProject {
  imageLink: string;
  title: string;
  id: string;
  description: string;
}

const barnsleysFern: CanvasProject = {
  imageLink: "https://i.imgur.com/BsS8tiu.png",
  title: `Barnsley's Fern`,
  id: "barnsleys-fern",
  description:
    `Drawing a barnsley's fern, an infinite fractal which resembles a black spleenwort, using mathematics`,
};

const brickBreakerGame: CanvasProject = {
  imageLink: "https://i.imgur.com/yauRTBv.png",
  title: "Brick Breaker Game",
  id: "brick-breaker-game",
  description:
    "Brick breaker is a arcade game emulation, which destroys the bricks by shooting a ball at them",
};

const bondingParticles: CanvasProject = {
  imageLink: "https://i.imgur.com/UinfrBn.png",
  title: "Bonding particles",
  id: "bonding-particles",
  description:
    `A bunch of particles roaming freely in the space creating bonds with others`,
};

const flappyBlockGame: CanvasProject = {
  imageLink: "https://i.imgur.com/wurPeGP.png",
  title: "Flappy Block Game",
  id: "flappy-block-game",
  description:
    'Flappy block is an infinite world game which is inspired by the infamous "Flappy Bird" game.',
};

const gridPathFinderGame: CanvasProject = {
  imageLink: "https://i.imgur.com/znf6hph.png",
  title: "Grid Path Finder",
  id: "grid-path-finder",
  description:
    "A pathfinding project that uses a graph algorithm to find the path from the start point to the end point.",
};

const pongGame: CanvasProject = {
  imageLink: "https://i.imgur.com/QYa6CDW.png",
  title: "Pong Game",
  id: "pong-game",
  description: `A table-tennis themed 2D arcade game. Beat the AI to win`,
};

const pseudoHilbertCurve: CanvasProject = {
  imageLink: "https://i.imgur.com/dZwla4S.png",
  title: "Pseudo Hilbert Curve",
  id: "pseudo-hilbert-curve",
  description: `A Hilbert curve is a continuous fractal space-filling curve`,
};

const sierpinskisTriangle: CanvasProject = {
  imageLink: "https://i.imgur.com/Eg4Hm1I.png",
  title: `Sierpinski's Triangle`,
  id: "sierpinskis-triangle",
  description:
    `A sierpinski's triangle is a fractal attractive fixed set with ` +
    "the overall shape of an equilateral triangle, subdivided recursively into smaller equilateral triangles",
};

const snakeGame: CanvasProject = {
  imageLink: "https://i.imgur.com/8VKUEFj.png",
  title: "Snake Game",
  id: "snake-game",
  description: `An emulation of the infamous Snake game where player ` +
    `plays a snake and the objective is the get as big as possible.`,
};

const sortingVisualizer: CanvasProject = {
  imageLink: "https://i.imgur.com/i1AXIQK.png",
  title: "Sorting Visualizer",
  id: "sorting-visualizer",
  description:
    `Using animations to visualize different sorting algorithms for fun`,
};

const symmetricBinaryTree: CanvasProject = {
  imageLink: "https://i.imgur.com/LXe43yO.png",
  title: "Symmetric Binary Tree",
  id: "symmetric-binary-tree",
  description:
    `A binary tree representation by its branches and how the final shape is ` +
    `different for even a slight change in the angle`,
};

const towerOfHanoi: CanvasProject = {
  imageLink: "https://i.imgur.com/FgdIyOZ.png",
  title: "Tower of Hanoi",
  id: "tower-of-hanoi",
  description: `Tower of Hanoi is a mathematical game or puzzle consisting ` +
    `of three rods and a number of disks of various diameters, which can slide onto any rod`,
};

const treePathFinder: CanvasProject = {
  imageLink: "https://i.imgur.com/XjLALF7.png",
  title: "Tree Path Finder",
  id: "tree-path-finder",
  description: `Find a path between two nodes in a tree`,
};

const twinklingStars: CanvasProject = {
  imageLink: "https://i.imgur.com/rAL2V18.jpg",
  title: "Twinkling Stars",
  id: "twinkling-stars",
  description: `A bunch of stars roaming freely in the space and twinkling`,
};

export type GraphicsProjectsMap = {
  gridPathFinderGame: CanvasProject;
  sierpinskisTriangle: CanvasProject;
  towerOfHanoi: CanvasProject;
  symmetricBinaryTree: CanvasProject;
  bondingParticles: CanvasProject;
  pseudoHilbertCurve: CanvasProject;
  sortingVisualizer: CanvasProject;
  twinklingStars: CanvasProject;
  treePathFinder: CanvasProject;
  barnsleysFern: CanvasProject;
};

export const graphicsProjectsMap: GraphicsProjectsMap = {
  gridPathFinderGame,
  sierpinskisTriangle,
  towerOfHanoi,
  symmetricBinaryTree,
  bondingParticles,
  pseudoHilbertCurve,
  sortingVisualizer,
  twinklingStars,
  treePathFinder,
  barnsleysFern,
} satisfies Record<string, CanvasProject>;

export const graphicsProjects: CanvasProject[] = Object.values(
  graphicsProjectsMap,
);

export type GamesProjectMap = {
  brickBreakerGame: CanvasProject;
  flappyBlockGame: CanvasProject;
  pongGame: CanvasProject;
  snakeGame: CanvasProject;
};

export const gamesProjectsMap: GamesProjectMap = {
  brickBreakerGame,
  flappyBlockGame,
  pongGame,
  snakeGame,
};

export const gamesProjects: CanvasProject[] = Object.values(gamesProjectsMap);
