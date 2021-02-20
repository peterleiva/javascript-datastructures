/**
 * List implemented with doubly linked list
 * @version 1.0.0
 */

import { EmptyListException, IndexOutOfRangeException } from "./errors";
import ListADT, { ComparableFn } from "./list-adt.interface";

type Node<T> = null | {
	data: T | null;
	right: Node<T>;
	left: Node<T>;
};

interface NodeEntry<T> {
	current: NonNullable<Node<T>>;
	index: number;
}

/**
 * Doubly Linked list
 */
export default class LinkedList<T> implements ListADT<T>, Iterable<T> {
	protected head: Node<T>;
	protected _length: number;

	constructor(...items: T[]) {
		this.head = null;
		this._length = 0;

		this.append(items);
	}

	*[Symbol.iterator](): IterableIterator<T> {
		for (const [, data] of this.entries()) {
			yield data;
		}
	}

	*values(): IterableIterator<T> {
		for (const item of this) {
			yield item;
		}
	}

	*keys(): IterableIterator<number> {
		for (const [i] of this.entries()) {
			yield i;
		}
	}

	*entries(): IterableIterator<[number, T]> {
		for (const node of this.nodeEntries()) {
			if (node.current) yield [node.index, node.current.data as T];
		}
	}

	map(fn: (value: T) => T): LinkedList<T> {
		const mappedList = new LinkedList<T>();

		for (const value of this) {
			mappedList.append(fn(value));
		}

		return mappedList;
	}

	concat(list: LinkedList<T>): LinkedList<T> {
		const concatenatedList: LinkedList<T> = new LinkedList();

		for (const value of this) {
			concatenatedList.append(value);
		}

		for (const value of list) {
			concatenatedList.append(value);
		}

		return concatenatedList;
	}

	// reduce(fn: (accumulator: number, currentValue: T) => number, initial: number): T {
	// 	[].reduce
	// }

	partition(fn: (value: T) => boolean): [LinkedList<T>, LinkedList<T>] {
		const left = new LinkedList<T>();
		const right = new LinkedList<T>();

		for (const value of this) {
			fn(value) ? left.append(value) : right.append(value);
		}

		return [left, right];
	}

	indexOf(item: T): number {
		for (const [i, value] of this.entries()) {
			if (Object.is(value, item)) {
				return i;
			}
		}

		return -1;
	}

	toArray(): T[] {
		return [...this];
	}

	private *nodeEntries(): IterableIterator<NodeEntry<T>> {
		let current = this.head;
		let index = 0;

		while (current !== null) {
			yield { current, index };

			index++;
			current = current.right;
		}
	}

	get length(): number {
		return this._length;
	}

	/**
	 * alias for .length
	 */
	size(): number {
		return this.length;
	}

	isEmpty(): boolean {
		return this.head === null;
	}

	remove(index: number): T | null {
		if (index < 0 || index >= this.length) {
			throw new IndexOutOfRangeException(this.length, index);
		}

		let current: Node<T> | null = null;
		let i = 0;

		for ({ current, index: i } of this.nodeEntries()) {
			if (i === index) break;
		}

		if (!current) return null;

		if (!(current.right || current.left)) {
			this.head = null;
		} else {
			const previous = current.left;
			const next = current.right;

			if (!previous) {
				(next as Node<T>).left = null;
				this.head = next;
			} else if (!next) {
				(previous as Node<T>).right = null;
			} else {
				previous.right = next;
				next.left = previous;
			}
		}

		const { data } = current;

		// mark item to garbage collected
		this.markGarbageCollect(current);
		this._length--;

		return data;
	}

	// pop(): T {}

	// dequeue(): T {}

	/**
	 * Get a data stored at some index or null if empty or out of range
	 *
	 * @throws ListOutOfRange
	 * @param {number} index
	 */
	get(index: number): T | null {
		return this.getNode(index)?.data || null;
	}

	/**
	 * Returns a node according to index or null if do not exists
	 */
	private getNode(index: number): Node<T> {
		if (index < 0 || index >= this.length) {
			throw new IndexOutOfRangeException(this.length, index);
		}

		for (const entry of this.nodeEntries()) {
			if (entry.index === index) return entry.current;
		}

		return null;
	}

