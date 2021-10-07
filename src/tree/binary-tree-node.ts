import { BTNode } from "./types";

/**
 * Incorrect insertion of tree
 */
export class InvalidInsertion extends Error {
	/**
	 * initialize message to invalid insertion
	 */
	constructor() {
		super("invalid tree insertion. Node already exists");
	}
}

/**
 * Represents a element (node) of Binary Tree
 *
 * A node of binary tree is implemented using **dynamic node represensation**
 * which represents three disjoint subsets, called **left**, **right** and
 * **father**, each node holds some information called **data**
 * @class
 */
export default class BinaryTreeNode<T> implements NonNullable<BTNode<T>> {
	/**
	 * Getter for data
	 * @type {T}
	 * @private
	 */
	#data: T;
	/**
	 * Getter for father node
	 * @type {T}
	 * @private
	 */
	#father: BTNode<T>;
	/**
	 * Getter for left subtree
	 * @type {T}
	 * @private
	 */
	#left: BTNode<T>;
	/**
	 * Getter for right subtree
	 * @type {T}
	 * @private
	 */
	#right: BTNode<T>;

	/**
	 * Creates a node tree with data and no subtree
	 *
	 * @param {T} data new data
	 */
	constructor(data: T) {
		this.#data = data;
		this.#father = this.#left = this.#right = null;
	}

	/**
	 * Getter for brother subtree
	 * @type {T}
	 * @return {T}
	 */
	get data(): T {
		throw new Error("must be implemented");
	}

	/**
	 * Returns father's node
	 * @type {BTNode<T>}
	 * @return {BTNode<T>}
	 */
	get father(): BTNode<T> {
		throw new Error("must be implemented");
	}

	/**
	 * creates a leaft to insert data in, for tree with no left son
	 * @throws {InvalidInsertion}
	 * @param {T} data
	 */
	setLeft(data: T): this {
		throw new Error("must be implemented");
	}

	/**
	 * Getter for brother subtree
	 * @type {BTNode<T>}
	 * @return {BTNode<T>}
	 */
	get left(): BTNode<T> {
		throw new Error("must be implemented");
	}

	/**
	 * creates a leaft to insert data in, for tree with no right son
	 * @throws {InvalidInsertion}
	 * @param {T} data
	 */
	setRight(data: T): this {
		throw new Error("must be implemented");
	}

	/**
	 * Getter for brother subtree
	 * @type {BTNode<T>}
	 * @return {BTNode<T>}
	 */
	get right(): BTNode<T> {
		throw new Error("must be implemented");
	}

	/**
	 * Getter for brother subtree
	 * @type {BTNode<T>}
	 * @return {BTNode<T>}
	 */
	get brother(): BTNode<T> {
		throw new Error("must be implemented");
	}

	/**
	 * Returns the root of the tree
	 * @type {BTNode<T>}
	 * @return {BTNode<T>}
	 */
	get root(): BTNode<T> {
		throw new Error("must be implemented");
	}

	/**
	 * Checks whether the tree is the root node
	 * @return {boolean}
	 */
	isRoot(): boolean {
		return this.#father === null;
	}

	/**
	 * returns true whether tree is a leaft, which means has no sons
	 * @return {boolean}
	 */
	isLeaf(): boolean {
		throw new Error("must be implemented");
	}

	/**
	 * returns true whether tree is right subtree or false otherwise
	 * @return {boolean}
	 */
	isRight(): boolean {
		throw new Error("must be implemented");
	}

	/**
	 * returns true whether tree is left subtree or false otherwise
	 * @return {boolean}
	 */
	isLeft(): boolean {
		throw new Error("must be implemented");
	}

	/**
	 * Calculates the level of the subtree
	 *
	 * The root of the tree has level 0, and the level of any other node in the
	 * tree is one more than the level of its father.
	 *
	 * @return {number}
	 */
	level(): number {
		throw new Error("must be implemented");
	}

	/**
	 * Checks whether the tree is ancestor of the tree
	 * @param {BTNode<T>} tree
	 * @return {boolean}
	 */
	ancestor(tree: BTNode<T>): boolean {
		throw new Error("must be implemented");
	}

	/**
	 * Checks whether the tree is the root node
	 * @param {BTNode<T>} tree
	 * @return {boolean}
	 */
	descendant(tree: BinaryTreeNode<T>): boolean {
		throw new Error("must be implemented");
	}
}
