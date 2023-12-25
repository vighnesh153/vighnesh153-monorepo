export interface Screen {
  readonly type: 'gameplay' | 'info';

  draw(): void;
  update(): void;

  handleSpacebarPress(): void;
  handleEnterPress(): void;
}
