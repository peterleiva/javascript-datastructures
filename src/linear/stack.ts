/**
 * @file implementation of stack data structure. According to Last In, First Out
 *  order
 * @version 0.2.0
 */
type Node<T> = {
	item: T;
	next: Node<T>;
} | null;

interface StackADT<T> {
	/**
	 * Returns the top of the stack
	 * @throws {StackUnderflow}
	 */
	top(): T;
	/**
	 * Remove the last item inserted
	 * @throws {StackUnderflow}
	 */
	pop(): T;
	/**
	 * Insert item at the beginning of the stack
	 *
	 * @param {T} item new data to be inserted
	 * @return {T}
	 */
	push(item: T): T;
	/**
	 * return true of false depending whether or not the stack contains any items
	 */
	empty(): boolean;
}

/**
 * Stack underflow is throwed when poping empty stack
 */
export class StackUnderflow extends Error {
	/**
	 * initializes stack underflow
	 */
	constructor() {
		super("Stack underflow");
	}
}

/**
 * A Stack is a linear structure which follows First In Last Out order
 *
 * A queue is an ordered collection os items from  which  items may be deleted
 * and inserted only at the top of the stack (called front of the top). An
 * operation of {@link Stack#pop} and {@link Stack#top} can throws
 * {@link StackUnderflow} exception when the stack is empty
 *
 * @template T
 * @implements {Iterable<T>}
 *
 * @example <caption>Pushing item</caption>
 * const queue = new Stack()
 * queue.push('item') // size === 1
 *
 * @example <caption>Constructing with multiple items</caption>
 * const items = [1, 2, 3, 4]
 * const stack = new Stack(...items)
 * [...stack] // 4, 3, 2, 1
 *
 * @example <caption>Popping item</caption>
 * const queue = new Stack(1, 2)
 * const x = queue.pop() // x === 2
 */
export default class Stack<T> implements StackADT<T>, Iterable<T> {
	/**
	 * Head of the stack
	 * @private
	 */
	#top: Node<T>;
	/**
	 * Keeps track of stack size
	 * @private
	 */
	#size: number;

	/**
	 * Initializes new stack
	 */
	constructor(...items: Array<T>) {
		this.#size = 0;
		this.#top = null;

		for (const item of items) {
			this.push(item);
		}
	}

	/**
	 * Defines iterator return ordered collection of stack items
	 */
	*[Symbol.iterator](): Iterator<T> {
		let node = this.#top;

		while (node !== null) {
			yield node.item;
			node = node.next;
		}
	}

	/**
	 * Returns the size of the stack
	 * @return {number}
	 */
	size(): number {
		return this.#size;
	}

	/**
	 * Aliasess for {@link Stack#size}
	 * @return {number}
	 */
	get length(): number {
		return this.size();
	}

	/**
	 * return true or false depending whether or not the stack contains any items
	 * @return {boolean}
	 */
	empty(): boolean {
		return this.#top === null;
	}

	/**
	 * Returns the top of the stack
	 *
	 * @throws {StackUnderflow}
	 * @return {T}
	 */
	top(): T {
		if (this.#top === null) {
			throw new StackUnderflow();
		}

		return this.#top.item;
	}

	/**
	 * Insert item at the beginning of the stack
	 *
	 * @param {T} item new data to be inserted
	 * @return {T}
	 */
	push(item: T): T {
		const node = this.getnode(item);
		node.next = this.#top;
		this.#top = node;
		this.#size++;

		return node.item;
	}

	/**
	 * Remove the last item inserted
	 *
	 * @throws {StackUnderflow}
	 * @return {T}
	 */
	pop(): T {
		if (this.#top === null) {
			throw new StackUnderflow();
		}

		const node = this.#top;
		this.#top = node.next;
		this.#size--;

		return node.item;
	}

	/**
	 * Create new node to be inserted at the linked list of items
	 *
	 * @private
	 * @param {T} data
	 * @return {!Node<T>}
	 */
	private getnode(data: T): NonNullable<Node<T>> {
		return {
			item: data,
			next: null,
		};
	}
}
