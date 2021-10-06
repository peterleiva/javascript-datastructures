/**
 * @file Binary tree data structure
 */

import type { Collection } from "types";

/**
 * Represents a Subtree with information about data, father, left/right subtree
 */
class Node<T> implements BT<T>, Collection {
	#data: T;
	#father: Node<T>;
	#left: Node<T>;
	#right: Node<T>;

	constructor({ father, right, left, data }) {}
}

/**
 * Binary tree generic interface
 */
interface BT<T> {
	size(): number;
	empty(): boolean;

	data: T;
	father: BT<T> | null;
	left: BT<T> | null;
	right: BT<T> | null;
	brother: BT<T> | null;

	isRight(): boolean;
	isLeft(): boolean;

	depth(): number;

	almostComplete(): boolean;
	strictBinary(): boolean;
	complete(): boolean;

	similar(tree: BT<T>): boolean;
	mirrorSimilar(tree: BT<T>): boolean;
	similarAndMirrorSimilar(tree: BT<T>): boolean;
}

/**
 * Binary tree collection operations
 */
interface TreeCollection<T> {
	/**
	 * Find a data inside a tree according to finder algorythm
	 *
	 * @param {(data: T) => boolean} finder
	 */
	find(finder: (data: T) => boolean): T;
	/**
	 * Tranverse a tree according to one of its al
	 *
	 * @param {function(data: T):boolean} callback
	 */
	// map(callback: (data: T) => T, traversal: TreeTraversal<T>): Iterator<T>;
}

/**
 * Binary tree structural mofidier
 */
interface TreeModification<T> {
	insert(comparison: (value: T) => boolean): this;
}

type BSTRoot<T> = Node<T> | null;

/**
 * Binary tree container
 */
class BinaryTree<T> implements TreeCollection<T>, Collection {
	#root: BSTRoot<T> = null;
	#size = 0;

	/**
	 * Create a binary tree with optional root data
	 *
	 * @param {T} data [null]
	 */
	constructor() {}

	/**
	 * Getter for root node
	 *
	 * @return {Node<T>}
	 */
	get root(): BSTRoot<T> {
		return this.#root;
	}
	/**
	 *
	 */
	depth(): number {}

	/**
	 * Gets the tree size
	 *
	 * @return {number}
	 */
	size(): number {
		return this.#size;
	}

	/**
	 * Checks if there's no node on the tree
	 *
	 * @return {number}
	 */
	empty(): boolean {
		return this.size() === 0;
	}

	find(finder: (data: T) => boolean): T {
		throw new Error("Not implemented");
	}
}

export default BinaryTree;

class BST<T> extends BinaryTree<T> {}
