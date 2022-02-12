/* eslint-disable max-classes-per-file */
import { MinesweeperTile } from './minesweeper-tile';
import {
  arrayContains,
  arrayDifference,
  arrayIntersection,
  arraysAreEqual,
} from './utils';

export type MineDataRelation = 'equals' | 'minimum' | 'maximum';

export type MinesData = {
  value: number;
  relation: MineDataRelation;
};

export interface DataNode {
  tiles: MinesweeperTile[];
  mines: MinesData;
}

/** Returns relation for the difference between two data nodes, if such relation exists */
const getDifferenceRelation = (
  node1: DataNode,
  node2: DataNode
): MineDataRelation | undefined => {
  const a = node1.mines;
  const b = node2.mines;

  // a = A
  if (a.relation === 'equals') {
    // b = B -> [a-b = A-B]
    if (b.relation === 'equals') return 'equals';
    // b <= B -> [a-b >= A-B]
    if (b.relation === 'maximum') return 'minimum';
    // b >= B -> [a-b <= A-B]
    if (b.relation === 'minimum') return 'maximum';

    // Unreachable
    return;
  }

  // a >= A
  if (a.relation === 'maximum') {
    // b = B -> [a-b <= A-B]
    if (b.relation === 'equals') return 'maximum';
    // b <= B -> [a-b <= A-B]
    if (b.relation === 'minimum') return 'maximum';
  }

  // a >= A
  if (a.relation === 'minimum') {
    // b = B -> [a-b >= A-B]
    if (b.relation === 'equals') return 'minimum';
    // b <= B -> [a-b >= A-B]
    if (b.relation === 'maximum') return 'minimum';
  }
};

export class Information {
  data: DataNode[] = [];
  meaningfulData: DataNode[] = [];

  add(tiles: MinesweeperTile[], mines: MinesData): void;
  add(tiles: MinesweeperTile[], mines: number): void;
  add(node: DataNode): void;
  add(
    tilesOrNode: MinesweeperTile[] | DataNode,
    mines?: MinesData | number
  ): void {
    if (this.meaningfulData.length !== 0) return;

    let newNode: DataNode;
    if (Array.isArray(tilesOrNode) && mines) {
      if (typeof mines === 'number') {
        mines = { relation: 'equals', value: mines };
      }
      newNode = { tiles: tilesOrNode, mines };
    } else if (!Array.isArray(tilesOrNode)) {
      newNode = tilesOrNode;
    } else {
      // Unreachable
      throw new Error();
    }

    // Information about 0 tiles is useless
    if (newNode.tiles.length === 0) {
      return;
    }

    // Minimum 0 mines (or less) is useless
    if (newNode.mines.relation === 'minimum' && newNode.mines.value <= 0) {
      return;
    }

    // Maximum tiles.length mines useless
    if (
      newNode.mines.relation === 'maximum' &&
      newNode.mines.value === newNode.tiles.length
    ) {
      return;
    }

    // Check if we already have information about these tiles
    const existingTilesInfo = this.data.filter(node =>
      arraysAreEqual(node.tiles, newNode.tiles)
    );

    for (let i = 0; i < existingTilesInfo.length; i++) {
      const existingInfo = existingTilesInfo[i];

      // If there is already information about exactly how many mines there are,
      // there's no new information to be gotten
      if (existingInfo.mines.relation === 'equals') {
        return;
      }

      // If it's the same relation, we'll only continue if the new info is more accurate
      if (existingInfo.mines.relation === newNode.mines.relation) {
        if (
          (newNode.mines.relation === 'maximum' &&
            newNode.mines.value < existingInfo.mines.value) ||
          (newNode.mines.relation === 'minimum' &&
            newNode.mines.value > existingInfo.mines.value)
        ) {
          const existingInfoIndex = this.data.indexOf(existingInfo);
          this.data.splice(existingInfoIndex, 1);
        }
      }

      if (existingInfo.mines.value === newNode.mines.value) {
        // There was already a node, that's not relation 'equals', and not relation of the new node
        // So the options are:
        // 1) existingNode.relation === 'minimum' && newNode.relation === 'maximum'
        // 2) existingNode.relation === 'minimum' && newNode.relation === 'maximum'
        // Either way, we can remove the old node, and change this one to 'equals'
        const existingInfoIndex = this.data.indexOf(existingInfo);
        this.data.splice(existingInfoIndex, 1);
        newNode.mines.relation = 'equals';
      }
    }

    // Add the new data node
    this.data.push(newNode);

    if (newNode.mines.value === 0) {
      this.meaningfulData.push(newNode);
      // TODO: Maybe remove later? No need to look for new data if we got meaningful
      return;
    }
    if (
      (newNode.mines.relation === 'equals' ||
        newNode.mines.relation === 'minimum') &&
      newNode.mines.value === newNode.tiles.length
    ) {
      this.meaningfulData.push(newNode);
      // TODO: Maybe remove later? No need to look for new data if we got meaningful
    }

    // And infer any new information from it
    this.data.forEach(node => {
      if (node === newNode) return;

      // Empty intersection = no data to infer
      const intersection = arrayIntersection(node.tiles, newNode.tiles);
      if (intersection.length === 0) {
        return;
      }

      const differenceNew = arrayDifference(newNode.tiles, node.tiles);
      const differenceNotNew = arrayDifference(node.tiles, newNode.tiles);

      const relationDifferenceNew = getDifferenceRelation(newNode, node);
      const relationDifferenceNotNew = getDifferenceRelation(node, newNode);

      if (
        differenceNew.length !== 0 &&
        relationDifferenceNew &&
        arrayContains(newNode.tiles, node.tiles)
      ) {
        const inferredDataNode: DataNode = {
          tiles: differenceNew,
          mines: {
            relation: relationDifferenceNew,
            value: newNode.mines.value - node.mines.value,
          },
        };
        this.add(inferredDataNode);
      } else if (
        differenceNotNew.length !== 0 &&
        relationDifferenceNotNew &&
        arrayContains(node.tiles, newNode.tiles)
      ) {
        const inferredDataNode: DataNode = {
          tiles: differenceNotNew,
          mines: {
            relation: relationDifferenceNotNew,
            value: node.mines.value - newNode.mines.value,
          },
        };

        this.add(inferredDataNode);
      } else if (
        node.mines.relation === 'equals' &&
        newNode.mines.relation === 'equals'
      ) {
        const inferredDataNode: DataNode = {
          tiles: intersection,
          mines: {
            relation: 'maximum',
            value: Math.min(node.mines.value, newNode.mines.value),
          },
        };
        this.add(inferredDataNode);
      }
    });
  }
}