	at(index: number): T | null {
		if (index > 0) {
			return this.get(index);
		} else {
			const absIndex = Math.abs(index);

			if (absIndex > this.size()) {
				throw new IndexOutOfRangeException(this.size(), index);
			}

			return this.at(this.size() - absIndex);
		}
	}

	insert(comparator: ComparableFn<T>, ...data: T[]): T | T[];
	insert(index: number, ...data: T[]): T | T[];
	insert(criterea: number | ComparableFn<T>, ...data: T[]): T | T[] | null {
		const newNodes = this.createNodeList(data);
		if (newNodes.length === 0) return null;

		let index = -1;

		if (typeof criterea === "function") {
			for (const [i, data] of this.entries()) {
				if (criterea(data)) index = i;
			}
		}

		const insertionPoint = this.getNode(index);
		const firstNode = newNodes[0];
		const lastNode = newNodes[newNodes.length - 1];

		if (!insertionPoint || !insertionPoint.left) {
			this.head = firstNode;
		} else {
			// must be added to the head
			if (insertionPoint.left) {
				firstNode.left = insertionPoint.left;
			}

			insertionPoint.left = lastNode;
			lastNode.right = insertionPoint;
		}

		return data;
	}

	push(data: T): this {
		const node: Node<T> = this.createNode(data);

		if (this.head) {
			node.right = this.head;
			this.head.left = node;
		}

		this.head = node;
		this._length++;

		return this;
	}

	enqueue(data: T): this {
		const node = this.createNode(data);

		if (this.head) {
			let lastNode = this.head;

			for (const entry of this.nodeEntries()) {
				lastNode = entry.current;
			}

			lastNode.right = node;
			node.left = lastNode;
		} else {
			this.head = node;
		}

		this._length++;

		return this;
	}

	dequeue(): T | null {
		if (!this.head) {
			throw new EmptyListException();
		}

		const { data } = this.head;
		const nodeToBeRemoved = this.head;
		this.head = nodeToBeRemoved.right;
		this.markGarbageCollect(nodeToBeRemoved);

		this._length--;

		return data;
	}

	pop(): T | null {
		if (!this.head) {
			throw new EmptyListException();
		}

		let node: NonNullable<Node<T>> = this.head;

		for (const entry of this.nodeEntries()) {
			node = entry.current;
		}

		const { data } = node;

		if (!node.left) {
			this.head = null;
		} else {
			node.left.right = null;
		}

		this._length--;

		this.markGarbageCollect(node);

		return data;
	}

	clear(): this {
		for (const entry of this.nodeEntries()) {
			this.markGarbageCollect(entry.current);
		}
		this.head = null;
		this._length = 0;

		return this;
	}

	peek(): T | null {
		return this.head?.data ?? null;
	}

	tail(): T | null {
		let node: NodeEntry<T> | null = null;
		for (node of this.nodeEntries());

		return node?.current?.data ?? null;
	}

	// sort(): this {}

	// insertAfter(data: T): T {}

	/**
	 * Linear search on list
	 *
	 * @param data data to be search
	 */
	contains(data: T): boolean {
		for (const item of this) {
			if (Object.is(item, data)) return true;
		}

		return false;
	}

	private regularizeListArgument(items: T | T[], ...rest: T[]): T[] {
		return items instanceof Array ? [...items, ...rest] : [items, ...rest];
	}

	private createNode(data: T): NonNullable<Node<T>> {
		return {
			data,
			right: null,
			left: null,
		};
	}

	private createNodeList(items: T[]): NonNullable<Node<T>>[] {
		const list: Node<T>[] = [];

		for (const [i, item] of items.entries()) {
			const node = this.createNode(item);
			const preceding = list[i - 1] || null;

			if (preceding) {
				node.left = preceding;
				preceding.right = node;
			}

			list.push(node);
		}

		return list;
	}

	private markGarbageCollect(node: NonNullable<Node<T>>) {
		node.right = node.left = node.data = null;
	}
}
