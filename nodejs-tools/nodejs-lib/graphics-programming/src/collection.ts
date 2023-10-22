export interface GraphicsProject {
  imageLink: string;
  title: string;
  id: string;
}

const barnsleysFern: GraphicsProject = {
  imageLink: 'https://i.imgur.com/8F9Y1DQ.png',
  title: `Barnsley's Fern`,
  id: 'barnsleys-fern',
};

const brickBreakerGame: GraphicsProject = {
  imageLink: 'https://i.imgur.com/C0N3twn.png',
  title: 'Brick Breaker Game',
  id: 'brick-breaker-game',
};

const connectingParticles: GraphicsProject = {
  imageLink: 'https://i.imgur.com/ZKYXBhX.png',
  title: 'Connecting Particles',
  id: 'connecting-particles',
};

const flappyBlockGame: GraphicsProject = {
  imageLink: 'https://i.imgur.com/hKgLkKy.png',
  title: 'Flappy Block Game',
  id: 'flappy-block-game',
};

const gridPathFinderGame: GraphicsProject = {
  imageLink: 'https://i.imgur.com/znf6hph.png',
  title: 'Grid Path Finder',
  id: 'grid-path-finder',
};

const pongGame: GraphicsProject = {
  imageLink: 'https://i.imgur.com/9c0kEFU.png',
  title: 'Pong Game',
  id: 'pong-game',
};

const pseudoHilbertCurve: GraphicsProject = {
  imageLink: 'https://i.imgur.com/Lcyw7DQ.png',
  title: 'Pseudo Hilbert Curve',
  id: 'pseudo-hilbert-curve',
};

const serpinskisTriangle: GraphicsProject = {
  imageLink: 'https://i.imgur.com/aqfVtT4.png',
  title: `Sierpinski's Triangle`,
  id: 'sierpinskis-triangle',
};

const snakeGame: GraphicsProject = {
  imageLink: 'https://i.imgur.com/spwnsPX.png',
  title: 'Snake Game',
  id: 'snake-game',
};

const sortingVisualizer: GraphicsProject = {
  imageLink: 'https://i.imgur.com/YHKu6TN.png',
  title: 'Sorting Visualizer',
  id: 'sorting-visualizer',
};

const symmetricBinaryTree: GraphicsProject = {
  imageLink: 'https://i.imgur.com/MNqF5n3.png',
  title: 'Symmetric Binary Tree',
  id: 'symmetric-binary-tree',
};

const towerOfHanoi: GraphicsProject = {
  imageLink: 'https://i.imgur.com/FgdIyOZ.png',
  title: 'Tower of Hanoi',
  id: 'tower-of-hanoi',
};

const treePathFinder: GraphicsProject = {
  imageLink: 'https://i.imgur.com/879Zf9b.png',
  title: 'Tree Path Finder',
  id: 'tree-path-finder',
};

const twinklingStars: GraphicsProject = {
  imageLink: 'https://i.imgur.com/Zhk91iE.png',
  title: 'Twinkling Stars',
  id: 'twinkling-stars',
};

export const graphicsProjectsMap = {
  gridPathFinderGame,
  serpinskisTriangle,
  towerOfHanoi,
  symmetricBinaryTree,
  connectingParticles,
  pseudoHilbertCurve,
  sortingVisualizer,
  twinklingStars,
  treePathFinder,
  pongGame,
  barnsleysFern,
  snakeGame,
  flappyBlockGame,
  brickBreakerGame,
} satisfies Record<string, GraphicsProject>;

export const graphicsProjects: GraphicsProject[] = Object.values(graphicsProjectsMap);
