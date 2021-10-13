/**
 * @file Binary tree data structure
 * @version 0.1.0
 */

import type { Collection, Searchable, Finder } from "../../types";
import type {
	BinaryTreeNode as BTNode,
	BinaryTree as ADT,
	Traversable,
	Comparator,
	Callback,
	TraversalMethod,
} from "../types";
import BinaryTreeNode from "./binary-tree-node";

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
	implements Collection, ADT<T>, Searchable<T>, Traversable<T>
{
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

		if (data) {
			this.#root = new BinaryTreeNode(data);
		}
	}

	/**
	 * getter for the root of the tree
	 * @return {BTNode<T>}
	 */
	get root(): BTNode<T> {
		return this.#root;
	}

	/**
	 * getter for the root of the tree
	 */
	get data(): T | undefined {
		return this.root?.data;
	}

	/**
	 * getter for left subtree
	 */
	get left(): BTNode<T> {
		return this.root?.left ?? null;
	}

	/**
	 * getter for right subtree
	 */
	get right(): BTNode<T> {
		return this.root?.right ?? null;
	}

	/**
	 * Alias for {@link Collection.size}
	 * @return {numder}
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
	 * This equals the length of the longest path from the root to any leaf. It
	 * given -1 when the root is empty
	 * @return {number}
	 */
	depth(): number {
		throw new Error("must be implemented");
	}
	/**
	 * Compare values insert false values in the left otherwise in the right
	 * @param {Function} comparison
	 * @param {...T} items
	 * @return {this}
	 */
	insert(comparison: Comparator<T>, ...items: T[]): this {
		throw new Error("must be implemented");

		return this;
	}

	/**
	 * Insert items, removing duplicates comparison is made with `Object.is`
	 * @param {Function} comparison
	 * @param {...T} items
	 * @return {this}
	 */
	insertDistinct(comparison: Comparator<T>, ...items: T[]): this {
		throw new Error("must be implemented");

		return this;
	}

	/**
	 * Find a data inside a tree according to finder callback
	 *
	 * @param {Function} finder
	 * @return {?T}
	 */
	search(finder: Finder<T>): T | null {
		throw new Error("must be implemented");
	}

	preorder(callback: Callback<T>): this;
	preorder(): Iterator<T>;
	/**
	 * Tranverse the tree in pre order
	 *
	 *
	 * @param {Function} [callback]
	 * @return {this | Iterator<T>}
	 */
	preorder(callback?: Callback<T>): this | Iterator<T> {
		throw new Error("must be implemented");
	}

	inorder(callback: Callback<T>): this;
	inorder(): Iterator<T>;
	/**
	 * Tranverse the tree in order
	 *
	 * @param {Function} [callback]
	 * @return {this | Iterator<T>}
	 */
	inorder(callback?: Callback<T>): this | Iterator<T> {
		throw new Error("must be implemented");
	}

	postorder(callback: Callback<T>): this;
	postorder(): Iterator<T>;
	/**
	 * Tranverse a tree in pos order
	 * @param {Function} [callback]
	 * @return {this | Iterator<T>}
	 */
	postorder(callback?: Callback<T>): this | Iterator<T> {
		throw new Error("must be implemented");
	}

	/**
	 * helper to traverse the tree
	 * @param {Funtion} callback
	 * @param {TraversalMethod} [method = TraversalMethod.PREORDER]
	 */
	traverse(callback: Callback<T>, method: TraversalMethod): this {
		throw new Error("must be implemented");
	}
}
