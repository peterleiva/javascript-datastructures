export type Mapper<T, R> = (data: T) => R;
export type Comparator<T> = (a: T, b: T) => number;

export enum TraversalMethod {
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
	preorder(): Iterable<T>;
	preorder<R>(callback: Mapper<T, R>): Iterable<R>;
	/**
	 * Tranverse the tree in order
	 */
	inorder(): Iterable<T>;
	inorder<R>(callback: Mapper<T, R>): Iterable<R>;
	/**
	 * Tranverse a tree in pos order
	 */
	postorder(): Iterable<T>;
	postorder<R>(callback: Mapper<T, R>): Iterable<R>;
	/**
	 * traverse tree returning mapped value
	 */
	traverse<R>(callback: Mapper<T, R>, method: TraversalMethod): Array<R>;
}
