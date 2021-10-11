/**
 * @file Tree tranversal interface for navigation
 */

type Callback<T> = (data: T) => unknown;
type Comparator<T> = (a: T, b: T) => boolean;
export type BTNode<T> = BinaryTreeNode<T>;

/**
 * Binary tree generic interface
 *
 * @template T
 */
export type BinaryTreeNode<T> = {
	/**
	 * Getter for data
	 * @type {T}
	 */
	data: T;
	/**
	 * Getter for father node
	 * @type {T}
	 */
	father: BinaryTreeNode<T>;
	/**
	 * Getter for left subtree
	 * @type {T}
	 */
	left: BinaryTreeNode<T>;
	/**
	 * Getter for right subtree
	 * @type {T}
	 */
	right: BinaryTreeNode<T>;
	/**
	 * Getter for brother subtree
	 * @type {T}
	 */
	brother: BinaryTreeNode<T>;
	/**
	 * Returns the root of the tree
	 */
	root: BinaryTreeNode<T>;
	/**
	 * Checks whether the tree is the root node
	 */
	isRoot(): boolean;
	/**
	 * returns true whether tree is right subtree or false otherwise
	 * @return {boolean}
	 */
	isRight(): boolean;
	/**
	 * O(1). returns true whether tree has no sons, also known as a leaf
	 * @return {boolean}
	 */
	isLeaf(): boolean;
	/**
	 * returns true whether tree is left subtree or false otherwise
	 * @return {boolean}
	 */
	isLeft(): boolean;
	/**
	 * Calculates the level of the subtree
	 *
	 * The root of the tree has level 0, and the level of any other node in the
	 * tree is one more than the level of its father.
	 * @return {number}
	 */
	level(): number;
	/**
	 * Checks whether the tree is ancestor of the tree
	 * @return {boolean}
	 */
	ancestor(tree: BinaryTreeNode<T>): boolean;
	/**
	 * Checks whether the tree is the root node
	 * @return {boolean}
	 */
	descendant(tree: BinaryTreeNode<T>): boolean;
} | null;

export interface BinaryTree<T> {
	/**
	 * getter for the root of the tree
	 */
	root: BTNode<T>;

	/**
	 * The depth of a binary tree is the maximum level of any leaf in the tree.
	 * This equals the length of the longest path from the root to any leaf.
	 * @return {number}
	 */
	depth(): number;
	/**
	 * Compare values insert false values in the left otherwise in the right
	 * @param comparison
	 * @return {this}
	 */
	insert(comparison: Comparator<T>, ...items: T[]): this;
	/**
	 * Insert items, removing duplicates comparison is made with `Object.is`
	 * @param items
	 * @return {this}
	 */
	insertDistinct(...items: T[]): this;
}

export interface BTComparisson {
	almostComplete(): boolean;
	strictBinary(): boolean;
	complete(): boolean;
}

export interface Similarity<T> {
	similar(tree: BinaryTreeNode<T>): boolean;
	mirrorSimilar(tree: BinaryTreeNode<T>): boolean;
	similarAndMirrorSimilar(tree: BinaryTreeNode<T>): boolean;
}

/**
 * Binary tree collection operations
 */
export interface TreeCollection<T> {
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

export enum TraversalMethod {
	ASC,
	DESC,
	PREORDER = 0,
	POSTORDER,
	INORDER,
}
/**
 * Traversable defines common ways to traverse its a tree. When talk about
 * traversal always has to do with ordered tree, so to successfully traversal
 * the tree must be sorted
 *
 * TODO: definir traversal apenas para árvores ordenadas!!!
 */
export interface Traversable<T> {
	/**
	 * Tranverse the tree in pre order
	 */
	preorder(callback: Callback<T>): this;
	preorder(): Iterator<T>;
	/**
	 * Tranverse the tree in order
	 */
	inorder(callback: Callback<T>): this;
	inorder(): Iterator<T>;
	/**
	 * Tranverse a tree in pos order
	 */
	postorder(callback: Callback<T>): this;
	postorder(): Iterator<T>;
	/**
	 * helper to traverse the tree
	 * @param callback
	 * @param {TraversalMethod} [method = TraversalMethod.PREORDER]
	 */
	traverse(callback: Callback<T>, method: TraversalMethod): this;
}
