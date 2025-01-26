export interface CanvasProject {
  imageLink: string;
  title: string;
  id: string;
  description: string;
}

const gamesPrefix =
  "https://firebasestorage.googleapis.com/v0/b/vighnesh153-app.firebasestorage.app/o/public%2Fprojects%2Fgames%2F";

const graphicsPrefix =
  "https://firebasestorage.googleapis.com/v0/b/vighnesh153-app.firebasestorage.app/o/public%2Fprojects%2Fgraphics%2F";

const barnsleysFern: CanvasProject = {
  imageLink: graphicsPrefix + "barnsleys-fern.png?alt=media",
  title: `Barnsley's Fern`,
  id: "barnsleys-fern",
  description:
    `Drawing a barnsley's fern, an infinite fractal which resembles a black spleenwort, using mathematics`,
};

const brickBreakerGame: CanvasProject = {
  imageLink: gamesPrefix + "brick-breaker-game.png?alt=media",
  title: "Brick Breaker Game",
  id: "brick-breaker-game",
  description:
    "Brick breaker is a arcade game emulation, which destroys the bricks by shooting a ball at them",
};

const bondingParticles: CanvasProject = {
  imageLink: graphicsPrefix + "bonding-particles.png?alt=media",
  title: "Bonding particles",
  id: "bonding-particles",
  description:
    `A bunch of particles roaming freely in the space creating bonds with others`,
};

const flappyBlockGame: CanvasProject = {
  imageLink: gamesPrefix + "flappy-block-game.png?alt=media",
  title: "Flappy Block Game",
  id: "flappy-block-game",
  description:
    'Flappy block is an infinite world game which is inspired by the infamous "Flappy Bird" game.',
};

const gridPathFinderGame: CanvasProject = {
  imageLink: graphicsPrefix + "grid-path-finder.png?alt=media",
  title: "Grid Path Finder",
  id: "grid-path-finder",
  description:
    "A pathfinding project that uses a graph algorithm to find the path from the start point to the end point.",
};

const pongGame: CanvasProject = {
  imageLink: gamesPrefix + "ping-pong.png?alt=media",
  title: "Pong Game",
  id: "pong-game",
  description: `A table-tennis themed 2D arcade game. Beat the AI to win`,
};

const pseudoHilbertCurve: CanvasProject = {
  imageLink: graphicsPrefix + "pseudo-hilbert-curve.png?alt=media",
  title: "Pseudo Hilbert Curve",
  id: "pseudo-hilbert-curve",
  description: `A Hilbert curve is a continuous fractal space-filling curve`,
};

const sierpinskisTriangle: CanvasProject = {
  imageLink: graphicsPrefix + "sierpinskis-triangle.png?alt=media",
  title: `Sierpinski's Triangle`,
  id: "sierpinskis-triangle",
  description:
    `A sierpinski's triangle is a fractal attractive fixed set with ` +
    "the overall shape of an equilateral triangle, subdivided recursively into smaller equilateral triangles",
};

const snakeGame: CanvasProject = {
  imageLink: gamesPrefix + "snake-game.png?alt=media",
  title: "Snake Game",
  id: "snake-game",
  description: `An emulation of the infamous Snake game where player ` +
    `plays a snake and the objective is the get as big as possible.`,
};

const sortingVisualizer: CanvasProject = {
  imageLink: graphicsPrefix + "sorting-visualizer.png?alt=media",
  title: "Sorting Visualizer",
  id: "sorting-visualizer",
  description:
    `Using animations to visualize different sorting algorithms for fun`,
};

const symmetricBinaryTree: CanvasProject = {
  imageLink: graphicsPrefix + "symmetric-binary-tree.png?alt=media",
  title: "Symmetric Binary Tree",
  id: "symmetric-binary-tree",
  description:
    `A binary tree representation by its branches and how the final shape is ` +
    `different for even a slight change in the angle`,
};

const towerOfHanoi: CanvasProject = {
  imageLink: graphicsPrefix + "tower-of-hanoi.png?alt=media",
  title: "Tower of Hanoi",
  id: "tower-of-hanoi",
  description: `Tower of Hanoi is a mathematical game or puzzle consisting ` +
    `of three rods and a number of disks of various diameters, which can slide onto any rod`,
};

const treePathFinder: CanvasProject = {
  imageLink: graphicsPrefix + "tree-path-finder.png?alt=media",
  title: "Tree Path Finder",
  id: "tree-path-finder",
  description: `Find a path between two nodes in a tree`,
};

const twinklingStars: CanvasProject = {
  imageLink: graphicsPrefix + "twinkling-stars.png?alt=media",
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
