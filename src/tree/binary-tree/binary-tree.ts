/**
 * @file Binary tree data structure
 */

import type { Collection } from "../../types";
import type {
	BinaryTreeNode as BT,
	TreeCollection,
	Traversable,
} from "../types";

type BTNode<T> = BinaryTree<T> | null;

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
export default class BinaryTree<T>
	implements BT<T>, TreeCollection<T>, Collection
{
	#data: T;
	/**
	 * Create a binary tree with optional root data
	 *
	 * @param {T} data [null]
	 */
	constructor(data: T) {
		this.#data = data;
		this.#father = this.#left = this.#right = null;
		this.#size = 0;
	}

	/**
	 * set left node
	 * @param {T} data
	 * @return {void}
	 */
	set left(data: T): void {
		// TODO: decidir o que fazer quando árvore já tiver nó esquerdo definido
		this.#left = new BinaryTree(data);
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
}
