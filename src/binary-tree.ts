/**
 * @file Binary tree data structure
 */

import TreeTraversal from './tree-traversal.interface';

type Node<T> = {
  data: T;
  left: Node<T>;
  right: Node<T>;
}

interface Tree<T> extends TreeTraversal<T> {
  right: T;
  left: T;
  size(): number;
  isEmpty(): boolean;
  insertRight(data: T): void;
  insertRight(subtree: Tree<T>): void;
  insertLeft(data: T): void;
}

/**
 * Binary tree container
 */
class BinaryTree<T> {
  private root: Node<T>;

  /**
   * Create a binary tree with optional root data
   *
   * @param {T} data
   */
  constructor(data: T = null) {
    this.root.data = data;
    this.root.left = this.root.left = null;
  }
}

export default BinaryTree;
