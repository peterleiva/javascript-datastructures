export type BTNode<T> = BinaryTreeNode<T>;

/**
 * Binary tree generic interface
 *
 */
export type BinaryTreeNode<T> = {
	/**
	 * Getter for data
	 */
	readonly data: T;
	/**
	 * Getter for father node
	 */
	readonly father: BinaryTreeNode<T>;
	/**
	 * left subtree
	 */
	left: BinaryTreeNode<T>;
	/**
	 * Getter for right subtree
	 */
	readonly right: BinaryTreeNode<T>;
	/**
	 * Getter for brother subtree
	 */
	readonly brother: BinaryTreeNode<T>;
	/**
	 * Returns the root of the tree
	 */
	readonly root: BinaryTreeNode<T>;
	/**
	 * Checks whether the tree is the root node
	 */
	isRoot(): boolean;
	/**
	 * returns true whether tree is right subtree or false otherwise
	 */
	isRight(): boolean;
	/**
	 * O(1). returns true whether tree has no sons, also known as a leaf
	 */
	isLeaf(): boolean;
	/**
	 * returns true whether tree is left subtree or false otherwise
	 */
	isLeft(): boolean;
	/**
	 * creates a leaft to insert data in, for tree with no left son
	 * @throws {@link InvalidInsertion}
	 */
	insertLeft(data: T): BinaryTreeNode<T>;
	/**
	 * creates a leaf to insert data in, for tree with no right son
	 * @throws {@link InvalidInsertion}
	 */
	insertRight(data: T): BinaryTreeNode<T>;
	/**
	 * Calculates the level of the subtree
	 *
	 * The root of the tree has level 0, and the level of any other node in the
	 * tree is one more than the level of its father.
	 */
	level(): number;
	/**
	 * Checks whether the tree is ancestor of the tree
	 */
	ancestor(tree: BinaryTreeNode<T>): boolean;
	/**
	 * Checks whether the tree is the root node
	 */
	descendant(tree: BinaryTreeNode<T>): boolean;
} | null;

export interface BinaryTreeADT<T> {
	/**
	 * getter for the root of the tree
	 */
	root: BTNode<T>;
	/**
	 * getter for left subtree
	 */
	left: BTNode<T>;
	/**
	 * getter for right subtree
	 */
	right: BTNode<T>;
	/**
	 * data for root node
	 */
	data: T | undefined;
	/**
	 * The depth of a binary tree is the maximum level of any leaf in the tree.
	 * This equals the length of the longest path from the root to any leaf. It
	 * given -1 when the root is empty
	 */
	depth(): number;
	/**
	 * Compare values insert false values in the left otherwise in the right
	 */
	insert(...items: T[]): this;
	/**
	 * Insert items, removing duplicates comparison is made with `Object.is`
	 */
	insertDistinct(...items: T[]): this;
	// mirror(): BinaryTree<T>;
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
