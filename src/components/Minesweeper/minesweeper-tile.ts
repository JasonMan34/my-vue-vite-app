type MineTile = {
  isMine: true;
  value: 'mine';
};

type SafeTile = {
  isMine: false;
  value: number;
};

export type Tile = (MineTile | SafeTile) & {
  revealed?: true;
};

export type Point = {
  x: number;
  y: number;
};
