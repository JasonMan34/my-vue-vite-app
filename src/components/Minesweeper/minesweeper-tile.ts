type TileValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

type MineTile = {
  isMine: true;
  value: 'mine';
};

type SafeTile = {
  isMine: false;
  value: TileValue;
};

export type Tile = MineTile | SafeTile;

export type Point = {
  x: number;
  y: number;
};
