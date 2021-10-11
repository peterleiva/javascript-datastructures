/**
 * @file Binary tree data structure
 */

import type { Collection } from "../../types";
import type {
	BinaryTreeNode as BTNode,
	BinaryTree as BinaryTreeADT,
	TreeCollection,
	Traversable,
} from "../types";

/**
 * Binary tree using **dynamic node representation**
 *
 * A binary tree is a finite Set of elements that is either empty or is
 * partitioned into three disjoint subsets. The first subset contains a single
 * element called the root of the tree. The other two subsets are themselves
 * binary trees, called the left and right subtrees of the original tree. A left
 * or right subtree can be empty. Each element of a binary tree is called a node
 * of the tree.
 */
export default class BinaryTree<T> implements Collection, BinaryTreeADT<T> {
	#root: BTNode<T>;
	#size: number;
	/**
	 * Create a binary tree with optional root data
	 *
	 * @param {T} [data]
	 */
	constructor(data?: T) {
		this.#root = null;
		this.#size = 0;
	}

	/**
	 * getter for the root of the tree
	 */
	get root(): BTNode<T> {
		return this.#root;
	}

	/**
	 * Alias for {@link Collection.size}
	 * @type {number}
	 */
	get length(): number {
		return this.size();
	}

	/**
	 * Returns the quantity of items stored
	 * @return {number}
	 */
	size(): number {
		return this.#size;
	}

	/**
	 * return true of false depending whether or not the stack contains any items
	 * @return {boolean}
	 */
	empty(): boolean {
		return this.#root === null;
	}

	/**
	 * remove all elements from the collection
	 * @return {this}
	 */
	clear(): this {
		this.#size = 0;
		this.#root = null;

		return this;
	}

	/**
	 * The depth of a binary tree is the maximum level of any leaf in the tree.
	 * This equals the length of the longest path from the root to any leaf.
	 *
	 * @return {number}
	 */
	depth(): number {
		throw new Error("Must be implemented");
	}
}
