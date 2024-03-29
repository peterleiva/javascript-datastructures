import type { Collection, Searchable, Predicate } from "types";
import type { BTNode, BinaryTreeADT } from "./types";

import { Traversable, Comparator, Mapper, TraversalMethod } from "../types";

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
	implements BinaryTreeADT<T>, Collection, Searchable<T>, Traversable<T>
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
				return Object.is(a, b) ? 0 : a < b ? -1 : 1;
			};

		if (rootData) {
			this.#root = new Node(rootData);
			this.#size = 1;
		}
	}

	get root(): BTNode<T> {
		return this.#root;
	}

	protected set root(newRoot: BTNode<T>) {
		this.#root = newRoot;
	}

	get data(): T | undefined {
		return this.root?.data;
	}

	get left(): BTNode<T> {
		return this.root?.left ?? null;
	}

	get right(): BTNode<T> {
		return this.root?.right ?? null;
	}

	get length(): number {
		return this.size();
	}

	protected set length(value: number) {
		this.#size = value;
	}

	size(): number {
		return this.#size;
	}

	empty(): boolean {
		return this.#root === null;
	}

	clear(): this {
		this.#size = 0;
		this.#root = null;

		return this;
	}

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

	insert(...items: T[]): this {
		for (const item of items) {
			this.insertItem(this.#comparator, item);
		}

		return this;
	}

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

			if (distinct && comparator(item, node.data) === 0) return;
			node = comparator(item, node.data) < 0 ? node.left : node.right;
		}

		if (!father) {
			this.#root = new Node(item);
		} else if (comparator(item, father.data) < 0) {
			father.insertLeft(item);
		} else {
			father.insertRight(item);
		}

		this.#size++;
	}

	search(predicate: Predicate<T>): T | null {
		let node = this.root;

		while (node) {
			const comparison = predicate(node.data);

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
	searchAndInsert(predicate: Predicate<T>, data: T): T {
		const found = this.search(predicate);

		if (!found) {
			this.insert(data);
		}

		return data;
	}

	preorder(): Iterable<T>;
	preorder<R>(callback: Mapper<T, R>): Iterable<R>;
	*preorder<R>(callback?: Mapper<T, R>): Iterable<T | R> {
		function* helper(
			tree: BTNode<T>,
			callback?: Mapper<T, R>
		): Iterable<T | R> {
			if (!tree) {
				return;
			}

			const data = tree.data;

			yield callback?.(data) ?? data;
			yield* helper(tree.left, callback);
			yield* helper(tree.right, callback);
		}

		yield* helper(this.root, callback);
	}

	inorder(): Iterable<T>;
	inorder<R>(callback: Mapper<T, R>): Iterable<R>;
	*inorder<R>(callback?: Mapper<T, R>): Iterable<T | R> {
		function* helper(
			tree: BTNode<T>,
			callback?: Mapper<T, R>
		): Iterable<T | R> {
			if (!tree) {
				return;
			}

			const data = tree.data;

			yield* helper(tree.left, callback);
			yield callback?.(data) ?? data;
			yield* helper(tree.right, callback);
		}

		yield* helper(this.root, callback);
	}

	postorder(): Iterable<T>;
	postorder<R>(callback: Mapper<T, R>): Iterable<R>;
	*postorder<R>(callback?: Mapper<T, R>): Iterable<T | R> {
		function* helper(
			tree: BTNode<T>,
			callback?: Mapper<T, R>
		): Iterable<T | R> {
			if (!tree) {
				return;
			}

			const data = tree.data;

			yield* helper(tree.left, callback);
			yield* helper(tree.right, callback);
			yield callback?.(data) ?? data;
		}

		yield* helper(this.root, callback);
	}

	traverse<R>(callback: Mapper<T, R>, method: TraversalMethod): Array<R> {
		if (method === TraversalMethod.POSTORDER) {
			return [...this.postorder(callback)];
		}

		if (method === TraversalMethod.PREORDER) {
			return [...this.preorder(callback)];
		}

		return [...this.inorder(callback)];
	}
}
