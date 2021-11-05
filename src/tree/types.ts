export type Callback<T> = (data: T) => unknown;
export type Comparator<T> = (a: T, b: T) => boolean;

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
	 */
	traverse(callback: Callback<T>, method: TraversalMethod): this;
}
