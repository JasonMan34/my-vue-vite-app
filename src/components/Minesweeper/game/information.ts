import { MinesweeperTile } from './minesweeper-tile';
import {
  arrayContains,
  arrayDifference,
  arrayIntersection,
  arraysAreEqual,
} from './utils';

export interface DataNode {
  tiles: MinesweeperTile[];
  mineCount: number;
}

export class Information {
  data: DataNode[] = [];
  meaningfulData: DataNode[] = [];

  add(tiles: MinesweeperTile[], mineCount: number): void;
  add(node: DataNode): void;
  add(tilesOrNode: MinesweeperTile[] | DataNode, mineCount?: number): void {
    let newNode: DataNode;
    if (Array.isArray(tilesOrNode)) {
      newNode = { tiles: tilesOrNode, mineCount: mineCount! };
    } else {
      newNode = tilesOrNode;
    }

    // Check if we already have this information
    const alreadyIn = this.data.find(node =>
      arraysAreEqual(node.tiles, newNode.tiles)
    );
    if (alreadyIn) {
      return;
    }

    // Add the new data node
    this.data.push(newNode);

    // And infer any new information from it
    this.data.forEach(node => {
      if (node === newNode) return;

      const intersection = arrayIntersection(node.tiles, newNode.tiles);
      if (intersection.length === 0) {
        return;
      }

      const differenceNew = arrayDifference(newNode.tiles, node.tiles);
      const differenceNotNew = arrayDifference(node.tiles, newNode.tiles);

      if (
        arrayContains(newNode.tiles, node.tiles) &&
        differenceNew.length !== 0
      ) {
        const inferredDataNode = {
          tiles: differenceNew,
          mineCount: newNode.mineCount - node.mineCount,
        };
        this.add(inferredDataNode);
      }

      if (
        arrayContains(node.tiles, newNode.tiles) &&
        differenceNotNew.length !== 0
      ) {
        const inferredDataNode = {
          tiles: differenceNotNew,
          mineCount: node.mineCount - newNode.mineCount,
        };
        this.add(inferredDataNode);
      }
    });

    if (newNode.mineCount === 0 || newNode.mineCount === newNode.tiles.length) {
      this.meaningfulData.push(newNode);
    }
  }
}
