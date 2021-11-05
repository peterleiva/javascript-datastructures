import type { Collection, Searchable, Comparable } from "types";
import type {
	BinaryTreeNode as BTNode,
	BinaryTree as ADT,
	Traversable,
	Comparator,
	Callback,
	TraversalMethod,
} from "../types";
import Node from "./node";

type BinaryTreeOptions<T> = Partial<{
	root: T;
	comparator: Comparator<T>;
}>;

/**
 * Binary tree using **dynamic node representation**
 *
 * A binary tree is a finite Set of elements that is either empty or is
 * partitioned into three disjoint subsets. The first subset contains a single
 * element called the root of the tree. The other two subsets are themselves
 * binary trees, called the left and right subtrees of the original tree. A left
 * or right subtree can be empty. Each element of a binary tree is called a node
 * of the tree.
 */
export default class BinaryTree<T>
	implements Collection, ADT<T>, Searchable<T>, Traversable<T>
{
	#root: BTNode<T>;
	#size: number;
	#comparator: Comparator<T>;

	/**
	 * Create a binary tree with optional root data
	 *
	 */
	constructor({ root: rootData, comparator }: BinaryTreeOptions<T> = {}) {
		this.#root = null;
		this.#size = 0;
		this.#comparator =
			comparator ??
			function (a: T, b: T) {
				return a < b;
			};

		if (rootData) {
			this.#root = new Node(rootData);
			this.#size = 1;
		}
	}

	/**
	 * getter for the root of the tree
	 * @returns
	 */
	get root(): BTNode<T> {
		return this.#root;
	}

	/**
	 * getter for the root of the tree
	 */
	get data(): T | undefined {
		return this.root?.data;
	}

	/**
	 * getter for left subtree
	 */
	get left(): BTNode<T> {
		return this.root?.left ?? null;
	}

	/**
	 * getter for right subtree
	 */
	get right(): BTNode<T> {
		return this.root?.right ?? null;
	}

	/**
	 * Alias for {@link BinaryTree.size}
	 */
	get length(): number {
		return this.size();
	}

	/**
	 * Returns the quantity of items stored
	 */
	size(): number {
		return this.#size;
	}

	/**
	 * return true of false depending whether or not the stack contains any items
	 */
	empty(): boolean {
		return this.#root === null;
	}

	/**
	 * remove all elements from the collection
	 */
	clear(): this {
		this.#size = 0;
		this.#root = null;

		return this;
	}

	/**
	 * The depth of a binary tree is the maximum level of any leaf in the tree.
	 * This equals the length of the longest path from the root to any leaf. It
	 * given -Infinity when the root is empty
	 */
	depth(): number {
		function _depth(tree: BTNode<T>): number {
			if (!tree) {
				return -Infinity;
			}

			if (tree.isLeaf()) {
				return tree.level();
			}

			return Math.max(_depth(tree.left), _depth(tree.right));
		}

		return _depth(this.root);
	}

	/**
	 * Compare values insert false values in the left otherwise in the right
	 */
	insert(...items: T[]): this {
		for (const item of items) {
			this.insertItem(this.#comparator, item);
		}

		return this;
	}

	/**
	 * Insert items, removing duplicates comparison is made with `Object.is`
	 */
	insertDistinct(...items: T[]): this {
		for (const item of items) {
			this.insertItem(this.#comparator, item, true);
		}

		return this;
	}

	/**
	 * Compare values insert false values in the left otherwise in the right
	 * TODO: usar outra função de comparação
	 */
	private insertItem(
		comparator: Comparator<T> = this.#comparator,
		item: T,
		distinct = false
	): void {
		let [father, node]: [BTNode<T>, BTNode<T>] = [null, this.root];

		while (node) {
			father = node;

			if (distinct && Object.is(node.data, item)) return;
			node = comparator(item, node.data) ? node.left : node.right;
		}

		if (!father) {
			this.#root = new Node(item);
		} else if (comparator(item, father.data)) {
			father.insertLeft(item);
		} else {
			father.insertRight(item);
		}

		this.#size++;
	}

	/**
	 * Find a data inside a tree according to finder callback
	 *
	 */
	search(finder: Comparable<T>): T | null {
		let node = this.root;

		while (node) {
			const comparison = finder(node.data);

			if (comparison === 0) {
				return node.data;
			} else if (comparison < 0) {
				node = node.left;
			} else {
				node = node.right;
			}
		}

		return null;
	}

	/**
	 * search and insert an item when it doens't exists
	 */
	searchAndInsert(finder: Comparable<T>, item: T): T {
		throw new Error("not implemented");
	}

	preorder(callback: Callback<T>): this;
	preorder(): Iterator<T>;
	/**
	 * Tranverse the tree in pre order
	 *
	 */
	preorder(callback?: Callback<T>): this | Iterator<T> {
		throw new Error("must be implemented");
	}

	inorder(callback: Callback<T>): this;
	inorder(): Iterator<T>;
	/**
	 * Tranverse the tree in order
	 */
	inorder(callback?: Callback<T>): this | Iterator<T> {
		throw new Error("must be implemented");
	}

	postorder(callback: Callback<T>): this;
	postorder(): Iterator<T>;

	/**
	 * Tranverse a tree in pos order
	 */
	postorder(callback?: Callback<T>): this | Iterator<T> {
		throw new Error("must be implemented");
	}

	/**
	 * helper to traverse the tree
	 */
	traverse(callback: Callback<T>, method: TraversalMethod): this {
		throw new Error("must be implemented");
	}
}
