import BinaryTree from "./binary-tree";

/**
 * The **Binary Search Tree** has left subtree less than or equal its root and
 * all right subtree greater than the root
 */
export default class BST<T> extends BinaryTree<T> {
	/**
	 * Delete the minimium element of binary search tree
	 */
	deleteMin(): this {
		throw new Error("must be implemented");
	}
}
