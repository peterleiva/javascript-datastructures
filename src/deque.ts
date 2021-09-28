interface DequeADT<T> {
	insertLeft(): T;
	insertRight(): T;
	deleteLeft(): T;
	deleteRight(): T;
}

/**
 * A Deque is an ordered set of items from which items may be deleted at either
 * end and into which items may be inserted at either end
 */
export default class Deque<T> implements DequeADT<T> {}
