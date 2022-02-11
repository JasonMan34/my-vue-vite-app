/* eslint-disable max-classes-per-file */
import { MinesweeperTile } from './minesweeper-tile';
import {
  arrayContains,
  arrayDifference,
  arrayIntersection,
  arraysAreEqual,
} from './utils';

type MineDataRelation = 'equals' | 'minimum' | 'maximum';

type MineData = {
  value: number;
  relation: MineDataRelation;
};

export interface DataNode {
  tiles: MinesweeperTile[];
  mines: MineData;
}

/** Returns relation for the difference between two data nodes, if such relation exists */
const getDifferenceRelation = (
  node1: DataNode,
  node2: DataNode
): MineDataRelation | undefined => {
  const a = node1.mines;
  const b = node2.mines;

  if (b.relation === 'equals') return a.relation;
  if (b.relation === 'maximum' && a.relation !== 'maximum') return a.relation;
  if (b.relation === 'minimum' && a.relation !== 'minimum') return a.relation;
};

export class Information {
  data: DataNode[] = [];
  meaningfulData: DataNode[] = [];

  // add(node: DataNode): void;
  add(tiles: MinesweeperTile[], mines: number | MineData): void {
    const newNode: DataNode = {
      tiles,
      mines:
        typeof mines === 'number'
          ? {
              value: mines,
              relation: 'equals',
            }
          : mines,
    };

    // Information about 0 tiles is useless
    if (newNode.tiles.length === 0) {
      return;
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
        const relation = getDifferenceRelation(newNode, node);

        if (relation) {
          const inferredDataNode = {
            tiles: differenceNew,
            mineCount: {
              relation,
              value: newNode.mines.value - node.mines.value,
            },
          };
          this.add(inferredDataNode.tiles, inferredDataNode.mineCount);
        }
      }

      if (
        arrayContains(node.tiles, newNode.tiles) &&
        differenceNotNew.length !== 0
      ) {
        const relation = getDifferenceRelation(node, newNode);

        if (relation) {
          const inferredDataNode = {
            tiles: differenceNotNew,
            mineCount: {
              relation,
              value: node.mines.value - newNode.mines.value,
            },
          };
          this.add(inferredDataNode.tiles, inferredDataNode.mineCount);
        }
      }
    });

    if (newNode.mines.value === 0) {
      this.meaningfulData.push(newNode);
    } else if (
      newNode.mines.relation === 'equals' ||
      (newNode.mines.relation === 'minimum' &&
        newNode.mines.value === newNode.tiles.length)
    ) {
      this.meaningfulData.push(newNode);
    }
  }
}
