import { Underflow } from "linear";
import BinaryTree from "./tree";

/**
 * The **Binary Search Tree** has the property that all elements in the left
 * subtree of a node n are less than the contents of n, and all elements in the
 * right subtree of n are greater than or equal to the contents
 */
export default class BST<T> extends BinaryTree<T> {
	constructor(data?: T) {
		super({ root: data });
	}

	/**
	 * Delete the minimium element of binary search tree
	 *
	 * @throws {@link Underflow}
	 * Throws when empty
	 */
	deleteMin(): T {
		if (!this.root) throw new Underflow();

		let node = this.root;

		while (node.left) node = node.left;

		const { data, father } = node;

		if (!father) {
			this.root = node.right;
		} else {
			father.left = node.right;
		}

		this.length--;

		return data;
	}
}
