/**
 * @file Tree tranversal interface for navigation
 */

type Callback = (...args: any[]) => unknown[];

/**
 * Every tree has some ways to navigate over it.
 *
 * Tree Traversal defines common ways to traverse its nodes. When talk about
 * traversal always has to do with ordered tree, so to successfully traversal
 * the tree must be sorted
 *
 * TODO: definir traversal apenas para árvores ordenadas!!!
 */
export interface TreeIterable<T> {
	/**
	 * Tranverse the tree in pre order
	 */
	preorder(): Iterator<T>;
	/**
	 * Tranverse the tree in order
	 */
	inorder(): Iterator<T>;
	/**
	 * Tranverse a tree in pos order
	 */
	postorder(): Iterator<T>;
}

export enum TraverseMethod {
	ASC,
	DESC,
	PREORDER = 0,
	POSTORDER,
	INORDER,
}

export interface TreeTraversal {
	/**
	 * Tranverse the tree in pre order
	 */
	preorder(callback: Callback): this;
	/**
	 * Tranverse the tree in order
	 */
	inorder(callback: Callback): this;
	/**
	 * Tranverse a tree in pos order
	 */
	postorder(callback: Callback): this;
	/**
	 * Choose a form of traversal
	 * @param callback
	 * @param method
	 */
	traverse(callback: Callback, method: TraverseMethod): this;
}
