/**
 * @file Binary tree data structure
 */

/**
 * Binary tree node
 */
type Node<T> = {
	data: T;
	left: Node<T>;
	right: Node<T>;
};

/**
 * Binary tree generic interface
 */
interface Tree<T> {
	size(): number;
	isEmpty(): boolean;
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
	insertRoot(data: T): Tree<T>;
	insertRight(data: T): Tree<T>;
	insertRight(subtree: Tree<T>): Tree<T>;
	insertLeft(data: T): Tree<T>;
	insertLeft(subtree: Tree<T>): Tree<T>;
	removeRight(node: Node<T>): boolean;
	removeLeft(node: Node<T>): boolean;
}

/**
 * Binary tree container
 */
class BinaryTree<T> implements Tree<T>, TreeCollection<T> {
	#root: Node<T> = null;
	#size = 0;

	/**
	 * Create a binary tree with optional root data
	 *
	 * @param {T} data [null]
	 */
	constructor(data: T = null) {
		if (data) {
			this.#root = {
				data: data,
				right: null,
				left: null,
			};

			this.#size = 1;
		}
	}

	/**
	 * Getter for root node
	 *
	 * @return {Node<T>}
	 */
	get root(): Node<T> {
		return this.#root;
	}

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
	isEmpty(): boolean {
		return this.size() === 0;
	}

	find(finder: (data: T) => boolean): T {
		throw new Error("Not implemented");
	}
}

export default BinaryTree;
