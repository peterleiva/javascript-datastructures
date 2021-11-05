import BinaryTree from "./tree";

/**
 * The **Binary Search Tree** has the property that all elements in the left
 * subtree of a node n are less than the contents of n, and all elements in the
 * right subtree of n are greater than or equal to the contents
 */
export default class BST<T> extends BinaryTree<T> {
	/**
	 * Delete the minimium element of binary search tree
	 */
	deleteMin(): this {
		throw new Error("must be implemented");
	}
}
